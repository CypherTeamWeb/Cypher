import React from "react"

type CardInWishListType = {
    title: string;
    price: number;
    imageUrl: string;
    company: string;
}

const CardInWishList: React.FC<CardInWishListType> = ({title, company, price, imageUrl}) => {
    return ( 
        <div className="cardInWishList">
                <img width={85} height={70} src={imageUrl} alt="" />
                <p className="name" title={title}>{title == 'Red Dead Redemption 2' ? 'Red Dead Redem...' : title}</p>
                <span className="company">{company}</span>
                <div className="price">${price}</div>
        </div>
    )
}

export default CardInWishList