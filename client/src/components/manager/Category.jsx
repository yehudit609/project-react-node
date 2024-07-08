

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useAddNewCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation,useGetAllCategoriesQuery } from '../../features/manager/ManagerCategoryApiSlice';
import { Dropdown } from 'primereact/dropdown';

export default function Category() {
    let emptyCategory = {
        name: '',
        description: ''
    };

    // const [users, setUsers] = useState(null);
    const [categoryDialog, setCategoryDialog] = useState(false);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
    const [deleteCategorysDialog, setDeleteCategorysDialog] = useState(false);
    const [category, setCategory] = useState(emptyCategory);
    //user || product
    const [selectedCategorys, setSelectedCategorys] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const { data:categorys, isLoading, isError, error, isSuccess,refetch } = useGetAllCategoriesQuery()
    console.log(categorys)
    // const { data:user, isLoading1, isError1, error1, isSuccess1 } = useGetUserByIdQuery()
    // const { data:allCategories=[], isLoading:isLoading2, isError:isError2, error:error2, isSuccess:isSuccess2,refetch:refetchCategories } = useGetAllCategoriesQuery()

    const [ createCategory, {isError: isError5, error:error5, isSuccess:isSuccess5}] = useAddNewCategoryMutation()//creteProd
    const [ deleteCategory, {isError: isError3, error:error3, isSuccess:isSuccess3}] = useDeleteCategoryMutation()//deleteProd
    const [ updateCategory, {isError: isError4,error: error4, isSuccess:isSuccess4 }] = useUpdateCategoryMutation()//updateProd
    // const [ updateCategoryActive, {isError: isError2,error: error2, isSuccess:isSuccess2 }] = useUpdateUserMutation()
    

    useEffect(() => {
        if(isSuccess){
            console.log("asdfffffffff",categorys);
        }
    }, [isSuccess]);
    // console.log(users)

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setCategory(emptyCategory);
        setSubmitted(false);
        setCategoryDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCategoryDialog(false);
    };

    const hideDeleteCategoryDialog = () => {
        setDeleteCategoryDialog(false);
    };

    const hideDeleteCategorysDialog = () => {
        setDeleteCategorysDialog(false);
    };

    const saveCategory = () => {
        setSubmitted(true);
        
        {console.log("saveCategory",category) } 
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",category);
        if (category.name.trim()) {
            console.log("category.name.trim()");
            let _categorys = [...categorys];
            let _category = { ...category };//category

            if (category._id) {
                const index = findIndexById(category._id);
                console.log("_categoryyyyyyyyyyyyyyyyyyyyyyyyy:   "+_category);
                updateCategory(_category)
                refetch()
                _categorys[index] = _category;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'category Updated', life: 3000 });
            } 
            else {
                //_user._id = createId();
                // _user.image = 'user-placeholder.svg';
                createCategory(_category)
                refetch()
                console.log("after creating prod!");
                
                _categorys.push(_category);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'category Created', life: 3000 });
            }

            setCategoryDialog(false);
            setCategory(emptyCategory);
        }
    };
//editttttttttttttttttt
    const editCategory = (category) => {
        setCategory({ ...category });
        setCategoryDialog(true);
        
    };

//deleteeeeeeeeeeeeee
    const confirmDeleteCategory = (category) => {
        // console.log("confirmDeleteProduct: ",product._id);
        setCategory(category);
        setDeleteCategoryDialog(true);
        refetch()
    };

    const deleteCategory1 = () => {
        deleteCategory(category._id)
        refetch()
        setDeleteCategoryDialog(false);
        setCategory(emptyCategory);
        //אני רוצה לשים פה סוויט אלרט
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < categorys.length; i++) {
            if (categorys[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    // const createId = () => {
    //     let id = '';
    //     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }

    //     return id;
    // };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    // const confirmDeleteSelected = () => {
    //     setDeleteUsersDialog(true);
    // };

    const deleteSelectedCategorys = () => {
        let _categorys = categorys.filter((val) => !selectedCategorys.includes(val));

        // setProducts(_products);
        setDeleteCategorysDialog(false);
        setSelectedCategorys(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categorys Deleted', life: 3000 });
    };

    // const onCategoryChange = (e) => {
    //     // console.log("onCategoryChange: ",e.target.name._id);
    //     let _user = { ...user };

    //     _user['category'] = e.target.name._id;
    //     setUser(_user);
    // };

    const onInputChange = (e, name) => {
        // debugger
        // console.log("onInputChange",e,name);
        const val = (e.target && e.target.value) || '';
        let _category = { ...category };

        _category[`${name}`] = val;

        setCategory(_category);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };
    
    //aaaaaaaaaaaaaaa
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editCategory(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteCategory(rowData)} />
            </React.Fragment>
        );
    };
    //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Categories</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const categoryDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveCategory} />
        </React.Fragment>
    );
    const deleteCategoryDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCategoryDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCategory1} />
        </React.Fragment>
    );
    const deleteCategorysDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCategorysDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedCategorys} />
        </React.Fragment>
    );
    const onRoleChange = (e) => {
        // console.log("onCategoryChange: ",e.target.name._id);
        let _category = { ...categorys };

        _category['roles'] = e.target.name._id;
        setCategory(_category);
    };

    return (
        <div>
            {categorys?
            <>
           <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={categorys} selection={selectedCategorys} onSelectionChange={(e) => setSelectedCategorys(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Categorys" globalFilter={globalFilter} header={header}>
                    {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                    
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column>
                    <Column field="description" header="Description" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column>
                    {/* <Column field="email" header="Email" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column> */}
                    {/* <Column field="roles" header="Roles" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column> */}
                    {/* <Column field="address" header="Address"  style={{ minWidth: '16rem', margin:'auto'}}></Column> */}
                    {/* <Column field="active" header="Active" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column> */}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={categoryDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Manager Details" modal className="p-fluid" footer={categoryDialogFooter} onHide={hideDialog}>
                <div className="field">
                    {console.log("categoryyy",category)}
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={category.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !category.name })} />
                    {submitted && !category.name && <small className="p-error">Name is required.</small>}
                </div>
                
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                       Description
                    </label>
                    <InputText id="description" value={category.description} onChange={(e) => onInputChange(e, 'description')} required autoFocus className={classNames({ 'p-invalid': submitted && !category.description })} />
                    {submitted && !category.description && <small className="p-error">description is required.</small>}
                </div>
                
            </Dialog>
            
            <Dialog visible={deleteCategoryDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteCategoryDialogFooter} onHide={hideDeleteCategoryDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {category && (
                        <span>
                            Are you sure you want to delete <b>{category.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
            </>:<></>} 
        </div>
    );
}
