import React from "react"
import data from "~/consts/dummyData.json"
import { ListingCard } from "~/components/ListingCard"

export interface Props {
}

export const Listings: React.FC<Props> = () => {
    const products = data.products
    let parsedListingCards = products.map(product => <ListingCard key={product.id} {...product} />)

    return (
        <div className='listings flex'>
            {parsedListingCards}
        </div>
    )
}
