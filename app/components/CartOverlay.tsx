import React, { useState, useEffect } from "react"
import CartIcon from "../consts/cart-icon.svg"
import CloseButton from "../consts/close-button.svg"
import { CartItem } from "./CartItem"
import { RecommendedItem } from "./RecommendedItem"
import dummyData from "../consts/dummyData.json"
import { CartOverlayProps, ShoppingCartItem } from '../types'


export const CartOverlay: React.FC<CartOverlayProps> = ({
    showHideCart,
    shoppingCartItems,
    setShoppingCartItems,
    subtotal,
    numOfTrees
}) => {
    const [shownRecommendations, setShownRecommendations] = useState([...dummyData.recommendations])

    const calculateFreeShipping = () => {
        let freeShipping = subtotal >= 150 ? true : false
        let diff = 150 - subtotal
        let freeShippingCopy = freeShipping ? 'Shipping is free!' : <span>You're <b>${diff.toFixed(2)}</b> away from free shipping!</span>
        return freeShippingCopy
    }

    const addRecommendedToCart = (itemDetails: ShoppingCartItem) => {
        const removeRecommendedKit = (foundItemIndex: number) => {
            shownRecommendations.splice(foundItemIndex, 1)
            setShownRecommendations([...shownRecommendations])
        }
        const foundItemIndex = shownRecommendations.findIndex(item => item.id === itemDetails.id)
        if (itemDetails.id === 1532751872052 && numOfTrees !== 0) {
            //Tree Planting Kit
            const foundTreeKit = shoppingCartItems.findIndex(item => item.id === itemDetails.id)
            if (foundTreeKit === -1) { //Adding to Cart for First Time
                setShoppingCartItems([...shoppingCartItems, itemDetails])
                if (numOfTrees === 1) {
                    removeRecommendedKit(foundItemIndex)
                }
            } else if (shoppingCartItems[foundTreeKit].quantity < numOfTrees) {
                shoppingCartItems[foundTreeKit].quantity += 1
                if (shoppingCartItems[foundTreeKit].quantity === numOfTrees) {
                    removeRecommendedKit(foundItemIndex)
                }
                setShoppingCartItems([...shoppingCartItems])
            } else {
                shoppingCartItems[foundTreeKit].quantity += 1
                setShoppingCartItems([...shoppingCartItems])
            }
        } else {
            removeRecommendedKit(foundItemIndex)
            setShoppingCartItems([...shoppingCartItems, itemDetails])
        }
    }

    const parsedCartItems = shoppingCartItems.map(cartItem => <CartItem
        shownRecommendations={shownRecommendations}
        allRecommendations={dummyData.recommendations}
        setShownRecommendations={setShownRecommendations}
        shoppingCartItems={shoppingCartItems}
        setShoppingCartItems={setShoppingCartItems}
        numOfTrees={numOfTrees}
        key={cartItem.id}
        {...cartItem}
    />)

    const parsedRecommendations = shownRecommendations.map(item => <RecommendedItem
        addRecommendedToCart={addRecommendedToCart}
        key={item.id}
        {...item}
    />)

    return (
        <div className='cart-overlay flex' >
            <div className='cart-details'>
                <div className='cart-header'>
                    <button className='overlay-close-btn' onClick={showHideCart}><img src={CloseButton} /></button>
                    <div className='cart-icon-div'>
                        <img src={CartIcon} />
                    </div>
                </div>
                <div className='free-shipping-container'>
                    <span>{calculateFreeShipping()}</span>
                    <progress id='free-shipping-progress' value={subtotal} max="150" />
                </div>
                {parsedCartItems}
                <div className='subtotal-container'>
                    <div className='subtotal-copy'>Subtotal</div>
                    <div className='subtotal-value'>${subtotal.toFixed(2)}</div>
                </div>
                <hr />
                <div className='recommended-items'>
                    <div className='rec-copy'>Recommended Items</div>
                    {parsedRecommendations}
                </div>
            </div>
        </div>
    )
}