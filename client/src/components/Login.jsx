import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
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
    const {isAdmin} = useAuth()
    const [loginFunc, { isError, isSuccess, data }] = useLoginMutation()
    const [addProdToBasket] = useAddNewProdToBasketMutation()
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const toast = useRef(null);
    const [items, setItems] = useState([]);
    const defaultValues = { userName: '', password: '' };
    const form = useForm({ defaultValues });
    const errors = form.formState.errors;
    const navigate = useNavigate()
    const search = (event) => {
        setItems([...Array(10).keys()].map((item) => event.query + '-' + item));
    };

    const onSubmit = (data) => {
        loginFunc(data)
        form.reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };


    const moveItemsToDB = ()=>{
        //ליצור אוביקט סל מאוביקט המוצר שבלוקל הוסט ולשלוח לפונקצית יצירת מוצר
       cart?.map((e)=>{
        addProdToBasket({prodId:e._id,quant:e.qty})
        localStorage.removeItem("cart")
       })
        

    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))   
            toast.current.show({ severity: 'success', summary: 'משתמש נרשם בהצלחה', life: 3000 });
            if(!isAdmin && localStorage.getItem('cart') && localStorage.getItem('cart').length!=0)
            {
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
                            <InputText placeholder="userName" inputId={field.name} value={field.value} onChange={(e)=>field.onChange(e.target.value)}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />
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
                <Button label="התחברות" type="submit"  style={{ backgroundColor: 'black', color: 'white' }} /><br></br><br></br><br></br><br></br>
                <div>👇עוד לא נרשמתם? הרשמו כאן</div><br></br>
                <Button style={{ backgroundColor: 'black', color: 'white',width:'100px',margin:'auto' }}  onClick={()=>{navigate("/Register")} }>הרשמה</Button>

              
            </form>
        </div>
    )
}

export default Login
