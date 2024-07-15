import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { useGetAllOrderQuery,useUpdateOrderMutation } from '../../features/manager/ManagerOrderApiSlice';

export default function Order() {
    const [orders, setOrders] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [currentStatus, setCurrentStatus] = useState('');
    const { data: ordersData, isLoading, isError, error, isSuccess } = useGetAllOrderQuery();
    const [updateOrderStatus] = useUpdateOrderMutation();


    useEffect(() => {
        if (isSuccess) {
            // Extracting email and address fields from ordersData and updating state
            const formattedOrders = ordersData.map(order => ({
                ...order,
               // email: order.userId.email, // Assuming customer email is accessible this way
                //address: order.userId.address // Assuming customer address is accessible this way
            }));
            setOrders(formattedOrders);
        }
    }, [isSuccess, ordersData]);

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

    const getStatusOptions = (currentStatus) => {
        switch (currentStatus) {
            case 'בטיפול':
                return [
                    { label: 'בדרך אליך', value: 'בדרך אליך' },
                    { label: 'הגיעה ליעדה', value: 'הגיעה ליעדה' }
                ];
            case 'בדרך אליך':
                return [
                    { label: 'הגיעה ליעדה', value: 'הגיעה ליעדה' }
                ];
            case 'הגיעה ליעדה':
                return []; // No options available for this status
            default:
                return [];
        }
    };

    

    const onStatusChange = async (e, rowData) => {
        const newStatus = e.value;
        console.log("e.value ",e.value);
        console.log("rowData ",rowData._id);
        try {
            await updateOrderStatus({ id: rowData._id, status: newStatus });
            setOrders(prevOrders => prevOrders.map(order =>
                order._id === rowData._id ? { ...order, status: newStatus } : order
            ));
    
            // Check if the order is expanded, if yes, close it
            if (expandedRows.includes(rowData)) {
                const updatedExpandedRows = expandedRows.filter(row => row !== rowData);
                setExpandedRows(updatedExpandedRows);
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (
        <div className="card rtl-container">
            <DataTable 
                value={orders} 
                rowGroupMode="subheader" 
                groupRowsBy="date"
                sortMode="single" 
                sortField="date" 
                sortOrder={-1}
                expandableRowGroups 
                expandedRows={expandedRows} 
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowGroupHeaderTemplate={headerTemplate} 
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="email" header="אימייל לקוח" />
                <Column field="address" header="כתובת לקוח" />
                <Column 
                    field="status" 
                    header="סטטוס" 
                    body={(rowData) => (
                        <div>
                            {rowData.status !== 'הגיעה ליעדה' ? (
                                <div>
                                    <span>לעדכון הסטטוס:</span>
                                    <Dropdown 
                                        value={currentStatus} 
                                        options={getStatusOptions(rowData.status)} 
                                        onChange={(e) => onStatusChange(e, rowData)} 
                                    />
                                </div>
                            ) : (
                                <Tag value={rowData.status} className={`tag-status ${getStatusClass(rowData.status)}`} />
                            )}
                        </div>
                    )} 
                />
                <Column 
                    field="products" 
                    header="פרטי ההזמנה" 
                    body={productTemplate} 
                    style={{ width: '75%' }} 
                />
            </DataTable>
        </div>
    );
}