import React from "react"

type CardInCartType = {
    title: string;
    price: number;
    imageUrl: string;
    company: string;
    DeleteItem: () => void;
}

const CardInCart: React.FC<CardInCartType> = ({title, price, imageUrl, company, DeleteItem}) => {
    return(
        <>
            <div className="CardInCart">
                <img src={imageUrl} alt="cardimg" />
                <p className="title">{title}</p>
                <span>{company}</span>
                <div className="price">${price}</div>
                <svg onClick={DeleteItem} xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                  viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M18 6 6 18">
                </path><path d="m6 6 12 12"></path></svg>
            </div>
        </>
    )
}

export default CardInCart;