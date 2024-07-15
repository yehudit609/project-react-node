import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { AutoComplete } from "primereact/autocomplete";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputText } from 'primereact/inputtext';
//עדכון הטופס מול השרת
import { useRegisterMutation } from '../features/auth/authApiSlice';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { Message } from 'primereact/message';

const Register = () => {
    console.log("Register");
    const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()
const [err409,setErr409]=useState(false)
    const toast = useRef(null);
    // const toast2 = useRef(null);
    const [items, setItems] = useState([]);

    const [city,setCity] = useState(" ")
    const [street,setStreet] = useState(" ")
    const [buildingNumber,setBuildingNumber] = useState(" ")

    const defaultValues = { userName: '', password: '', name: '', email: '', phone: '', address: ''};

    const form = useForm({ defaultValues });
    const errors = form.formState.errors;

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: form.getValues('value') });
    };

    const navigate = useNavigate()

    const search = (event) => {
        setItems([...Array(10).keys()].map((item) => event.query + '-' + item));
    };
    useEffect(()=>
    {
        if(isSuccess)
            navigate("/Login")
        if(isError)
        {
            setErr409(true)
        }
           

    },[isSuccess,isError])

    const onSubmit = (data) => {
        data.value 
        && show();
        
        const d = {
            userName: data.userName, password: data.password, name: data.name, email: data.email, phone: data.phone, address: city + " " + street  + " " + buildingNumber
        }
        registerFunc(d);
        form.reset();
       
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        //password,name,email,phone,address
        <div className="card flex justify-content-center">
            <br></br> <br></br>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Toast ref={toast} />
                {/* input value-username */}
                <Controller
                    name="userName"
                    control={form.control}
                    rules={{ required: 'userName is required!' }}
                    render={({ field, fieldState }) => (
                        <>
                            {/* <label htmlFor={field.name}>
                                {/* Value */
                            /* </label> */}
                            <InputText placeholder="userName" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />

                <Controller
                    name="name"
                    control={form.control}
                    rules={{ required: 'name is required!' }}
                    render={({ field, fieldState }) => (
                        <>
                            {/* <label htmlFor={field.name}>
                                {/* Value */
                            /* </label> */}
                            <InputText placeholder="name" inputId={field.name} value={field.value} onChange={field.onChange}
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
                            <Password toggleMask type="password" placeholder="password" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    rules={{ required: 'email is required!' }}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText placeholder="email" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />
                <Controller
                    name="phone"

                    control={form.control}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText placeholder="phone" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />

                <Controller
                    name="address"

                    control={form.control}
                    render={({ field, fieldState }) => (
                        <>
                            {/* <InputText type="address" placeholder="address" inputId={field.name} value={field.value} onChange={field.onChange}
                             inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br> */}
                            <Accordion activeIndex={0} >
                                <AccordionTab header="address" style={{ width: 200 }}>
                                    <InputText placeholder="city" style={{ width: 150 }} onChange={(e)=>setCity(e.target.value)} />
                                    <InputText placeholder="street" style={{ width: 150 }} onChange={(e)=>setStreet(e.target.value)} />
                                    <InputText placeholder="building number" style={{ width: 150 }} onChange={(e)=>setBuildingNumber(e.target.value)} />
                                </AccordionTab>
                            </Accordion>
                        </>
                    )}
                />
                {console.log("before button")}
                <br />
                <br />
                <Button label="register" type="submit" icon="pi pi-check" style={{ backgroundColor: 'black', color: 'white', borderColor: 'white' }} />
                {/* onClick={()=>{registerFunc(data)}} */}
                {err409? <Message  severity="error" text="duplicate" />:<></>}

            </form>
        </div>
    )
}

export default Register
