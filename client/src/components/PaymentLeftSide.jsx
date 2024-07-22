import { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { useLocation } from 'react-router-dom';

export default function PaymentLeftSide() {
    const [products, setProducts] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const cm = useRef(null);
    const location = useLocation();
    const allCart = location.state?.products || [];

    const onRightClick = (event, id) => {
        if (cm.current) {
            setSelectedId(id);
            cm.current.show(event);
        }
    };

     // Calculate total price
     const calculateTotalPrice = () => {
        return products.reduce((total, product) => total + product.price, 0);
    };

    useEffect(() => {
        setProducts(allCart);
    }, [allCart]);

    return (
        <>
        <h1 className="text-2s font-semibold">סך כל ההזמנה: ₪{calculateTotalPrice()}</h1>               
            <div className="card flex md:justify-content-center">
                 {/* Total Price Display */}                 
                <ul className="m-0 p-0 list-none border-1 surface-border border-round p-3 flex flex-column gap-2 w-full md:w-30rem">
                    {products.map((product) => (
                        <li
                            key={product._id}
                            className={`p-2 hover:surface-hover border-round border-1 border-transparent transition-all transition-duration-200 ${selectedId === product.id && 'border-primary'}`}
                            onContextMenu={(e) => onRightClick(e, product._id)}
                        >
                            <div className="flex flex-wrap p-2 align-items-center gap-3">
                                {product.prodId ? (
                                    <>
                                        <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`http://localhost:7777/uploads/${product.image.split("\\")[2]}`} alt={product.name} />
                                        <div className="flex-1 flex flex-column gap-1">
                                            <span className="font-bold">{product.name}</span><br />
                                            <span><InputText className="font-bold" style={{ width: 40, textAlign: 'center' }} value={product.quantity}></InputText></span>
                                            <div className="flex align-items-center gap-2"></div>
                                        </div>
                                    </>
                                ) : null}
                                <span className="font-bold text-900 ml-5">₪{product.price}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}