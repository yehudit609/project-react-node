import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useAddNewUserMutation,useDeleteUserMutation,useGetAllUsersQuery,useUpdateUserMutation } from '../../features/manager/ManagerUserApiSlice';
import { Toolbar } from 'primereact/toolbar';

export default function User() {
    let emptyUser = {
        name: '',
        userName: '',
        email: '',
        roles: '',
        active: false,
        address:''
    };

    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const { data:users, isLoading, isError, error, isSuccess,refetch } = useGetAllUsersQuery()
    const [ createUser] = useAddNewUserMutation()//creteProd
    const [ deleteUser] = useDeleteUserMutation()//deleteProd
    const [ updateUser] = useUpdateUserMutation()//updateProd    

    useEffect(() => {
        if(isSuccess){
            console.log("asdfffffffff",users);
        }
    }, [isSuccess]);

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
//edit
    const editUser = (user) => {
        console.log("edit");
        console.log(user);
        setUser({ ...user });
        setUserDialog(true);
        refetch()        
    };

//delete
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
                <Button label="מנהל חדש" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="יצא משתמשים" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
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
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteUser(rowData)} />
                </React.Fragment>
            )
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">נהל משתמשים</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="...חיפוש" />
            </span>
        </div>
    );
    const userDialogFooter = (
        <React.Fragment>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="שמור" icon="pi pi-check" onClick={saveUser} />
        </React.Fragment>
    );
    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="לא" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={deleteUser1} />
        </React.Fragment>
    );

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
                        currentPageReportTemplate="מציג {first} עד {last} מתוך {totalRecords} משתמשים" globalFilter={globalFilter} header={header}>
                    
                    <Column field="name" header="שם" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column>
                    <Column field="userName" header="שם משתמש" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column>
                    <Column field="email" header="אימייל" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column>
                    <Column field="roles" header="סטטוס" sortable style={{ minWidth: '16rem', margin:'auto'}}></Column>
                 
                    {console.log("user: ",user," toast ",toast)}
                    {console.log("users: ",users)}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={userDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Manager Details" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                <div className="field">
                    {console.log("userrrr",user)}
                    <label htmlFor="name" className="font-bold">
                        שם
                    </label>
                    <InputText id="name" value={user.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.name })} />
                    {submitted && !user.name && <small className="p-error">Name is required.</small>}
                </div>
               <div className="field">
                    <label htmlFor="password" className="font-bold">
                    סיסמא
                    </label>
                    <InputText id="password" value={user.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.password })} />
                    {submitted && !user.password && <small className="p-error">password is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="userName" className="font-bold">
                       שם משתמש
                    </label>
                    <InputText id="userName" value={user.userName} onChange={(e) => onInputChange(e, 'userName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.userName })} />
                    {submitted && !user.name && <small className="p-error">userName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email" className="font-bold">
                       אימייל
                    </label>
                    <InputText id="email" value={user.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.email })} />
                    {submitted && !user.name && <small className="p-error">Email is required.</small>}
                </div>
               
            </Dialog>
            <Dialog visible={deleteUserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="מחיקת משתמש" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && (
                        <span>
                           ? האם אתה בטוח שברצונך למחוק את משתמש <b>{user.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
            </>:<></>} 
        </div>
    );
}
