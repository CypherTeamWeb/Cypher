import { useSelector } from "react-redux"

export default function ShoppingCartTopSection({Close}){
    const lang = useSelector((state) => state.setting.value);
    return (
        <div className="topSection">
            <h3>{lang === 'Русский' ? 'Корзина' :'Shopping Cart'}</h3>
            <svg onClick={() => Close()} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M18 6 6 18">
                </path><path d="m6 6 12 12"></path>
            </svg>
        </div>
    )
}