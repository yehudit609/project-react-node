import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { AutoComplete } from "primereact/autocomplete";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputText } from 'primereact/inputtext';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { setToken } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddNewProdToBasketMutation } from '../features/basket/basketApiSlice';
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth';

const Login = () => {

    const dispatch = useDispatch()
    const {isAdmin, name} = useAuth()
    const [loginFunc, { isError, error, isSuccess, data }] = useLoginMutation()

    const [addProdToBasket, { isError2, error2, isSuccess2, data2 }] = useAddNewProdToBasketMutation()

    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const toast = useRef(null);
    const [items, setItems] = useState([]);
    const defaultValues = { userName: '', password: '' };

    const form = useForm({ defaultValues });
    const errors = form.formState.errors;

    const navigate = useNavigate()
    // const show = () => {
    //     toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: form.getValues('value') });
    // };

    const search = (event) => {
        setItems([...Array(10).keys()].map((item) => event.query + '-' + item));
    };

    const onSubmit = (data) => {
        // console.log("onSubmit",data);
        loginFunc(data)
        
        // data.value 
        // // && show();
        form.reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };


    const moveItemsToDB = ()=>{
        //ליצור אוביקט סל מאוביקט המוצר שבלוקל הוסט ולשלוח לפונקצית יצירת מוצר
       cart?.map((e)=>{
        
        console.log(e);
        addProdToBasket({prodId:e._id,quant:e.qty})
        localStorage.removeItem("cart")
       })
        

    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
           
            
            toast.current.show({ severity: 'success', summary: 'משתמש נרשם בהצלחה', life: 3000 });
        
            console.log("isAdmin: ",isAdmin);
            if(!isAdmin && localStorage.getItem('cart') && localStorage.getItem('cart').length!=0)
            {
                console.log("localStorage.getItem('cart').length"+localStorage.getItem('cart').length);
                moveItemsToDB()
                Swal.fire({
                    title: "ראינו שיש פריטים בסל שלך",
                    text: "האם אתה רוצה לעבור לסגירת הזמנה או להמשיך בקניה?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "כן, עבור לסגירת הזמנה",
                    cancelButtonText: "לא תודה, אני מעונין להמשיך בקניה",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/Payment")
                    }
                    else{
                        navigate("/")
                    }

                  });
                
            }
            else
                navigate("/")
        }
        if(isError){
            //<h1>{error}</h1>
        }
    }, [isSuccess])

    return (
        <div className="card flex justify-content-center">
            <br></br> <br></br>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Toast ref={toast} />
                <Controller
                    name="userName"
                    control={form.control}
                    rules={{ required: 'userName is required!' }}
                    render={({ field, fieldState }) => (
                        <>
                            {/* <label htmlFor={field.name}>
                                {/* Value */
                            /* </label> */}
                            <InputText placeholder="userName" inputId={field.name} value={field.value} onChange={(e)=>field.onChange(e.target.value)}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />
                {/* input value-password */}
                <Controller
                    name="password"

                    control={form.control}
                    rules={{ required: 'password is required!' }}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText type="password" placeholder="password" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />
                <Button label="login" type="submit"  style={{ backgroundColor: 'black', color: 'white' }} /><br></br><br></br><br></br><br></br>
                <div>👇עוד לא נרשמתם? הרשמו כאן</div><br></br>
                <Button style={{ backgroundColor: 'black', color: 'white',width:'100px',margin:'auto' }}  onClick={()=>{navigate("/Register")} }>הרשמה</Button>

              
            </form>
        </div>
    )
}

export default Login
