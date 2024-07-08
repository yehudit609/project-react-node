import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
//////////
import { Dialog } from 'primereact/dialog';
//////////
// import { ProductService } from './service/ProductService2';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useGetAllProductQuery, useGetProductByCategoryQuery } from '../features/product/productApiSlice';
import { useAddNewProdToBasketMutation } from '../features/basket/basketApiSlice';
// import BasketDesign from "./BasketDesign"
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
        { label: 'Name Low to High', value: 'name' },
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' },
        { label: 'Name High to Low', value: '!name' },

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

    //******************************** */

    // console.log("categoryyy: ",category);
    //לא למחוק!!!
    const { data, isLoading, isError, error, isSuccess } = useGetProductByCategoryQuery(category)

    // const { data, isLoading, isError, error, isSuccess } = useGetAllProductQuery()

    const [addProdToBasket, { isError2, error2, isSuccess2, data2 }] = useAddNewProdToBasketMutation()

    // const { data:allProduct, isLoading2,isError3, error3, isSuccess3 } = useGetAllProductQuery()//category

    useEffect(() => {

        if (isSuccess) {
            // console.log(data);
            setProducts(data)


        }
        else
            console.log("loading");

    }, [isSuccess]);

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
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
                {/* {console.log(product)} */}
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:7777/uploads/${product.image.split("\\")[2]}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        // { console.log(product) }
        return (


            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="classSize" src={`http://localhost:7777/uploads/${product.image}`} alt={product.name} onClick={() => openDialog(product)} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">₪{product.price}</span>
                        {/* איקון עגלה */}
                        <Button onClick={() => hundleAddToCart(product)} icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>

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
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <>
                <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-full sm:w-14rem" />,
                <div className="flex justify-content-end">
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div></>

        );
    };

    const hundleAddToCart = (product) => {
        console.log("productFromChanut: " + product.price);
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
                    console.log("before push: ", cart);
                    cart.push(pro1)
                    console.log("after push: ", cart);

                }
            }
            else {
                let pro = { ...product, qty: 1 }
                cart.push(pro)
            }

            // console.log('carttt', cart);
            localStorage.setItem('cart', JSON.stringify(cart))
        }

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
                    <img src={`http://localhost:7777/uploads/${selectedProduct?.image}`} alt={selectedProduct?.name} style={{ maxWidth: '100%', maxHeight: '400px' }} />
                    <div className="p-4">
                        <h2>{selectedProduct?.name}</h2>
                        <p>{selectedProduct?.description}</p> {/* Assuming description is available */}
                        <h3>Price: ${selectedProduct?.price}</h3>
                        <Rating value={selectedProduct?.rating} readOnly cancel={false} />
                        <br></br>
                        <Button label="Add to Cart" icon="pi pi-shopping-cart" onClick={() => {hundleAddToCart(selectedProduct); closeDialog()}} />
                    </div>
                </div>
            </Dialog>
        </>)
}
