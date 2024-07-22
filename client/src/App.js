import './App.css';
import './components/Login'
import Login from './components/Login';
import Navbar from './components/Navbar';
import "primereact/resources/themes/arya-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import Register from './components/Register';
import { Route, Routes } from "react-router-dom";
import Chanut from './components/Chanut';
import BasketDesign from './components/BasketDesign';
import useAuth from './hooks/useAuth';
import HomePage from './components/HomePage';
import Payment from './components/Payment';
import Category from './components/manager/Category'
import Order from './components/manager/Order'
import Product from './components/manager/Product'
import User from './components/manager/User'
import Orders from './components/Orders';

function App() {
  
  const {isAdmin,name} = useAuth()
  console.log("name",name);
  console.log("isAdmin++++",isAdmin);
  return (

    <div className="App">      
      <Navbar name={name}></Navbar>      
      <Routes>      
        <Route path="/" element={<HomePage />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
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
