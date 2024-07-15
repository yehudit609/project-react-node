

import { useAddNewOrderMutation } from '../features/manager/ManagerOrderApiSlice'
import { useDeleteAllBasketMutation, useGetAllCartQuery } from '../features/basket/basketApiSlice';

import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';



const PaymentRightSide = () => {
    const [createOrd] = useAddNewOrderMutation();
    const [deleteAllBasket] = useDeleteAllBasketMutation();
    const { data: allCart } = useGetAllCartQuery();
        //prodId:mongoose.Schema.Types.ObjectId, name:String,quantity:Number, price:Number,image:String

    const { _id } = useAuth();
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    let city, street, buildingNumber;
    const {userName, name, email, phone, isAdmin, isUser,address } = useAuth()
    console.log("phoneeee: "+phone);
    city = address?.split(' ')[0]
    street = address?.split(' ')[1]
    buildingNumber = address?.split(' ')[2]
    // State for form fields
    const [formData, setFormData] = useState({
        name: name,
        phone: phone,
        email: email,
        city: city,
        street: street,
        buildingNumber: buildingNumber,
        message: ''
    });

    const handleChange = (key) => (e) => {
        setFormData({ ...formData, [key]: e.target.value });
    };

    const createOrder = () => {
        const orderData = {
            userId: _id,
            //לדאוג שהמוצרים יכילו שם, כמות, מחיר ותמונה. בעיקרון יש הכל ומשום מה בתוך אורדר הוא מביא רק שם ומחיר
            products: allCart,
            price: totalPrice,
            address: `${formData.city} ${formData.street} ${formData.buildingNumber}`,
            date: new Date(),
            message: formData.message
        };
        createOrd(orderData);
        deleteAllBasket();
        alert("ההזמנה נסגרה בהצלחה!");
        localStorage.removeItem("cart")
        navigate("/");
    };

    useEffect(() => {
        if (allCart && allCart.length > 0) {
            const total = allCart.reduce((acc, item) => acc + item.price, 0);
            setTotalPrice(total);
        }
    }, [allCart]);

    return (
        <div className="payment-container">
            <InputText className="payment-input" placeholder="שם" value={formData.name} onChange={handleChange('name')} />
            <InputText className="payment-input" placeholder="טלפון" value={formData.phone} onChange={handleChange('phone')} />
            <InputText className="payment-input" placeholder="אימייל" value={formData.email} onChange={handleChange('email')} />
            <Accordion className="payment-accordion">
                <AccordionTab header="כתובת">
                    <InputText placeholder="עיר" value={formData.city} onChange={handleChange('city')} />
                    <InputText placeholder="רחוב" value={formData.street} onChange={handleChange('street')} />
                    <InputText placeholder="מספר בנין" value={formData.buildingNumber} onChange={handleChange('buildingNumber')} />
                </AccordionTab>
            </Accordion>
            <InputTextarea placeholder="הערות על ההזמנה" value={formData.message} onChange={handleChange('message')} rows={6} autoResize />
            <br></br>
            <Button onClick={createOrder}>שליחת ההזמנה</Button>
        </div>
    );
};

export default PaymentRightSide;