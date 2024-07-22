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
import { useGetProdWithCategoryNameQuery, useGetAllCategoriesQuery, useAddNewProdToDBMutation, useDeleteProductMutation, useUpdateProdMutation } from '../../features/manager/ManagerProductApiSlice';

export default function Product() {
    let emptyProduct = {
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
    };

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [selectedFile, setSelecteFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const { data: products = [], isSuccess, refetch } = useGetProdWithCategoryNameQuery()
    const { data: allCategories = []} = useGetAllCategoriesQuery()

    const [createProd] = useAddNewProdToDBMutation()
    const [deleteProd] = useDeleteProductMutation()
    const [updateProd] = useUpdateProdMutation()

    const handleChangeFile = (e) => {
        setSelecteFile(e.target.files[0])
    }


    useEffect(() => {
        if (isSuccess) {
            console.log(products);
        }
    }, [isSuccess]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);        
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product._id) {
                if (selectedFile) {
                    const formData = new FormData()
                    formData.append("_id", product._id)
                    formData.append("category", _product.category._id ? _product.category._id : _product.category)
                    formData.append("description", _product.description)
                    formData.append("name", _product.name)
                    formData.append("price", _product.price)
                    formData.append("image", selectedFile)
                    
                    const index = findIndexById(product._id);
                    console.log("formDataaaaa: ", formData);
                    updateProd(formData)
                    refetch()
                    _products[index] = _product;
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                }

                else {
                    updateProd(product)
                    refetch()
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                }
            }
            else {
                console.log(_product);
                _product.image = 'product-placeholder.svg';
                const formData = new FormData()
                formData.append("category", _product.category)
                formData.append("description", _product.description)
                formData.append("name", _product.name)
                formData.append("price", _product.price)
                formData.append("image", selectedFile)
                console.log(formData)
                createProd(formData)
                refetch()
                console.log("after creating prod!");
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }
            setProductDialog(false);
            setProduct(emptyProduct);
        }
        window.location.reload(true)

    };
    //edit
    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    //delete
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
        refetch()
    };

    const deleteProduct = () => {
        
        deleteProd(product._id)
        refetch()
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product }
        _product['category'] = e.target.name._id;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (<>
            <div className="flex flex-wrap gap-2">
                <Button label="מוצר חדש" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
            
             </>
        );
       
    };

    const rightToolbarTemplate = () => {
        return <Button label="יצא מוצרים" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`http://localhost:7777/uploads/${rowData?.image.split("\\")[2]}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="...חיפוש" />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="שמור" icon="pi pi-check" onClick={saveProduct} />
          
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="לא" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );

    return (
        <div dir='ltr'>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="מציג {first} עד {last} מתוך {totalRecords} מוצרים" globalFilter={globalFilter} header={header}>
                    <Column field="name" header="שם מוצר" sortable style={{ minWidth: '16rem', margin: 'auto' }}></Column>
                    <Column field="image" header="תמונה" body={imageBodyTemplate}></Column>
                    <Column field="price" header="מחיר" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="category.name" header="קטגוריה" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="פרטי מוצר" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img width='300px' src={`http://localhost:7777/uploads/${product?.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        שם מוצר
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        תיאור
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">קטגוריה</label>
                    {/*מעבר על כל הקטגוריות ע"מ לבחור מתוכן את הקטגוריה המתאימה */}
                    <div className="formgrid grid">
                        {allCategories.map(category => {
                            return (
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category1" name={category} value={category.name} onChange={onCategoryChange} checked={product.category === category.name} />
                                    <label htmlFor="category1">{category.name}</label>
                                </div>)
                        })}
                       
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            מחיר
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                </div>

                <input type='file' name="image" onChange={handleChangeFile}
                ></input>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="מחיקת מוצר" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                           ? האם אתה בטוח שברצונך למחוק את מוצר  <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>          
        </div>        
    )
}
