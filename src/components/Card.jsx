import axios from "axios";
import { useEffect, useState } from "react"
import { itemsSet, wishlistSet } from "../redux/slices/itemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchItems } from "../redux/slices/itemsSlice";

export default function Card({price = '', title = '', imageUrl = '', company = '',sale = '',proccentSale = ''}){
    const [inFavorite, setInFavorite] = useState(false);
    const [inCart, setInCart] = useState(false);
    const redirect = useNavigate();

    const isLogin = useSelector((state) => state.setting.isLogin);
    const email = useSelector((state) => state.setting.email);
    const item = useSelector((state) => state.items.value);
    const wishtlist = useSelector((state) => state.items.wishlist);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/Wishlist').then((res) => {
            res.data.forEach((obj) => { 
                let cart = [];
                if(obj.email == email && obj.imageUrl == imageUrl){
                    setInFavorite(true);
                    cart = res.data.filter((obj) => obj.email == email)
                    dispatch(wishlistSet(cart))
                }
            })
        })
        
        axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson').then((res) => {
            res.data.forEach((obj) => { 
                let cart = [];
                if(obj.email == email && obj.imageUrl == imageUrl){
                    setInCart(true);
                    cart = res.data.filter((obj) => obj.email == email)
                    dispatch(itemsSet(cart))
                }
            })
        })
    }, [])

    const AddTocart = async () => {
        setInCart(!inCart);

        !inCart && await axios.post('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson', {title, price, company, imageUrl, email})

         await axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson').then(async (res) => {
            !inCart && res.data.forEach(async (obj) => {
                await obj.email == email && dispatch(itemsSet([...item, obj]))
            })

            inCart && res.data.forEach(async (obj) => {
                if(obj.email == email && obj.title == title){
                    await axios.delete(`https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson/${obj.id}`)
                    dispatch(fetchItems({
                        email,
                        url: 'https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson'
                    }))
                }
            })
        })
    }

    const AddToFavorite = async () => {
        setInFavorite(!inFavorite)

        !inFavorite && await axios.post('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/Wishlist', {title, price, company, imageUrl, email})

        await axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/Wishlist').then(async (res) => {
            !inFavorite && res.data.forEach(async (obj) => {
                await obj.email == email && dispatch(wishlistSet([...wishtlist, obj]))
            })

            inFavorite && res.data.forEach(async (obj) => {
                if(obj.email == email && obj.title == title){
                    await axios.delete(`https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/Wishlist/${obj.id}`)
                    dispatch(fetchItems({
                        email,
                        url: 'https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/Wishlist'
                    }))
                }
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
                        <div className="addToCart" onClick={isLogin ? AddTocart : () => redirect('/Login') }>
                            {!inCart && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>}
                            {inCart && <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop: '5px'}} width="25" height="25" fill="#fff" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/></svg>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}