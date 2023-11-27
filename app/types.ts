import React, { Dispatch, SetStateAction } from 'react'

type Dispatcher<S> = Dispatch<SetStateAction<S>>

/** @public */
export interface Images {
    id: number
    product_id: number
    created_at: string
    updated_at: string
    alt: any
    width: number
    height: number
    src: string
    variant_ids: never[]
}

/** @public */
export interface Thumbnail {
    id: number
    product_id: number
    created_at: string
    updated_at: string
    alt: any
    width: number
    height: number
    src: string
    variant_ids: never[]
}

/** @public */
export interface Props {
    id: number
    title: string
    body: string
    vendor: string
    product_type: string
    price: number
    tags: string
    images: Images[]
    thumbnail: Thumbnail
}

export interface RecommendedItemProp{
    id: number
    title: string
    price: number
    product_type: string
    thumbnail: Thumbnail
}

/** @public */
export interface ShoppingCartItem extends RecommendedItemProp {
    quantity: number
}

/** @public */
export interface SetShoppingCartItems{
    setShoppingCartItems: Dispatcher<ShoppingCartItem[]>
}

/** @public */
export interface SetShowHideCart{
    setShowHideCart: Dispatcher<boolean>
}

/** @public */
export interface CartOverlayProps{
    showHideCart: () => void
    shoppingCartItems: ShoppingCartItem[]
    setShoppingCartItems: Function
    subtotal: number
    numOfTrees: number
}

export interface CartItemProps extends ShoppingCartItem{
    shoppingCartItems: ShoppingCartItem[]
    setShoppingCartItems: Function
    shownRecommendations: RecommendedItemProp[]
    setShownRecommendations: Function
    allRecommendations: Props[]
    numOfTrees: number
}

export interface ReccomendItemProps{
    id: number
    title: string
    price: number
    product_type: string
    thumbnail: Thumbnail
    addRecommendedToCart: {(itemDetails: ShoppingCartItem): void}
}

export interface AllRecommendationProps extends Props{
    
}

export interface DetailsCardProps extends Props{
    shoppingCartItems: ShoppingCartItem[]
    setShoppingCartItems: Function
}

export interface ListingsProps extends Props{
    shoppingCartItems: ShoppingCartItem[]
    setShoppingCartItems: SetShoppingCartItems
}

