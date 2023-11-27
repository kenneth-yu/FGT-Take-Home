import React ,{ useEffect, useState } from 'react'
import { NavBar } from "~/components/NavBar"
import { DetailsCard } from "~/components/DetailsCard"
import { ShoppingCartItem } from '~/types'

export interface DetailsProps{
    data: any
}

export const DetailsPage: React.FC<DetailsProps> = ({ data }) => {
    const [shoppingCartItems, setShoppingCartItems] = useState<ShoppingCartItem[]>([])
    const image = data.images?.[0]

    useEffect(()=>{
        const storedCartString = window.localStorage.fastGrowingCart
        const storedCardJson = storedCartString && JSON.parse(storedCartString)
        if(storedCardJson?.length > 0 && shoppingCartItems.length === 0){
            setShoppingCartItems(JSON.parse(window.localStorage.fastGrowingCart))
        }
    }, [])

    useEffect(()=>{
        window.localStorage.setItem('fastGrowingCart', JSON.stringify(shoppingCartItems))
        console.log(shoppingCartItems)
        console.log(shoppingCartItems)
    },[shoppingCartItems])


    return (
        <div className='page-container'>
            <NavBar
                shoppingCartItems={shoppingCartItems} 
                setShoppingCartItems={setShoppingCartItems}
            />
            <div className='product-details'>
                <div className='details-image-container'>
                    <img className="details-image" src={image.src}/>
                </div>
                <DetailsCard 
                    {...data}
                    shoppingCartItems={shoppingCartItems} 
                    setShoppingCartItems={setShoppingCartItems}
                    />
            </div>
        </div>
    )
}
