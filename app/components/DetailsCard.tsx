import React from "react"
import { DetailsCardProps, ShoppingCartItem } from '../types'

export const DetailsCard: React.FC<DetailsCardProps> = ({
    id,
    title,
    body,
    price,
    product_type,
    thumbnail,
    shoppingCartItems,
    setShoppingCartItems,
}) => {
    const addToCart = () => {
        const duplicateItemIndex = shoppingCartItems.findIndex((item: ShoppingCartItem) => item.id === id)
        if(duplicateItemIndex === -1){
            //If item is not already in cart
            const itemDetails = {
                id,
                title,
                price,
                product_type,
                thumbnail,
                quantity: 1
            }
            setShoppingCartItems([...shoppingCartItems, itemDetails])
        }else{
            shoppingCartItems[duplicateItemIndex].quantity += 1
            setShoppingCartItems([...shoppingCartItems])
        }
    }
    return(
        <div>
            <div className='details-card'>
                <div className='details-title'>{title}</div>
                <div className='description bold'>About</div>
                <div className='description'>{body}</div>
                <div className='btn-container'>
                    <button onClick={addToCart} className='add-to-cart-btn'>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}