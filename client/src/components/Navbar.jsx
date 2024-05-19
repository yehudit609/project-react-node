import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiSlice from '../app/apiSlice';
import { removeToken } from '../features/auth/authSlice';
import useAuth from '../hooks/useAuth';

export default function Navbar(props) {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            {/* <span className={item.icon} /> */}
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const {isAdmin,name} = useAuth()

    const AdminItems =   [
        {
            label: 'דף הבית',
            url:'/'
        },
        {
            label: 'מוצרים',
            url:'/Product'
        },
        {
            label: 'משתמשים',
            url:'/User'
        },
        {
            label: 'קטגוריות',
            url:'/Category'
        },
        {
            label: 'הזמנות',
            url:'/Order'
        },
        
        {
            label: 'לאיזור האישי',
            items: [
                {
                    label: 'התחברות',                 
                    url:'./Login'
                },
                
                {
                    separator: true
                },
                {
                    label: 'התנתקות',
                    command: () => {
                        dispatch(removeToken())
                        //dispatch(apiSlice.util.resetApiState())
                        navigate("/")
                    },
                   
                }
            ]
        }
    ];
    const UserItems = [
        {
            label: 'דף הבית',
            url: '/'
        },
        // {
        //     label: 'צור קשר',
        //     url: '/'
        // },
        // {
        //     label: 'שאלות נפוצות'
        // },
        // {
        //     label: 'אודותינו'
        // },
        // {
        //     label: 'גלריה',
        //     url: '/Chanut'
        // },
        {
            label: 'חנות',
            items: [
                {
                    label: 'פטיפורים',
                    url: '/Chanut/Petifures'
                },
                {
                    label: 'עוגות ויטרינה',
                    url: '/Chanut/ShowcaseCakes'
                },
                {
                    label: 'ללא גלוטן',
                    url: '/Chanut/GlutenFree'
                },
                {
                    label: 'בארים',
                    url: '/Chanut/Barim'
                },
                {
                    label: 'עוגות',
                    url: '/Chanut/Cakes'
                },
                {
                    label: 'מגשי פירות',
                    url: '/Chanut/FruitDesigns'


                }
            ]
        },
        {
            label: 'לאיזור האישי',
            items: [
                {
                    label: 'התחברות',
                    url: '/Login'
                },
                {
                    label: 'הרשמה',
                    url: '/Register'
                },
                {
                    separator: true
                },
                {
                    label: 'התנתקות',
                    command: () => {
                        dispatch(removeToken())
                        // dispatch(apiSlice.util.resetApiState())
                        navigate("/")
                    },
                }
            ]
        },
        {
            icon:'pi pi-cart-plus',
            url: '/BasketDesign'
        }
    ];
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    //פה מחליפים את האיקון, בנתיב של ה src
    const start = <img alt="logo" src={`http://localhost:7777/uploads/newlogo.jpg`} height="60" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            {/* <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> */}
        </div>
    );
        
    const items = isAdmin?AdminItems:UserItems

    return (
        
        <div className="card" style={{ position: 'sticky', top: 15, zIndex: 10000 }}>
            <Menubar model={items} start={start} end={end} />
            {/* {console.log(props.name+" Menubar")} */}
        </div>
        
    )
}