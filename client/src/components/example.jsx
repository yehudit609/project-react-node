// import { useFormik } from 'formik';
// import { Password } from 'primereact/password';
// import { classNames } from 'primereact/utils';
// import { AutoComplete } from "primereact/autocomplete";
// import { useLoginMutation } from "./authApiSlice";
// import { useNavigate } from "react-router-dom";
// import { setToken } from "./authSlice";
// import { useDispatch } from "react-redux";
// import React, { useEffect } from 'react';
// import { Divider } from 'primereact/divider';
// import { Button } from 'primereact/button';
// import { Link } from 'react-router-dom';
// import { useUpdateBasketMutation } from '../user/userApiSlice';
// import Error from '../../Components/Error';

// export default function LoginDemo({ setToCheckout, toCheckout }) {
 
//     const [loginFunc, { isError, isSuccess, data, error }] = useLoginMutation()
//     const [updateBasket, { isSuccess: updateBasketIsSuccess, data: updateBasketData }] = useUpdateBasketMutation()
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     useEffect(() => {
//         if (isSuccess) {
//             dispatch(setToken(data))

//             const basket = JSON.parse(localStorage.getItem("basket"))
//             if (localStorage.getItem("token")) {
//                 if (basket?.products.length > 0) {
//                     updateBasket(basket)
//                 }
//                 else {
//                     navigate('/')
//                 }
//             }

//         }
//     }, [isSuccess,data,dispatch,navigate,updateBasket])

//     useEffect(() => {
//         if (updateBasketIsSuccess) {
//             dispatch(setToken(updateBasketData))
//             localStorage.removeItem("basket")
//             if (toCheckout) {
//                 setToCheckout(false)
//                 navigate('/checkout')
//             }

//             else
//                 navigate('/')

//         }

//     }, [updateBasketIsSuccess,dispatch, navigate, setToCheckout, toCheckout, updateBasketData])

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: ''

//         },
//         validate: (data) => {
//             let errors = {};

//             if (!data.email) {
//                 errors.email = 'email is required.';
//             }
//             if (!data.password) {
//                 errors.password = 'password is required.';
//             }

//             return errors;
//         },
//         onSubmit: (data) => {

//             formik.resetForm();
//             loginFunc(data)
//         }
//     });
  
//     const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

//     const getFormErrorMessage = (name) => {
//         return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
//     }; 
//     return (
//         <>
//             <br></br>
//             <div  style={{ marginTop: "150px", width: '85%', marginLeft: '7.5%',minHeight:'57vh' }}>
//                 <div className="flex flex-column md:flex-row">
//                     <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5" >
//                         <div className="flex flex-wrap justify-content-center align-items-center gap-2">

//                             <label className="w-6rem">Email</label>
//                             <AutoComplete
//                                 inputId="ac_email"
//                                 name="email"
//                                 value={formik.values.email}
//                                 className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
//                                 onChange={(e) => {
//                                     formik.setFieldValue('email', e.value);
//                                 }}
//                             />
//                             {getFormErrorMessage('email')}
//                         </div>
//                         <div className="flex flex-wrap justify-content-center align-items-center gap-2">
//                             <label className="w-6rem">Password</label>
//                             <Password
//                                 inputId="in_password"
//                                 name="password"
//                                 rows={5}
//                                 cols={30}
//                                 className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
//                                 value={formik.values.password}
//                                 feedback={false}
//                                 onChange={(e) => {
//                                     formik.setFieldValue('password', e.target.value);
//                                 }}
//                             />

//                             {getFormErrorMessage('password')}
//                         </div>
//                         <Button label="Login" type="submit" icon="pi pi-check" onClick={formik.handleSubmit} />  
                    

//                     </div>
//                     <div className="w-full md:w-2">
//                         <Divider layout="vertical" className="hidden md:flex">
//                             <b>OR</b>
//                         </Divider>
//                         <Divider layout="horizontal" className="flex md:hidden" align="center">
//                             <b>OR</b>
//                         </Divider>
//                     </div>
//                     <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
//                         <Link to='/register'><Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button></Link>
//                     </div>
                

//                 </div> 
//                 {isError&&<Error error={error.data.message}/>}   
//             </div>
//         </>
//     )
// }



