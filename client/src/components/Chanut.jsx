import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import swal from 'sweetalert';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useGetAllProductQuery, useGetProductByCategoryQuery } from '../features/product/productApiSlice';
import { useAddNewProdToBasketMutation } from '../features/basket/basketApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
export default function Chanut() {
    ///
    const [showDialog, setShowDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    /////
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');

    const navigate = useNavigate()
    const { category } = useParams()
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');


    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const sortOptions = [
        { label: 'מיין לפי שם בסדר עולה', value: 'name' },
        { label: 'מיין לפי מחיר בסדר יורד', value: '!price' },
        { label: 'מיין לפי מחיר בסדר עולה', value: 'price' },
        { label: 'מיין לפי שם בסדר יורד', value: '!name' },

    ];

    //*********************** */
    const openDialog = (product) => {
        setSelectedProduct(product);
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
        setSelectedProduct(null);
    };
    const { data, isLoading, isError, error, isSuccess } = useGetProductByCategoryQuery(category)
    const [addProdToBasket, { isError2, error2, isSuccess2, data2 }] = useAddNewProdToBasketMutation()
    useEffect(() => {
        if (isSuccess) {
            setProducts(data)
        }else
            console.log("loading");
    }, [isSuccess]);

    const getSeverity = (product) => {
        switch (product.isAvailible) {
            case true:
                return 'success';

            case false:
                return 'danger';

            default:
                return null;
        }
    };

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };



    //2 אפשרויות להצגת הנתונים

    const listItem = (product, index) => {
        return (

            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:7777/uploads/${product.image.split("\\")[2]}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    {/* <i className="pi pi-tag"></i> */}
                                    {/* <span className="font-semibold">{product.category}</span> */}
                                </span>
                                {/* <Tag value={product.isAvailible} severity={getSeverity(product)}></Tag> */}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.isAvailible === false}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            {/* <i className="pi pi-tag"></i> */}
                            {/* <span className="font-semibold">{product.category}</span> */}
                        </div>
                       {/* {!product.isAvailible &&<Tag value="אזל מהמלאי" severity={getSeverity(product)}></Tag>}  */}
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="classSize" src={`http://localhost:7777/uploads/${product.image.split("\\")[2]}`} alt={product.name} onClick={() => openDialog(product)} />
                        <div className="text-2xl font-bold">{product.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">₪{product.price}</span>
                        <Button onClick={() => hundleAddToCart(product)} icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.isAvailible === false}></Button>

                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        if (!products || products.length === 0) {
            return (
                <div className="text-center  text-2xl" style={{backgroundColor:'#0a0909'}}>
                אין פריטים בקטגוריה זו
                </div>
            );
        }

        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

   
    const header = () => {
        if (!products || products.length === 0) {
            return null;
        }
        return (
            <>
                <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="מיין לפי" onChange={onSortChange} className="w-full sm:w-14rem" />
                <div className="flex justify-content-end">
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </>
        );
    };
    const hundleAddToCart = (product) => {
        let flag = false
        if (localStorage.getItem('token'))
            addProdToBasket({ "prodId": product._id })
        else {
            if (cart.length > 0) {
                cart.forEach((e) => {
                    if (e._id == product._id) {
                        e.qty += 1
                        e.price += product.price
                        flag = true
                    }

                })
                if (!flag) {
                    let pro1 = { ...product, qty: 1 }
                    cart.push(pro1)

                }
            }
            else {
                let pro = { ...product, qty: 1 }
                cart.push(pro)
            }
            localStorage.setItem('cart', JSON.stringify(cart))
        } 
        swal(`${product.name} נוסף לסל בהצלחה `," ","success")        
    }



    return (
        <>
            <div className="card">
                <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} sortField={sortField} sortOrder={sortOrder} />
            </div>
            <Dialog
                header={selectedProduct?.name}
                visible={showDialog}
                style={{ width: '50vw' }}
                onHide={closeDialog}
                modal
                dismissableMask
                draggable={false}>
                <div className="flex">
                    <img src={`http://localhost:7777/uploads/${selectedProduct?.image.split("\\")[2]}`} alt={selectedProduct?.name} style={{ maxWidth: '100%', maxHeight: '400px' }} />
                    <div className="p-4">
                        <h2>{selectedProduct?.name}</h2>
                        <p>{selectedProduct?.description}</p>
                        <h3>מחיר: ₪{selectedProduct?.price}</h3>
                        <br></br>
                        <Button label="הוסף לסל" icon="pi pi-shopping-cart" onClick={() => {hundleAddToCart(selectedProduct); closeDialog()}} />
                    </div>
                </div>
            </Dialog>
        </>)
}
