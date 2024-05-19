

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
// import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useAddNewOrderMutation,useDeleteOrderMutation,useGetAllOrderQuery,useUpdateOrderMutation } from '../../features/manager/ManagerOrderApiSlice';

import { Dropdown } from 'primereact/dropdown';
import { VirtualScroller } from 'primereact/virtualscroller';
// import { Divider } from '@mui/material';
export default function Order() {
    let emptyOrder = {
        userId: null,
        products: [],
        date: null,
        provided: false
    };
    
    const [orderDialog, setOrderDialog] = useState(false);
    const [deleteOrderDialog, setDeleteOrderDialog] = useState(false);
    const [deleteOrdersDialog, setDeleteOrdersDialog] = useState(false);
    const [order, setOrder] = useState(emptyOrder);
    const [selectedOrders, setSelectedOrders] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const { data:orders, isLoading, isError, error, isSuccess,refetch } = useGetAllOrderQuery()
    // const { data:products1, isLoading1, isError1, error1, isSuccess1,refetch1 } = useGetOrderByIdQuery()

    const [ createOrder, {isError: isError5, error:error5, isSuccess:isSuccess5}] = useAddNewOrderMutation()
    const [ deleteOrd, {isError: isError3, error:error3, isSuccess:isSuccess3}] = useDeleteOrderMutation()
    const [ updateOrder, {isError: isError4,error: error4, isSuccess:isSuccess4 }] = useUpdateOrderMutation()
    

    useEffect(() => {
        if(isSuccess){
            console.log(orders);
        }
    }, [isSuccess]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setOrder(emptyOrder);
        setSubmitted(false);
        setOrderDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setOrderDialog(false);
    };

    const hideDeleteOrderDialog = () => {
        setDeleteOrderDialog(false);
    };

    const hideDeleteOrdersDialog = () => {
        setDeleteOrdersDialog(false);
    };

    const saveOrder = () => {
        setSubmitted(true);

        {console.log("saveOrder",order) } 

        if (order.name.trim()) {
            let _orders = [...orders];
            let _order = { ...order };

            if (order._id) {
                const index = findIndexById(order._id);
                updateOrder(order)
                refetch()
                _orders[index] = _order;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Order Updated', life: 3000 });
            } 
            else {
                _order._id = createId();
                // _order.image = 'order-placeholder.svg';
                createOrder(_order)
                refetch()
                console.log("after creating prod!");
                
                _orders.push(_order);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Order Created', life: 3000 });
            }

            // setOrders(_Orders);
            setOrderDialog(false);
            setOrder(emptyOrder);
        }
    };
//editttttttttttttttttt
    const editOrder = (order) => {
        setOrder({ ...order });
        setOrderDialog(true);
        
    };

//deleteeeeeeeeeeeeee
    const confirmDeleteOrder = (order) => {
        console.log("deleteeeeeeeee");
        // console.log("confirmDeleteOrder: ",order._id);
        setOrder(order);
        setDeleteOrderDialog(true);
        refetch()
    };

    const deleteOrder = () => {
       // debugger
        console.log(order._id);
        deleteOrd(order._id)
        refetch()
        // setOrders(_orders);
        setDeleteOrderDialog(false);
        setOrder(emptyOrder);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Order Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < orders.length; i++) {
            if (orders[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteOrdersDialog(true);
    };

    const deleteSelectedOrders = () => {
        let _orders = orders.filter((val) => !selectedOrders.includes(val));

        // setOrders(_orders);
        setDeleteOrdersDialog(false);
        setSelectedOrders(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Orders Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        // console.log("onCategoryChange: ",e.target.name._id);
        let _order = { ...order };

        _order['category'] = e.target.name._id;
        setOrder(_order);
    };

    const onInputChange = (e, name) => {
        // console.log("onInputChange",e,name);
        const val = (e.target && e.target.value) || '';
        let _order = { ...order };

        _order[`${name}`] = val;

        setOrder(_order);
    };

    const onInputNumberChange = (e, name) => {
        // console.log("onInputNumberChange",name);
        const val = e.value || 0;
        let _order = { ...order };

        _order[`${name}`] = val;

        setOrder(_order);
    };

    // const leftToolbarTemplate = () => {
    //     return (
    //         <div className="flex flex-wrap gap-2">
    //             <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
    //         </div>
    //     );
    // };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img  src={`http://localhost:7777/uploads/${rowData.image.split("\\")[2]}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };
    const DateBodyTemplate = (rowData) => {
        // const d = rowData.date
        return formatCurrency(rowData.date);
    };

    const itemTemplateProduct = (item, options) => {
        // console.log("ffffffffffffffffffffffffffffffff");
        const className = classNames('flex align-items-center p-2', {
            'surface-hover': options.odd
        });
        return (
            <div className={className} >
                {item.name}
                {item.price}
            </div>
        );
    };

    const ProductsBodyTemplate = (rowData) => {
        // const categoriesArr=(rowData)=>{
            console.log("products  "+rowData.products);
            // console.log("userId"+rowData.products.userId);
        //     const names = rowData.products.map(e=>e.name)
        //     console.log(names);
            return(
                // <Button>aaa</Button>
            <VirtualScroller items={rowData.products} itemSize={50} itemTemplate={itemTemplateProduct}  className="border-1 surface-border border-round" style={{ width: '200px', height: 0, minHeight: '70px' }} />
            // <Divider layout="vertical classname"></Divider>
            )
            }
        // console.log("rowDataaaaaaaaaaaaaaaa"+rowData.products);
        // return formatCurrency(rowData);
    // };

    

    
    //aaaaaaaaaaaaaaa
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/*<Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editOrder(rowData)} />*/}
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteOrder(rowData)} />
            </React.Fragment>
        );
    };
    //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Orders</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const orderDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveOrder} />
        </React.Fragment>
    );
    const deleteOrderDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteOrderDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteOrder} />
        </React.Fragment>
    );
    const deleteOrdersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteOrdersDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedOrders} />
        </React.Fragment>
    );

    return (
        <div>
           <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4"  right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={orders} selection={selectedOrders} onSelectionChange={(e) => setSelectedOrders(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders" globalFilter={globalFilter} header={header}>
                    {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                    <Column field="UserName" header="Name" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column>
                    <Column field="Price" header="Price" body={priceBodyTemplate}sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="Products" header="Products" body={ProductsBodyTemplate}sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="Date" header="Date" body={DateBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="userId.name" header="User" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={orderDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Order Details" modal className="p-fluid" footer={orderDialogFooter} onHide={hideDialog}>
                {order.image && <img width='300px' src={`http://localhost:7777/uploads/${order.image.split("\\")[2]}`} alt={order.image} className="order-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name 
                    </label>
                    <InputText id="name" value={order.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !order.name })} />
                    {submitted && !order.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={order.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
             
                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
             {/*מעבר על כל הקטגוריות ע"מ לבחור מתוכן את הקטגוריה המתאימה */ }
                    <div className="formgrid grid">
                        {/* {allCategories.map(category=>{
                            // console.log("category",category.name);
                            return(
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category1" name={category} value={category.name} onChange={onCategoryChange} checked={order.category === category.name} />
                                <label htmlFor="category1">{category.name}</label>
                            </div>)
                        })} */}
{/*                     
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="ShowcaseCakes" onChange={onCategoryChange} checked={order.category === 'ShowcaseCakes'} />
                            <label htmlFor="category2">ShowcaseCakes</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="GlutenFree" onChange={onCategoryChange} checked={order.category === 'GlutenFree'} />
                            <label htmlFor="category3">GlutenFree</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Barim" onChange={onCategoryChange} checked={order.category === 'Barim'} />
                            <label htmlFor="category4">Barim</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Cakes" onChange={onCategoryChange} checked={order.category === 'Cakes'} />
                            <label htmlFor="category4">Cakes</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="FruitDesigns" onChange={onCategoryChange} checked={order.category === 'FruitDesigns'} />
                            <label htmlFor="category4">FruitDesigns</label>
                        </div> */}
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={order.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteOrderDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteOrderDialogFooter} onHide={hideDeleteOrderDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {order && (
                        <span>
                            Are you sure you want to delete <b>{order.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            {/* <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog> */}
        </div>
    );
}
