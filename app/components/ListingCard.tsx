import React, { useState, SyntheticEvent } from "react"
import { Props } from '../types'
import FallBackTreeImage from '../consts/fall-back-tree-img.jpeg'

export const ListingCard: React.FC<Props> = ({
    id,
    title,
    thumbnail
}) => {
    const [imgSrc, setImgSrc] = useState(thumbnail.src)

    const handleMissingImg = (e: any) => {
        e.stopPropagation()
        setImgSrc(FallBackTreeImage)
    }

    return (
        <a href={`/id/${id}`} className='listing-card'>
            <img className='listing-thumbnail' onError={handleMissingImg} src={imgSrc} />
            <span className='listing-title'>{title}</span>
        </a>
    )
}
