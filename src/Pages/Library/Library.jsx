import styles from './styles.module.scss';
import {Link} from 'react-router-dom';
import CardInLibrary from './CardInLibrary';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { orderItemsSet } from '../../redux/slices/itemsSlice';

export default function Library(){
    const email = useSelector((state) => state.setting.email);
    const items = useSelector((state) => state.items.orderItems);
    const lang = useSelector((state) => state.setting.value);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://6752a82ef3754fcea7b91e39.mockapi.io/Library').then((res) => {
            let cart = [];
            cart = res.data.filter((obj) => obj.email == email);
            dispatch(orderItemsSet(cart));
        })
    }, [])

    return (
        <>
            {items.length && <div className={styles.wrapper}>
                <Link to={'/'} className={styles.back}>Back</Link>
                <h1 className={styles.title}>Library</h1>

                <div className={styles.cardWrapper}>
                    {items.map((obj) => (
                        <>
                            <CardInLibrary title={obj.title} price={obj.price} imageUrl={obj.imageUrl} corporation={obj.company} />
                        </>
                    ))}
                </div>
            </div>}

            {!items.length && 
                <div className={styles.wrapper}>
                    <Link to={'/'} className={styles.back}>Back</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className={styles.emptySvgOrder} viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                    <h1 className={styles.orderEmptyH1}>{lang === 'Русский' ? 'Извините, но ваша библеотека пуста.' : 'Sorry, but your library is empty.'}</h1>
                    <h3>{lang === 'Русский' ? 'Чтобы сделать заказ зайдите в корзину и нажмите на кнопку "Купить"' :'To place an order, go to the shopping cart and click on the "Buy" button'}</h3>
                    <Link to={'/'} className={styles.backButton}>{lang === 'Русский' ? 'Назад' : 'Back'}</Link>
                </div>
            }
        </>
    );
}