import React from "react"
import PlusCircle from '../consts/plus-circle-1.svg'
import { ReccomendItemProps } from '../types'

export const RecommendedItem: React.FC<ReccomendItemProps> = ({
    id,
    thumbnail,
    title,
    price,
    product_type,
    addRecommendedToCart
}) => {

    const itemDetails = {
        id,
        title,
        price,
        product_type,
        thumbnail,
        quantity: 1
    }

    return (
        <div className='recommended-item'>
            <img className='cart-item-img' src={thumbnail.src} />
            <div className='recommended-title'>{title}</div>
            <img className='rec-plus clickable' onClick={() => addRecommendedToCart(itemDetails)} src={PlusCircle} />
        </div>
    )
}