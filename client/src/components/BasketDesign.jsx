import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { InputNumber } from 'primereact/inputnumber';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { useChangeQuantityOfProdMutation, useDeleteProdMutation, useGetAllCartQuery } from "../features/basket/basketApiSlice";
import { useGetAllProductQuery } from '../features/product/productApiSlice';

export default function BasketDesign() {
    const [products, setProducts] = useState([]);
    const [ableCloseOrder, setAbleCloseOrder] = useState(false);
    const navigate = useNavigate();
    const { data: allCart, isLoading, isError, error, isSuccess, refetch } = useGetAllCartQuery();
    const [changeQuantity, { isSuccess: isChangeQtySuccess }] = useChangeQuantityOfProdMutation();
    const [deleteProd, { isSuccess: isDeleteProdSuccess }] = useDeleteProdMutation();
    const { data: availibleProducts, isLoading: isLoading2, isError: isError2, error: error2, isSuccess: isSuccess2 } = useGetAllProductQuery();

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    useEffect(() => {
        if (isSuccess2) {
            if (localStorage.getItem('token')) {
                if (isSuccess) {
                    const filteredCart = filterBasketProducts(allCart, availibleProducts);
                    setProducts(filteredCart);
                    setAbleCloseOrder(filteredCart.length === 0);
                } else {
                    setAbleCloseOrder(true);
                }
            } else {
                cart = JSON.parse(localStorage.getItem('cart')) || [];
                const filteredCart = filterBasketProducts(cart, availibleProducts);
                setProducts(filteredCart);
                setAbleCloseOrder(filteredCart.length === 0);
            }

            if (isChangeQtySuccess || isDeleteProdSuccess) {
                refetch();
            }
        }
    }, [isSuccess, isChangeQtySuccess, isDeleteProdSuccess, isSuccess2, availibleProducts, refetch]);

    const filterBasketProducts = (basket, availableProducts) => {
        return basket.filter(product => availableProducts.some(availProd => availProd._id === product.prodId?._id || availProd._id === product._id));
    };

    const handleChangeQty = (e, product) => {
        if (localStorage.getItem('token')) {
            changeQuantity({ "id": product._id, "quantity": e.value });
        } else {
            if (cart.length > 0) {
                cart.forEach((e2) => {
                    if (e2._id == product._id) {
                        let price = e2.price / e2.qty;
                        e2.qty = e.value;
                        e2.price = price * e2.qty;
                    }
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };

    const functionThatReturnFromStorageTheQtyOfThisProd = (product) => {
        let quantity;
        if (cart.length > 0) {
            cart.forEach((e2) => {
                if (e2._id == product._id) {
                    quantity = e2.qty;
                    return;
                }
            });
        }
        return quantity;
    };

    const itemTemplate = (product, index) => {
        return (
            <div className="col-12" key={product.id} >
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:7777/uploads/${product.image.split("\\")[2]}`} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            {/* product.prodId ? product.prodId.name :  */}
                            <div className="flex-auto">
                                <label htmlFor="change quantity" className="font-bold block mb-2">change quantity</label>
                                <InputNumber inputId="change quantity" value={localStorage.getItem('token') ? product.quantity : functionThatReturnFromStorageTheQtyOfThisProd(product)} onValueChange={(e) => handleChangeQty(e, product)} mode="decimal" showButtons min={1} max={100} />
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{product.price}</span>
                            <Button onClick={() => localStorage.getItem('token') ? deleteProd({ id: product._id }) : deleteProdFromStorage(product)} icon="pi pi-trash" className="p-button-rounded"></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    const deleteProdFromStorage = (product) => {
        const a = JSON.parse(localStorage.getItem('cart'));
        const newProductsArray = a.filter((prod) => prod._id !== product._id);
        localStorage.setItem('cart', JSON.stringify(newProductsArray));
        setProducts(JSON.parse(localStorage.getItem('cart')));
    };

    return (
        <>
            <Button style={{ position: 'sticky', top: 170, zIndex: 10000, backgroundColor: 'black', color: 'white' }} disabled={ableCloseOrder} onClick={() => {localStorage.getItem('token') ? navigate("/Payment", { state: { products } }) : navigate("/Login") 
 }}>לסגירת הזמנה</Button>
            <div className="card" style={{ width: 1000, margin: "Auto" }}>
                <DataView value={products} listTemplate={listTemplate} />
            </div>
        </>
    );
}