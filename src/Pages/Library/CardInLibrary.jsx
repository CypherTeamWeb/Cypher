import styles from './styles.module.scss';

export default function CardInLibrary({title, imageUrl, price, corporation}){
    return (
        <>
            <div className={styles.CardInLibrary}>
                <img src={imageUrl} alt="CardImg" />
                
                <div className={styles.description}>
                    <h4>{title}</h4>
                    <h4 className={styles.corporation}>{corporation}</h4>
                    <p>${price}</p>

                    <div className={styles.downloadWrapper} title='Download'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="currentColor" className={styles.download} viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}