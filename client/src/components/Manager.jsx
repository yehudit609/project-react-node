// import React, { useState, useEffect, useRef } from 'react';
// import { classNames } from 'primereact/utils';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// // import { ProductService } from './service/ProductService';
// import { Toast } from 'primereact/toast';
// import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
// import { Rating } from 'primereact/rating';
// import { Toolbar } from 'primereact/toolbar';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
// import { InputNumber } from 'primereact/inputnumber';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { Tag } from 'primereact/tag';
// import { useGetAllProductQuery } from '../features/product/productApiSlice';
// import { useDeleteProductMutation, useUpdateProductMutation, useCreateNewProductMutation, useGetAllProductWithCategoryNameQuery } from '../features/manager/managProductApiSlice';
// import { useGetAllCategoriesQuery } from '../features/manager/managCategoryApiAlice'
// import { Dropdown } from 'primereact/dropdown';
// export default function Manager() {
//     let emptyProduct = {
//         name: '',
//         image: null,
//         description: '',
//         category: null,
//         price: 0,
//         quantity: 0,
//     };

//     // const [products, setProducts] = useState(null);
//     const [productDialog, setProductDialog] = useState(false);
//     const [deleteProductDialog, setDeleteProductDialog] = useState(false);
//     const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
//     const [product, setProduct] = useState(emptyProduct);
//     const [selectedProducts, setSelectedProducts] = useState(null);
//     const [submitted, setSubmitted] = useState(false);
//     const [globalFilter, setGlobalFilter] = useState(null);
//     const [selectedFile, setSelecteFile] = useState({})
    
//     const toast = useRef(null);
//     const dt = useRef(null);

//     const { data: products, isLoading, isError, error, isSuccess, refetch } = useGetAllProductWithCategoryNameQuery()
//     const { data: allCategories = [], isLoading: isLoading2, isError: isError2, error: error2, isSuccess: isSuccess2, refetch: refetchCategories } = useGetAllCategoriesQuery()

//     const [createProd, { isError: isError5, error: error5, isSuccess: isSuccess5 }] = useCreateNewProductMutation()
//     const [deleteProd, { isError: isError3, error: error3, isSuccess: isSuccess3 }] = useDeleteProductMutation()
//     const [updateProd, { isError: isError4, error: error4, isSuccess: isSuccess4 }] = useUpdateProductMutation()


//     useEffect(() => {
//         if (isSuccess) {
//             console.log(products);
//         }
//     }, [isSuccess]);

//     const formatCurrency = (value) => {
//         return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
//     };

//     const openNew = () => {
//         setProduct(emptyProduct);
//         setSubmitted(false);
//         setProductDialog(true);
//     };

//     const hideDialog = () => {
//         setSubmitted(false);
//         setProductDialog(false);
//     };

//     const hideDeleteProductDialog = () => {
//         setDeleteProductDialog(false);
//     };

//     const hideDeleteProductsDialog = () => {
//         setDeleteProductsDialog(false);
//     };

//     const saveProduct = () => {
//         setSubmitted(true);

//         { console.log("saveProduct", product) }

//         if (product.name.trim()) {
//             let _products = [...products];
//             let _product = { ...product };

//             if (product._id) {
//                 const index = findIndexById(product._id);
//                 updateProd(_product)
//                 refetch()
//                 _products[index] = _product;
//                 toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
//             }
//             else {
//                 _product._id = createId();
//                 _product.image = 'product-placeholder.svg';
//                 const formData = new FormData()
//                     formData.append('name', _product.name)
//                     formData.append('_id', product._id);
//                     formData.append('description', product.description);
//                     formData.append('price', product.price);
//                     formData.append('category', product.category);
//                     formData.append('image', product.description);
//                     // האם התמונה עודכנה
//                     // formData.append('isImgUpdate', true);
//                 createProd(_product)
//                 refetch()
//                 console.log("after creating prod!");

//                 _products.push(_product);
//                 toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
//             }

//             // setProducts(_products);
//             setProductDialog(false);
//             setProduct(emptyProduct);
//         }
//     };
//     //editttttttttttttttttt
//     const editProduct = (product) => {
//         setProduct({ ...product });
//         setProductDialog(true);

//     };

//     //deleteeeeeeeeeeeeee
//     const confirmDeleteProduct = (product) => {
//         // console.log("confirmDeleteProduct: ",product._id);
//         setProduct(product);
//         setDeleteProductDialog(true);
//         refetch()
//     };

//     const deleteProduct = () => {
//         deleteProd(product._id)
//         refetch()
//         // setProducts(_products);
//         setDeleteProductDialog(false);
//         setProduct(emptyProduct);
//         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
//     };

//     const findIndexById = (id) => {
//         let index = -1;

//         for (let i = 0; i < products.length; i++) {
//             if (products[i].id === id) {
//                 index = i;
//                 break;
//             }
//         }

//         return index;
//     };

//     const createId = () => {
//         let id = '';
//         let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//         for (let i = 0; i < 5; i++) {
//             id += chars.charAt(Math.floor(Math.random() * chars.length));
//         }

//         return id;
//     };

//     const exportCSV = () => {
//         dt.current.exportCSV();
//     };

//     const confirmDeleteSelected = () => {
//         setDeleteProductsDialog(true);
//     };

//     const deleteSelectedProducts = () => {
//         let _products = products.filter((val) => !selectedProducts.includes(val));

//         // setProducts(_products);
//         setDeleteProductsDialog(false);
//         setSelectedProducts(null);
//         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
//     };

//     const onCategoryChange = (e) => {
//         // console.log("onCategoryChange: ",e.target.name._id);
//         let _product = { ...product };

//         _product['category'] = e.target.name._id;
//         setProduct(_product);
//     };

//     const onInputChange = (e, name) => {
//         // console.log("onInputChange",e,name);
//         const val = (e.target && e.target.value) || '';
//         let _product = { ...product };

//         _product[`${name}`] = val;

//         setProduct(_product);
//     };

//     const onInputNumberChange = (e, name) => {
//         // console.log("onInputNumberChange",name);
//         const val = e.value || 0;
//         let _product = { ...product };

//         _product[`${name}`] = val;

//         setProduct(_product);
//     };

//     const leftToolbarTemplate = () => {
//         return (
//             <div className="flex flex-wrap gap-2">
//                 <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
//             </div>
//         );
//     };

//     const rightToolbarTemplate = () => {
//         return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
//     };

//     const imageBodyTemplate = (rowData) => {
//         return <img src={`${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
//     };

//     const priceBodyTemplate = (rowData) => {
//         return formatCurrency(rowData.price);
//     };

//     const ratingBodyTemplate = (rowData) => {
//         return <Rating value={rowData.rating} readOnly cancel={false} />;
//     };


//     const handleChangeFile=(e)=>
//     {
//          setSelecteFile(e.target.files[0])
//     }

//     // const statusBodyTemplate = (rowData) => {
//     //     return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
//     // };


//     //aaaaaaaaaaaaaaa
//     const actionBodyTemplate = (rowData) => {
//         return (
//             <React.Fragment>
//                 <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
//                 <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
//             </React.Fragment>
//         );
//     };
//     //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

//     const header = (
//         <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
//             <h4 className="m-0">Manage Products</h4>
//             <span className="p-input-icon-left">
//                 <i className="pi pi-search" />
//                 <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
//             </span>
//         </div>
//     );
//     const productDialogFooter = (
//         <React.Fragment>
//             <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
//             <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
//         </React.Fragment>
//     );
//     const deleteProductDialogFooter = (
//         <React.Fragment>
//             <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
//             <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
//         </React.Fragment>
//     );
//     const deleteProductsDialogFooter = (
//         <React.Fragment>
//             <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
//             <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
//         </React.Fragment>
//     );

//     return (
//         <div>
//             <Toast ref={toast} />
//             <div className="card">
//                 <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

//                 <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
//                     dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
//                     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
//                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
//                     {/* <Column selectionMode="multiple" exportable={false}></Column> */}
//                     <Column field="name" header="Name" sortable style={{ minWidth: '16rem', margin: 'auto' }}></Column>
//                     <Column field="image" header="Image" body={imageBodyTemplate}></Column>
//                     <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
//                     <Column field="category.name" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
//                     <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
//                 </DataTable>
//             </div>

//             <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
//                 {product.image && <img width='300px' src={`${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
//                 <div className="field">
//                     <label htmlFor="name" className="font-bold">
//                         Name
//                     </label>
//                     <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
//                     {submitted && !product.name && <small className="p-error">Name is required.</small>}
//                 </div>
//                 <div className="field">
//                     <label htmlFor="description" className="font-bold">
//                         Description
//                     </label>
//                     <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
//                 </div>

//                 <div className="field">
//                     <label className="mb-3 font-bold">Category</label>
//                     {/*מעבר על כל הקטגוריות ע"מ לבחור מתוכן את הקטגוריה המתאימה */}
//                     <div className="formgrid grid">
//                         {allCategories.map(category => {
//                             // console.log("category",category.name);
//                             return (
//                                 <div className="field-radiobutton col-6">
//                                     <RadioButton inputId="category1" name={category} value={category.name} onChange={onCategoryChange} checked={product.category?.name === category.name} />
//                                     <label htmlFor="category1">{category.name}</label>
//                                 </div>)
//                         })}
//                         {/*                     
//                         <div className="field-radiobutton col-6">
//                             <RadioButton inputId="category2" name="category" value="ShowcaseCakes" onChange={onCategoryChange} checked={product.category === 'ShowcaseCakes'} />
//                             <label htmlFor="category2">ShowcaseCakes</label>
//                         </div>
//                         <div className="field-radiobutton col-6">
//                             <RadioButton inputId="category3" name="category" value="GlutenFree" onChange={onCategoryChange} checked={product.category === 'GlutenFree'} />
//                             <label htmlFor="category3">GlutenFree</label>
//                         </div>
//                         <div className="field-radiobutton col-6">
//                             <RadioButton inputId="category4" name="category" value="Barim" onChange={onCategoryChange} checked={product.category === 'Barim'} />
//                             <label htmlFor="category4">Barim</label>
//                         </div>
//                         <div className="field-radiobutton col-6">
//                             <RadioButton inputId="category4" name="category" value="Cakes" onChange={onCategoryChange} checked={product.category === 'Cakes'} />
//                             <label htmlFor="category4">Cakes</label>
//                         </div>
//                         <div className="field-radiobutton col-6">
//                             <RadioButton inputId="category4" name="category" value="FruitDesigns" onChange={onCategoryChange} checked={product.category === 'FruitDesigns'} />
//                             <label htmlFor="category4">FruitDesigns</label>
//                         </div> */}
//                     </div>
//                 </div>

//                 <div className="formgrid grid">
//                     <div className="field col">
//                         <label htmlFor="price" className="font-bold">
//                             Price
//                         </label>
//                         <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
//                     </div>
//                 </div>
//             </Dialog>

//             <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
//                 <div className="confirmation-content">
//                     <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
//                     {product && (
//                         <span>
//                             Are you sure you want to delete <b>{product.name}</b>?
//                         </span>
//                     )}
//                 </div>
//             </Dialog>

//             {/* <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
//                 <div className="confirmation-content">
//                     <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
//                     {product && <span>Are you sure you want to delete the selected products?</span>}
//                 </div>
//             </Dialog> */}
//         </div>
//     );
// }
