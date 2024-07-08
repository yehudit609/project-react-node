import logo from './logo.svg';
import './App.css';
import './components/Login'
import Login from './components/Login';
import Navbar from './components/Navbar';
import Payement from './components/Payement';


import Manager from './components/Manager';
import "primereact/resources/themes/arya-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"


import Register from './components/Register';
import { Route, Routes } from "react-router-dom";
import Chanut from './components/Chanut';
import Petifures from './components/Product/Petifures';
import Bars from './components/Product/Bars';
import Cakes from './components/Product/Cakes';
import FruitDesigns from './components/Product/FruitDesigns';
import ShowcaseCakes from './components/Product/ShowcaseCakes';
import GlutenFree from './components/Product/GlutenFree';
import { Navigate } from 'react-router-dom';
import BasketDesign from './components/BasketDesign';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';
import HomePage from './components/HomePage';
import PaymentRightSide from './components/PaymentRightSide';
import Payment from './components/Payment';
//import HomePage from './components/HomePage';
import Category from './components/manager/Category'
import Order from './components/manager/Order'
import Product from './components/manager/Product'
import User from './components/manager/User'
import Orders from './components/Orders';
import ManagerOrders from './components/ManagerOrders';

function App() {
  
  
  const {isAdmin,name} = useAuth()
  console.log(name);
  console.log("isAdmin++++",isAdmin);
  return (

    <div className="App">  
     
      <Navbar name={name}></Navbar>
      
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Petifures" element={<Petifures />} />
        <Route path="/Bars" element={<Bars />} />
        <Route path="/Cakes" element={<Cakes />} />
        <Route path="/FruitDesigns" element={<FruitDesigns />} />
        <Route path="/GlutenFree" element={<GlutenFree />} />
        <Route path="/ShowcaseCakes" element={<ShowcaseCakes />} />
        <Route path="/BasketDesign" element={<BasketDesign />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/managerOrders" element={<managerOrders />} />
        <Route path="/Chanut/:category" element={<Chanut />} />

        <Route path="/Category" element={<Category />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/User" element={<User />} />

      </Routes>
    </div>
  );
}

export default App;
