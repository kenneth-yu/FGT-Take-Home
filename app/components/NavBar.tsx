import React, { useEffect, useState, Dispatch, SetStateAction } from "react"
//Ideally these assets would come from something like a design system
import logo from "../consts/fgt-logo.svg"
import cartIcon from "../consts/cart-desktop.svg"
import ellipse from "../consts/ellipse.svg"
import { CartOverlay } from "./CartOverlay"
import { ShoppingCartItem } from '../types'


export interface Props {
    shoppingCartItems: ShoppingCartItem[]
    setShoppingCartItems: Dispatch<SetStateAction<ShoppingCartItem[]>>
}

export const NavBar: React.FC<Props> = ({ shoppingCartItems, setShoppingCartItems }) => {
    const [showCartOverlay, setShowCartOverlay] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [numOfTrees, setNumOfTrees] = useState(0)

    useEffect(() => {
        let quantityCounter = 0
        let subtotalCounter = 0
        let numOfTreesCounter = 0
        shoppingCartItems.forEach((item) => {
            quantityCounter += item.quantity
            subtotalCounter += (item.quantity * item.price)
            if (item.product_type === 'Tree') {
                numOfTreesCounter += item.quantity
            }
        })
        setQuantity(quantityCounter)
        setSubtotal(subtotalCounter)
        setNumOfTrees(numOfTreesCounter)
    }, [shoppingCartItems])

    const showHideCart = () => {
        setShowCartOverlay(!showCartOverlay)
    }

    return (
        <div id='nav-bar'>
            {showCartOverlay && <CartOverlay
                showHideCart={showHideCart}
                shoppingCartItems={shoppingCartItems}
                setShoppingCartItems={setShoppingCartItems}
                subtotal={subtotal}
                numOfTrees={numOfTrees}
            />}
            <a href='/'>
                <img id='logo' className='nav-img' src={logo} alt="fast-growing-trees-logo" />
            </a>
            <div className='cart-icon-container' onClick={showHideCart}>
                <img onClick={showHideCart} id='cart-icon' className='nav-img' src={cartIcon} alt="cart-icon" />
                {quantity > 0 && <img id='quantity-ellipse' src={ellipse} />}
                {quantity > 0 && <span id='cart-quantity'>{quantity}</span>}
            </div>
        </div>
    )
}