import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Steps } from 'primereact/steps';
import { CustomerService } from './CustomerService';
//import { useAddNewProdToBasketMutation, useChangeQuantityOfProdMutation, useDeleteProdMutation, useGetAllCartQuery } from "../features/basket/basketApiSlice"
import { useGetOrdersByIdQuery } from '../features/order/orderApiSlice'
import useAuth from '../hooks/useAuth';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const { _id, userName, name, email, phone, isAdmin, isUser, address } = useAuth();
   
    const { data: clientOrders, isLoading, isError, error, isSuccess, refetch } = useGetOrdersByIdQuery(_id);

    useEffect(() => {
        console.log("Orders of current user: ", clientOrders);
        if (isSuccess) {
            setOrders(clientOrders);
            console.log("set client orders");
        }
    }, [isSuccess]);

    const productTemplate = (rowData) => {
        const products = rowData.products || [];

        return (
            <div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>תמונה</th>
                            <th>שם המוצר</th>
                            <th>כמות</th>
                            <th>מחיר</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>
                                    <img alt={product.name} src={"http://localhost:7777/uploads/" + product.image} width="32" />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>₪{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total-price">
                    <strong>סה"כ מחיר: ₪{rowData.price}</strong>
                </div>
            </div>
        );
    };

    const headerTemplate = (data) => {
        const formattedDate = new Date(data.createdAt).toLocaleDateString('en-GB'); // Format as dd/mm/yyyy

        return (
            <div className="header-content">
                <strong>תאריך : {formattedDate}</strong><br></br>
                <Tag value={data.status} className={`tag-status ${getStatusClass(data.status)}`} />
            </div>
        );
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'בטיפול':
                return 'tag-betipul';
            case 'בדרך אליך':
                return 'tag-baderech';
            case 'הגיעה ליעדה':
                return 'tag-higiah';
            default:
                return '';
        }
    };

    return (
        <div className="card rtl-container">
            <DataTable value={orders} rowGroupMode="subheader" groupRowsBy="date"
                sortMode="single" sortField="date" sortOrder={-1}  // Changed to -1 for descending order
                expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                rowGroupHeaderTemplate={headerTemplate} tableStyle={{ minWidth: '50rem' }}>
                <Column field="status" header="סטטוס" body={(rowData) => (
                    <div>
                        <Steps model={[{ label: 'בטיפול' }, { label: 'בדרך אליך' }, { label: 'הגיעה ליעדה' }]} activeIndex={rowData.status === 'בטיפול' ? 0 : rowData.status === 'בדרך אליך' ? 1 : 2} className="custom-steps" />
                    </div>
                )} />
                <Column field="products" header="פרטי ההזמנה" body={productTemplate} style={{ width: '75%' }}></Column>
            </DataTable>
        </div>
    );
}