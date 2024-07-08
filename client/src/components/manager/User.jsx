

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
import { useAddNewUserMutation,useDeleteUserMutation,useGetAllUsersQuery,useUpdateUserMutation } from '../../features/manager/ManagerUserApiSlice';
import { Dropdown } from 'primereact/dropdown';

export default function User() {
    let emptyUser = {
        name: '',
        userName: '',
        email: '',
        roles: '',
        active: false,
        address:''
    };

    // const [users, setUsers] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    //user || product
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const { data:users, isLoading, isError, error, isSuccess,refetch } = useGetAllUsersQuery()
    console.log(users)
    // const { data:user, isLoading1, isError1, error1, isSuccess1 } = useGetUserByIdQuery()
    // const { data:allCategories=[], isLoading:isLoading2, isError:isError2, error:error2, isSuccess:isSuccess2,refetch:refetchCategories } = useGetAllCategoriesQuery()

    const [ createUser, {isError: isError5, error:error5, isSuccess:isSuccess5}] = useAddNewUserMutation()//creteProd
    const [ deleteUser, {isError: isError3, error:error3, isSuccess:isSuccess3}] = useDeleteUserMutation()//deleteProd
    const [ updateUser, {isError: isError4,error: error4, isSuccess:isSuccess4 }] = useUpdateUserMutation()//updateProd
    const [ updateUserActive, {isError: isError2,error: error2, isSuccess:isSuccess2 }] = useUpdateUserMutation()
    

    useEffect(() => {
        if(isSuccess){
            console.log("asdfffffffff",users);
        }
    }, [isSuccess]);
    // console.log(users)

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    };

    const saveUser = async () => {
        setSubmitted(true);

        {console.log("saveUser",user) } 
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",user);
        if (user.name.trim()) {
            console.log("user.name.trim()");
            let _users = [...users];
            let _user = { ...user };//user

            if (user._id) {
                const index = findIndexById(user._id);
                updateUser(_user)
                refetch()
                _users[index] = _user;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            } 
            else {
                await createUser(_user)
                refetch()
                console.log("after creating prod!");
                
                _users.push(_user);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            }

            setUserDialog(false);
            setUser(emptyUser);
            refetch()
        }
    };
//editttttttttttttttttt
    const editUser = (user) => {
        console.log("edit");
        console.log(user);
        setUser({ ...user });
        setUserDialog(true);
        refetch()
        
    };

//deleteeeeeeeeeeeeee
    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
        refetch()
    };

    const deleteUser1 = () => {
        deleteUser(user._id)
        refetch()
        setDeleteUserDialog(false);
        setUser(emptyUser);
        // swal('new user added!',`user: ${user.name}`,'success')
        //אני רוצה לשים פה סוויט אלרט
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const deleteSelectedUsers = () => {
        let _users = users.filter((val) => !selectedUsers.includes(val));
        setDeleteUsersDialog(false);
        setSelectedUsers(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'users Deleted', life: 3000 });
    };


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };

        _user[`${name}`] = val;

        setUser(_user);
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

    
    const actionBodyTemplate = (rowData) => {
        if(rowData.roles=="Admin"){
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteUser(rowData)} />&nbsp;
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} />
            </React.Fragment>
        )}
        else{
            return (
                <React.Fragment>
                    {/* <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} /> */}
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteUser(rowData)} />
                </React.Fragment>
            )
        }
    };

    const actionBodyTemplate12 = (rowData) => {
        debugger
        return (
            <React.Fragment>
                {/* <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} /> */}
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteUser(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Users</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const userDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveUser} />
        </React.Fragment>
    );
    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteUser1} />
        </React.Fragment>
    );
    const deleteUsersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUsersDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedUsers} />
        </React.Fragment>
    );
    const onRoleChange = (e) => {
        // console.log("onCategoryChange: ",e.target.name._id);
        let _user = { ...users };

        _user['roles'] = e.target.name._id;
        setUser(_user);
    };

    return (
        <div>
            {users?
            <>
           <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={users} selection={selectedUsers} onSelectionChange={(e) => setSelectedUsers(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" globalFilter={globalFilter} header={header}>
                    
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column>
                    <Column field="userName" header="UserName" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column>
                    <Column field="roles" header="Roles" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column>
                 
                    {console.log("user: ",user," toast ",toast)}
                    {console.log("users: ",users)}
                    {/* <Column body={users.roles=="Admin"?actionBodyTemplate:actionBodyTemplate12} exportable={false} style={{ minWidth: '12rem' }}></Column> */}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                   {/* </> <Column body={actionBodyTemplate12} exportable={false} style={{ minWidth: '12rem' }}></Column></>} */}
                </DataTable>
            </div>

            <Dialog visible={userDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Manager Details" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                <div className="field">
                    {console.log("userrrr",user)}
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={user.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.name })} />
                    {submitted && !user.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="password" className="font-bold">
                    Password
                    </label>
                    <InputText id="password" value={user.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.password })} />
                    {submitted && !user.password && <small className="p-error">password is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="userName" className="font-bold">
                       UserName
                    </label>
                    <InputText id="userName" value={user.userName} onChange={(e) => onInputChange(e, 'userName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.userName })} />
                    {submitted && !user.name && <small className="p-error">userName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email" className="font-bold">
                       Email
                    </label>
                    <InputText id="email" value={user.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.email })} />
                    {submitted && !user.name && <small className="p-error">Email is required.</small>}
                </div>
                {/* <div className="field">
                    <label htmlFor="address" className="font-bold">
                       Address
                    </label>
                    <InputText id="address" value={user.address} onChange={(e) => onInputChange(e, 'address')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.name })} />
                    {submitted && !user.name && <small className="p-error">Address is required.</small>}
                </div> */}
                {/* <div className="field">
                    <label htmlFor="roles" className="font-bold">
                       Role
                    </label>
                    <InputText id="roles" value={user.roles} onChange={(e) => onInputChange(e, 'roles')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.name })} />
                    {submitted && !user.name && <small className="p-error">roles is required.</small>}
                </div> */}
                {/* <div className="field-radiobutton col-6">
                            <RadioButton inputId="User" name="user" value="User" onChange={onRoleChange} checked={user.roles === 'User'} />
                            <label htmlFor="User">User</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="Admin" name="Admin" value="Admin" onChange={onRoleChange} checked={user.roles === 'Admin'} />
                            <label htmlFor="Admin">Admin</label>
                        </div> */}
            </Dialog>
            <Dialog visible={deleteUserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && (
                        <span>
                            Are you sure you want to delete <b>{user.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
            </>:<></>} 
        </div>
    );
}
