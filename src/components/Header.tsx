import React, { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import CardInCart from "./CardInCart";
import EmptyWishList from './EmptyWishList'
import ShoppingCartTopSection from "./ShoppingCartTopSection";
import EmptyCart from './EmptyCart'
import UserTopSection from './UserTopSection'
import CardInWishList from "./CardInWishList";
import {SettingsSections} from '../Configs/Settings'
import SectionsOpenpage from "./SectionsOpen";
import debounce from 'lodash.debounce'
import { fetchItems } from "../redux/slices/itemsSlice";
import { IsLoginState } from '../App'

// redux import
import {useDispatch, useSelector} from 'react-redux';
import {itemsSet} from '../redux/slices/itemsSlice'
import { valueSet } from "../redux/slices/valueSlice";
import { nameSetSettings, emailSetSettings, isLoginset } from "../redux/slices/settingSlice";
import { AppDispatch } from "../redux/store";

type UsersType = {
  id: number;
  email: string;
  password: string;
  name: string;
}

type itemObjType = {
  title: string;
  price: number;
  company: string;
  imageUrl: string;
  email: string;
  id: number;
}

const Header: React.FC = () => {
    const [CartOpen, setCartOpen] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(0);
    const [UserOpen, setUserOpen] = useState<boolean>(false);
    const [WishListOpen, setWishListOpen] = useState<boolean>(false);
    const [SettingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [SectionsOpen, setSectionsOpen] = useState<string>('');
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [SearchValue, setSearchValue] = useState<string>('');
    const [loginNickname, setLoginNickname] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [loginEmail, setloginEmail] = useState<string>('');
    const [isReg, setIsReg] = useState<boolean>(false);
    const [isOredered, setIsOrdered] = useState<boolean>(false);

    const isLogin = useSelector(IsLoginState)
    const item: Array<itemObjType> = useSelector(ItemsState);
    const WishlistItems = useSelector(WishlishState);
    const lang = useSelector(LangState);
    const email = useSelector(EmailState);
    const Orderitems = useSelector(OrderItemsState);

    const dispatch = useDispatch<AppDispatch>();

    const UserOpenStyle: React.CSSProperties = {
      display: WishListOpen ? 'none' : 'block', 
      marginTop: menuOpen ? '100px' : '', 
    }

    const inputDebounce = useCallback(
      debounce((e: string) => {
        dispatch(valueSet(e));
      }, 300),
      []
    )

   useEffect(() => {
      setPrice(0);

      item.map((obj: itemObjType) => {
        setPrice((prev: number) => (prev + obj.price));
      })
   }, [item])

   const UserOnClick = () => {
    setUserOpen(!UserOpen);
    setCartOpen(false);
    setWishListOpen(false); 
    setSettingsOpen(false);
    setSectionsOpen('');
    setMenuOpen(false)
   }

   const closeCartHeader = () => {
    setCartOpen(!CartOpen);
    setUserOpen(false);
    setWishListOpen(false);
    setIsOrdered(false);
    setMenuOpen(false);
  }

  const deleteAllOrderItems = () => {
    try{
      axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson').then(async (res) => {
        let cart = res.data.filter((obj: itemObjType) => obj.email == email);
  
        await cart.map(async (obj: itemObjType) => {
          await axios.delete(`https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson/${obj.id}`)
        })
  
        dispatch(itemsSet([]))
      })
    } catch (e){
      console.error('Error', e);
    }
  }

   const completeOrder = async () => {
       let count = 0;

        await item.map(async (obj: itemObjType) => {
          await Orderitems.map((orderObj: itemObjType) => {
            if(obj.title == orderObj.title){
              count++;
            }
          })
        })

        
        if(count == 0){
          item.map(async (obj: itemObjType) => {
            setIsOrdered(true);

            let title = obj.title;
            let price = obj.price;
            let company = obj.company;
            let imageUrl = obj.imageUrl;
            let email = obj.email;
            
            try{
              await axios.post('https://6752a82ef3754fcea7b91e39.mockapi.io/Library', {title, price, company, imageUrl, email});
              deleteAllOrderItems()
            } catch (e) {
                console.error('Error', e);
            }
          })
        } else{
          alert('You already buy one of this items.');
        }
   }

   const DeleteItem = async (id: number) => {
      await axios.delete(`https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson/${id}`)
      dispatch(fetchItems({
        email,
        url: 'https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson'
    }))
  }

    const closeCart = () => {
      setCartOpen(false);
      setIsOrdered(false);
    }

    const settingsOnclick = (title: string) => {
        setSectionsOpen(title);
    }

    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        inputDebounce(e.target.value)
    }

    const isUserAlreadyExisted = () => {
      axios.get('https://6752a82ef3754fcea7b91e39.mockapi.io/users' + `?email=${loginEmail}`).then(async (res: AxiosResponse<any, any>) => {
          let count = 0;
          await res.data.forEach((obj: itemObjType) => {
              if(obj.email == loginEmail){
                  count++;
              }
          })

          if(count == 0){
              Login()
          } else{
              alert('This user already exist.');
              setloginEmail('')
              setLoginNickname('');
              setLoginPassword('');
          }
      }).catch((e) => {
        console.error('Error', e)
      })
  }

    const Login = async () => {
      if(loginEmail.includes('@') && loginEmail.includes('.') && loginEmail?.length > 6 && loginPassword?.length > 6 && 
        loginNickname?.length < 20) {   
            let email = '';
            axios.get('https://6752a82ef3754fcea7b91e39.mockapi.io/users' + `?email=${loginEmail}`).then((res) => {
                res.data.map((obj: UsersType) => {
                    if(obj.email === loginEmail){
                        email = obj.email
                    }
             })
           })

            if(isReg && loginNickname?.length < 20 && loginNickname?.length > 4 && email !== loginEmail){
                await axios.post('https://6752a82ef3754fcea7b91e39.mockapi.io/users', {name: loginNickname, password: loginPassword, email: loginEmail})
                dispatch(nameSetSettings(loginNickname))  
                dispatch(emailSetSettings(loginEmail));
                dispatch(isLoginset(true));
            } else{
                isReg && alert('Error this user already exist')
            }

            if(!isReg){
                axios.get(`https://6752a82ef3754fcea7b91e39.mockapi.io/users?email=${email}`).then((res) => {
                  res.data.map((obj: UsersType) => {
                    if(obj.password === loginPassword){
                      dispatch(nameSetSettings(obj.name))  
                      dispatch(emailSetSettings(loginEmail));
                      dispatch(isLoginset(true));
                  }
                  })
               })
            }

            setloginEmail('')
            setLoginNickname('');
            setLoginPassword('');
        } else {
            alert('Incorrectly entered data.');
            setLoginNickname('');
            setLoginPassword('');
        }
    }

    const MenuOpen = () => {
      setMenuOpen(!menuOpen);
      setUserOpen(false);
      setCartOpen(false);
    }

    const SingOut = () => {
      const ConfirmSingOut = confirm(lang == 'Русский' ? 'Вы уверенны что хотите выйти?' : 'Are you sure you want to sign out?')
      ConfirmSingOut && dispatch(isLoginset(false));
    }

    return (
        <>
            <div className="header">
              <Link className="toHome" to={'/'}>CypherTeam</Link>
              <div className="navigation" style={{display: menuOpen ? 'flex' : '', flexDirection: menuOpen ? 'column' : 'row', marginTop: menuOpen ? '70px' : ''}}>
                <a href="#Featured-games" style={{transform: menuOpen ? 'translate(100px,50px)' : ''}}
                >{lang === 'Русский' ? 'Магазин' : 'Store'}</a>
                <Link to="/Library" style={{transform: menuOpen ? 'translate(100px,20px)' : ''}}>
                  {lang === 'Русский' ? 'Библиотека' :'Library'}</Link>
                <Link to="/WorkTogether" className="WorkA" style={{transform: menuOpen ? 'translate(100px,-10px)' : ''}}>
                  {lang === 'Русский' ? 'Хотите присоединиться к нашей команде?' : 'Wanna work together?'}</Link>
              </div>

              <div className="menu-wrapper" onClick={MenuOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="menu" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
              </div>
              <div className="input-wrapper"> 
                <input type="text" className="input" value={SearchValue} onChange={inputOnChange} placeholder={lang === 'Русский' ? 'Поиск игр...' :"Search games..."}  />
                {<svg className="input-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8C939F"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="11" cy="11" r="8" ></circle><path d="m21 21-4.3-4.3"></path>
                </svg>}
              </div>

                <div className="Cart" onClick={closeCartHeader}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1">
                    </circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                    {item?.length ? <div className="count">{item!.length}</div> : null}
                </div>
                <div className="User" onClick={UserOnClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                    stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
          </div>

          {CartOpen && 
            <div className="ShoppingCart" style={{paddingBottom: isOredered ? '310px' : ''}}>
              {!isOredered && <ShoppingCartTopSection Close={closeCart} />}

              {!item?.length && !isOredered ? <EmptyCart /> : null}

              {item?.length ? 
                <div className="cart" style={{display: isOredered ? 'none' : ''}}>
                  {item
                    .map((obj: itemObjType, index: number) => (
                      <>
                        <CardInCart key={index} DeleteItem={() => DeleteItem(obj.id)}
                        title={obj.title} price={obj.price} imageUrl={obj.imageUrl} company={obj.company} />
                      </>
                    ))
                  }

                  <div className="check">
                    <div className="priceWrapper">
                      <p>{lang === 'Русский' ? 'Всего' :'Total'}:</p><span>${price}</span>
                    </div>

                    <div className="CheckOut" onClick={completeOrder} >{lang === 'Русский' ? 'Купить' :'Checkout'}</div>
                  </div>

                </div>
             : null }

              {isOredered ?
                    <div className="OrederWrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" fill="rgb(8, 255, 8)"/>
                          <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
                      </svg>
                      <h1>{lang === 'Русский' ? 'Заказ оформлен' : 'Order completed'}</h1>

                      <Link to={'/Library'} onClick={closeCart} className="backOreder">{lang === 'Русский' ? 'Перейти в библиотеку' : 'Go to the library'}</Link>
                    </div>
                  : null}

            </div>
          }

          {UserOpen ? 
            <div className="UserOpen" style={UserOpenStyle}>
              
                <div className="top-section" style={{display: SettingsOpen ? 'none' : !isLogin ? 'none' : 'block'}}>
                    <UserTopSection onClose={() => {setUserOpen(false)}} />
                </div>

                <div className="sectionsWrapper" style={{display: SettingsOpen ? 'none' : !isLogin ? 'none' : 'block'}}> 
                    <div className="wishlist" onClick={() => setWishListOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0  2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                    <p>{lang === 'Русский' ? 'Понравившияся' : 'Wishlist'}</p>
                  </div>
                  <div className="settings" onClick={() => setSettingsOpen(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-settings ">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73
                      2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2
                        2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 
                        0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 
                        1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <p>{lang === 'Русский' ? 'Настройки' : 'Settings'}</p>
                  </div>
                  <div className="SignOut" onClick={SingOut}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-out "><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                    <p>{lang === 'Русский' ? 'Выйти' : 'Sign out'}</p>
                  </div>
                  </div>

                  {!isLogin && 
                    <div className="LoginWrapper">
                      <h1>{isReg ? 'Registration' : "Login"}</h1>
                      {isReg && <input type="text" placeholder="NickName" value={loginNickname} onChange={(e) => setLoginNickname(e.target.value)} />}
                      <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setloginEmail(e.target.value)} />
                      <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                      <a href="#" style={{marginLeft: isReg ? '200px' : '150px' }} onClick={() => setIsReg(!isReg)} className="setRegiser">{isReg ? 'Login' : 'Registration'}</a>

                      <div className="Login" onClick={isReg ? isUserAlreadyExisted : Login}>{isReg ? 'Registration' : 'Login'}</div>
                    </div>
                  }

                  {SettingsOpen ? 
                    <div className="SettingsOpen" style={{display: SectionsOpen !== '' ? 'none' : 'block'}}>
                      <h3 className="title">{lang === 'Русский' ? 'Настройки' : 'Settings'}</h3>
                      <svg className="Close" onClick={() => {setUserOpen(true); setSettingsOpen(false)}} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      <div className="sectionAccount">
                        <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                        stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <p>{lang == 'Русский' ? 'Аккаунт' : 'Account'}</p>
                        {SettingsSections
                          .map((obj, index) => (
                            <>
                                {obj.title !== 'Language' && <div onClick={() => settingsOnclick(obj.title)} key={index} className={obj.className}>
                                  <span>{obj.title}</span>
                                  {obj.svg} 
                                </div>
                                }

                                {obj.title == 'Language' && 
                                  <div className="More" key={index}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="MoreSvg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z"/><path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/></svg>
                                    <p>{lang == 'Русский' ? 'Больше' : 'More'}</p>

                                    <div onClick={() => settingsOnclick(obj.title)} className={obj.className}>
                                      <span>{obj.title}</span>
                                      {obj.svg}
                                    </div> 
                                  </div>}
                            </>
                          ))
                        }
                      </div>
                    </div>
                  : null}

                  {SectionsOpen !== '' ? 
                      <SectionsOpenpage title={SectionsOpen} onClose={() => setSectionsOpen('')} />
                  : null}
            </div>
          : null}

          {WishListOpen ? 
                  <div className="wishlistOpen" style={{paddingBottom: WishlistItems?.length ? '5px' : '40px'}}>
                   <h3>{lang === 'Русский' ? 'Понравившиеся' : 'Wishlist'}</h3>
                   <svg className="Close" onClick={() => {setUserOpen(false); setWishListOpen(false)}} xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                        viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M18 6 6 18">
                        </path><path d="m6 6 12 12"></path>
                  </svg>

                    {WishlistItems?.length ? 
                      WishlistItems.map((obj: itemObjType, index: number) => (
                        <CardInWishList key={index} title={obj.title} price={obj.price} imageUrl={obj.imageUrl} company={obj.company} />
                      ))
                    : null}

                  {!WishlistItems?.length ? <EmptyWishList /> : null}
                </div>
      : null}
        </>
    );
}

export const ItemsState = (state: any) => state.items.value;
export const WishlishState = (state: any) => state.items.wishlist;
export const LangState = (state: any) => state.setting.value;
export const EmailState = (state: any) => state.setting.email;
export const OrderItemsState = (state: any) => state.items.orderItems

export default Header;