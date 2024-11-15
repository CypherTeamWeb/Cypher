export default function CardInWishList({title, company, price, imageUrl}){
    return (
        <div className="cardInWishList">
                <img width={85} height={70} src={imageUrl} alt="" />
                <p className="name" title={title}>{title == 'Red Dead Redemption 2' ? 'Red Dead Redem...' : title}</p>
                <span className="company">{company}</span>
                <div className="price">${price}</div>
        </div>
    )
}