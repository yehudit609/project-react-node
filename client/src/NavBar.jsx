import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
export default function NavBar() {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        // {
        //    label: localStorage.getItem("userFirstName",userFirstName)
        // },
        {
            label: 'שאלות נפוצות',
            url:'/',
            key:1
        },
        {
            label: 'צור קשר',
            key:2
        },
        {
            label: 'מאמרים',
            key:3  
        },
        {
            label: ' המלצות', 
            key:4                 
        },
        {
            label: 'גלריה',
            key:5
        },
        {
            label: 'חנות',
            url:'/Chanut',
            key:5  
        },
        {
            label: ' אודותינו', 
            key:5                 
        },
        {
            label: ' פרופיל משתמש',
            items: [
                {
                    label: 'רישום',
                    url:'/register'
                },
                {
                    label: 'התחברות',                 
                    url:'/login'
                },
                {
                    label: 'ההודעות שלי',
                    badge: 3,
                },
                {
                    label: 'סל',
                },
                {
                    separator: true
                },
                // {
                //     label: 'Templates',
                //     icon: 'pi pi-palette',
                //     items: [
                //         {
                //             label: 'Apollo',
                //             icon: 'pi pi-palette',
                //             badge: 2,
                //             template: itemRenderer
                //         },
                //         {
                //             label: 'Ultima',
                //             icon: 'pi pi-palette',
                //             badge: 3,
                //             template: itemRenderer
                //         }
                //     ]
                // }
            ]

        }
    ];
    const start = <img alt="logo" src="logo.png" height="60" className="mr-2"></img>;   
    const end = (
        <div className="flex align-items-center gap-2">
            {/* <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> */}
             {/* <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> */}
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}
