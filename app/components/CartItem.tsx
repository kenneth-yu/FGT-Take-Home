import React from "react"
import MinusCircle from '../consts/minus-circle-1.svg'
import PlusCircle from '../consts/plus-circle-1.svg'
import TrashIcon from '../consts/trash-icon.svg'
import { CartItemProps, ShoppingCartItem } from "~/types"

export const CartItem: React.FC<CartItemProps> = ({
    id,
    price,
    thumbnail,
    title,
    quantity,
    product_type,
    shoppingCartItems,
    setShoppingCartItems,
    shownRecommendations,
    setShownRecommendations,
    allRecommendations,
    numOfTrees,
}) => {

    const itemDetails = {
        id,
        title,
        price,
        product_type,
        thumbnail,
        quantity: 1
    }

    const quantityHandler = (e: { target: HTMLInputElement; }) => {
        //duplicate code here. Would refactor so it can be used in multiple places
        const foundItemIndex = shoppingCartItems.findIndex((item) => item.id === id)
        if (e.target.id === 'minus-btn') {
            if (shoppingCartItems[foundItemIndex].quantity > 1) { //prevents item quantity from going negative
                //can either remove the item if it hits 0 OR disable the minus button when there is only quantity 1
                shoppingCartItems[foundItemIndex].quantity -= 1
                setShoppingCartItems([...shoppingCartItems])
                if (id === 1532751872052) {
                    const foundRecIndex = shownRecommendations.findIndex((item) => item.id === id)
                    if (foundRecIndex === -1 && shoppingCartItems[foundItemIndex].quantity < numOfTrees) {
                        setShownRecommendations([...shownRecommendations, itemDetails])
                    }
                } else if (product_type === 'Tree') { //This helps recheck if numOfTrees === Tree Planting Kits
                    const foundTreePlantingKitInCart = shoppingCartItems.findIndex((item) => item.id === 1532751872052)
                    const foundRecIndex = shownRecommendations.findIndex((item) => item.id === 1532751872052)
                    if (shoppingCartItems[foundTreePlantingKitInCart].quantity === numOfTrees) {
                        shownRecommendations.splice(foundRecIndex, 1)
                        setShownRecommendations([...shownRecommendations])
                    }
                }
            }
        } else {
            if (id === 1532751872052) {
                const foundTreeKit = shownRecommendations.findIndex((item) => item.id === id)
                if (shoppingCartItems[foundItemIndex].quantity < numOfTrees) {
                    shoppingCartItems[foundItemIndex].quantity += 1
                    if (shoppingCartItems[foundItemIndex].quantity === numOfTrees) {
                        shownRecommendations.splice(foundTreeKit, 1)
                        setShownRecommendations([...shownRecommendations])
                    }
                    setShoppingCartItems([...shoppingCartItems])
                } else {
                    shoppingCartItems[foundItemIndex].quantity += 1
                    setShoppingCartItems([...shoppingCartItems])
                }

            } else {
                shoppingCartItems[foundItemIndex].quantity += 1
                setShoppingCartItems([...shoppingCartItems])
                if (product_type === 'Tree') { //This helps recheck if numOfTrees === Tree Planting Kits
                    const foundTreePlantingKitInCart = shoppingCartItems.findIndex((item) => item.id === 1532751872052)
                    const foundRecIndex = shownRecommendations.findIndex(item => item.id === 1532751872052)
                    if (foundRecIndex === -1 && shoppingCartItems[foundTreePlantingKitInCart].quantity <= numOfTrees) {
                        const treePlantingKit = allRecommendations.find((item) => item.id === 1532751872052)
                        setShownRecommendations([...shownRecommendations, treePlantingKit])
                    }
                }
            }
        }
    }

    const removeFromCart = () => {
        const foundItemIndex = shoppingCartItems.findIndex((item: ShoppingCartItem) => item.id === id)
        shoppingCartItems.splice(foundItemIndex, 1)
        setShoppingCartItems([...shoppingCartItems])
        //We can make this more modular by storing all of the recommended ids into a object and checking to see
        //if one of the id exists as a recommended
        if (id === 4813305610302 || id === 1532751872052) {
            const foundRecIndex = shownRecommendations.findIndex((item) => item.id === id)
            if (foundRecIndex === -1) {
                setShownRecommendations([...shownRecommendations, itemDetails])
            }
        }
    }

    return (
        <div className='cart-item flex'>
            <img className='cart-item-img' src={thumbnail.src} />
            <div className='cart-item-details'>
                <span>{title}</span>
                <div className='stepper-container'>
                    <div>${price}</div>
                    <img onClick={(e: any) => quantityHandler(e)} id='minus-btn' className='stepper-btn clickable' src={MinusCircle} />
                    {quantity}
                    <img onClick={(e: any) => quantityHandler(e)} id='plus-btn' className='stepper-btn clickable' src={PlusCircle} />
                </div>
            </div>
            <div className='trash-btn'>
                <img className='clickable' onClick={removeFromCart} src={TrashIcon} />
            </div>
        </div>
    )
}