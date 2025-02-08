import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GamesJson from '../Configs/Games.json'
import { Link } from "react-router-dom";


type itemObjType = {
    title: string;
    price: number;
    company: string;
    imageUrl: string;
    email: string;
    description: string;
    id: number;
    images: string[];
  }

const FullCard: React.FC = () => {
    const {id} = useParams();
    const [items, SetItems] = useState<itemObjType[]>([]);
    const [swiperImageActive, SetSwiperImageActive] = useState<number>(0);
    
    useEffect(() => {
        SetItems(GamesJson.filter((obj: itemObjType) => obj.id === Number(id)));
    }, [])

    const swiperLeft = (length: number) => {
        SetSwiperImageActive((prev: number) => swiperImageActive !== 0 ? prev - 1 : length - 1);
    }

    const swiperRigth = (length: number) => { 
        SetSwiperImageActive((prev: number) => swiperImageActive !== length - 1 ? prev + 1 : 0);
    }

    return(
        <>
            <div className="FullCard">
                <Link className="Back" to={'/'}>Back</Link>
                {items.map((obj: any) => (
                    <>
                        <div className="swiperWrapper">
                            <svg className="SwiperLeft" onClick={() => swiperLeft(obj.images.length)} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 6.93015L6.86175 1" stroke='#fff' stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            <img key={swiperImageActive} src={obj.images[swiperImageActive]} alt="" />
                            <svg className="SwiperRight" onClick={() => swiperRigth(obj.images.length)} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 6.93015L6.86175 1" stroke='#fff' stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                       <div className="info">
                            <h1>{obj.title}</h1>
                            <h3>Price: {obj.price}$</h3>
                            <p>{obj.description}</p>
                            <div className="AddToCart">
                                Add to cart
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1">
                                </circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                            </div>
                       </div>
                    </>
                ))}
            </div>
        </>
    );
}

export default FullCard;