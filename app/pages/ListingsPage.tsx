import React ,{ useEffect, useState } from 'react'
import { NavBar } from "~/components/NavBar"
import { Listings } from "~/components/Listings"
import { ShoppingCartItem } from '~/types'


export const ListingsPage = () => {
    const [shoppingCartItems, setShoppingCartItems] = useState<ShoppingCartItem[]>([])
    
    useEffect(()=>{
        const storedCartString = window.localStorage.fastGrowingCart
        const storedCardJson = storedCartString && JSON.parse(storedCartString)
        if(storedCardJson?.length > 0 && shoppingCartItems.length === 0){
            setShoppingCartItems(JSON.parse(window.localStorage.fastGrowingCart))
        }
    }, [])

    useEffect(()=>{
        window.localStorage.setItem('fastGrowingCart', JSON.stringify(shoppingCartItems))
    },[shoppingCartItems])

    return (
        <div className='page-container'>
            <NavBar 
                shoppingCartItems={shoppingCartItems} 
                setShoppingCartItems={setShoppingCartItems}
            />
            <Listings/>
        </div>
    )
}
