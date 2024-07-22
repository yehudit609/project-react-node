import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputText } from 'primereact/inputtext';
import { useRegisterMutation } from '../features/auth/authApiSlice';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { Message } from 'primereact/message';

const Register = () => {
    const [registerFunc, { isError, isSuccess}] = useRegisterMutation()
const [err409,setErr409]=useState(false)
    const toast = useRef(null);
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
        <div className="card flex justify-content-center">
            <br></br> <br></br>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Toast ref={toast} />
                <Controller
                    name="userName"
                    control={form.control}
                    rules={{ required: '!נדרש שם משתמש' }}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText placeholder="שם משתמש" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />

                <Controller
                    name="name"
                    control={form.control}
                    rules={{ required: '!נדרש שם' }}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText placeholder="שם" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    rules={{ required: '!נדרשת סיסמא' }}
                    render={({ field, fieldState }) => (
                        <>
                            <Password toggleMask type="סיסמא" placeholder="password" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    rules={{ required: '!נדרש אימייל' }}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText placeholder="אימייל" inputId={field.name} value={field.value} onChange={field.onChange}
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
                            <InputText placeholder="טלפון" inputId={field.name} value={field.value} onChange={field.onChange}
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
                            <Accordion activeIndex={0} >
                                <AccordionTab header="כתובת" style={{ width: 200 }}>
                                    <InputText placeholder="עיר" style={{ width: 150 }} onChange={(e)=>setCity(e.target.value)} />
                                    <InputText placeholder="רחוב" style={{ width: 150 }} onChange={(e)=>setStreet(e.target.value)} />
                                    <InputText placeholder="מספר בנין" style={{ width: 150 }} onChange={(e)=>setBuildingNumber(e.target.value)} />
                                </AccordionTab>
                            </Accordion>
                        </>
                    )}
                />
                <br />
                <br />
                <Button label="הרשמה" type="submit" icon="pi pi-check" style={{ backgroundColor: 'black', color: 'white', borderColor: 'white' }} />
                {err409? <Message  severity="error" text="duplicate" />:<></>}

            </form>
        </div>
    )
}

export default Register
