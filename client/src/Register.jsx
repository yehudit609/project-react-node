import React, { useEffect, useRef, useState } from "react";
import { useFormik } from 'formik';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { AutoComplete } from "primereact/autocomplete";
import { useRegisterMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
    // const [items, setItems] = useState([]);
    const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate("/login")
        }
    }, [isSuccess])
    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted' });
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            phone: '',
            user_id: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.firstName) {
                errors.firstName = 'FirstName is required.';
            }
            if (!data.lastName) {
                errors.lastName = 'LastName is required.';
            }
            if (!data.password) {
                errors.password = 'Password is required.';
            }
            if (!data.email) {
                errors.email = 'Email is required.';
            }
            return errors;
        },
        onSubmit: (data) => {
            data && show();
            formik.resetForm();
            console.log(data);
            registerFunc(data)
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <label htmlFor="value">FirstName</label>

                <AutoComplete
                    inputId="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    //  suggestions={items}
                    //  completeMethod={search}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('firstName', e.value);
                    }}
                />
                {getFormErrorMessage('firstName')}
                <label htmlFor="lastName">LastName</label>

                <AutoComplete
                    inputId="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    //  suggestions={items}
                    //  completeMethod={search}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('lastName', e.value);
                    }}
                />
                {getFormErrorMessage('lastName')}
                <label htmlFor="password">Password</label>

                <Toast ref={toast} />
                <Password
                    inputId="password"
                    name="password"
                    rows={5}
                    cols={30}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                    value={formik.values.password}
                    feedback={false}
                    onChange={(e) => {
                        formik.setFieldValue('password', e.target.value);
                    }}
                />

                {getFormErrorMessage('password')}
                <label htmlFor="value">Email</label>

                <AutoComplete
                    inputId="email"
                    name="email"
                    value={formik.values.email}
                    //  suggestions={items}
                    //  completeMethod={search}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('email', e.value);
                    }}
                />
                {getFormErrorMessage('email')}
                <label htmlFor="value">Phone</label>

                <AutoComplete
                    inputId="phone"
                    name="phone"
                    value={formik.values.phone}
                    //  suggestions={items}
                    //  completeMethod={search}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('phone', e.value);
                    }}
                />
                {getFormErrorMessage('phone')}
                <label htmlFor="value">User_Id</label>

                <AutoComplete
                    inputId="user_id"
                    name="user_id"
                    value={formik.values.user_id}
                    //  suggestions={items}
                    //  completeMethod={search}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('user_id', e.value);
                    }}
                />
                {getFormErrorMessage('user_id')}
                <Button label="Submit" type="submit" icon="pi pi-check" />
            </form>
        </div>
    )
}
