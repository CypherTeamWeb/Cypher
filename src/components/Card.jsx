import axios from "axios";
import { useEffect, useState } from "react"
import { itemsSet, wishlistSet } from "../redux/slices/itemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Card({price = '', title = '', imageUrl = '', company = '',sale = '',proccentSale = ''}){
    const [inFavorite, setInFavorite] = useState(false);
    const [inCart, setInCart] = useState(false);
    const isLogin = useSelector((state) => state.setting.isLogin);
    const redirect = useNavigate();

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/Wishlist').then((res) => {
            res.data.forEach((obj) => {
                obj.imageUrl == imageUrl && setInFavorite(true)
            })
        })
        
        axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson').then((res) => {
            res.data.forEach((obj) => {
                obj.imageUrl == imageUrl && setInCart(true);
            })
        })
    }, [])

    const AddTocart = async () => {
        setInCart(!inCart);
        !inCart && await axios.post('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson', {title, price, company, imageUrl})

        await axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson').then((res) => {
            !inCart && dispatch(itemsSet(res.data));

            inCart && res.data.forEach(async (obj) => {
                obj.title == title && await axios.delete(`https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson/${obj.id}`)
                obj.title == title && await axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson').then((res) => dispatch(itemsSet(res.data)))
            })
        })
    }

    const AddToFavorite = async () => {
        setInFavorite(!inFavorite)
        !inFavorite && await axios.post('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/Wishlist', {title, price, company, imageUrl});

        await axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/Wishlist').then((res) => {
            !inFavorite && dispatch(wishlistSet(res.data));

            inFavorite && res.data.forEach(async (obj) => {
                obj.title == title && await axios.delete(`https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/Wishlist/${obj.id}`);
                obj.title == title && await axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/Wishlist').then((res) => dispatch(wishlistSet(res.data)))
            })
        })
    }

    return (
        <>
            <div className="card-wrapper">
                <div className="card">
                    <div className="img">
                        <img src={imageUrl} alt="CardImg" />
                        {proccentSale[0] && <div className="saleProcent">{proccentSale[0] && proccentSale[1] + '%'}</div>}
                    </div>
                    <div className="description">
                        <h4 className="title">{title}</h4>
                        <p className="Comporation">{company}</p>
                        <div className="price">${price}</div>
                        <div className="sale">{sale[0] && '$' + sale[1]}</div>
                        <div className="favorite" onClick={isLogin ? AddToFavorite : () => redirect('/Login')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                            fill={inFavorite ? 'red' : "none"}
                            stroke={inFavorite ? 'red' : "gray"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74
                            -2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 
                            2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                        </div>
                        <div className="addToCart" onClick={isLogin ? AddTocart : () => redirect('/Login')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1">
                            </circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}