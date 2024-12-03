import { useCallback, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import CardInCart from "./CardInCart";
import EmptyWishList from './EmptyWishList'
import ShoppingCartTopSection from "./ShoppingCartTopSection";
import EmptyCart from './EmptyCart'
import UserTopSection from './UserTopSection'
import CardInWishList from "./CardInWishList";
import {SettingsSections} from '../Configs/Settings'
import SectionsOpenpage from "./SectionsOpen";
import debounce from 'lodash.debounce'
import Cookies from 'js-cookie'

// redux import
import {useDispatch, useSelector} from 'react-redux';
import {itemsSet, wishlistSet} from '../redux/slices/itemsSlice'
import { valueSet } from "../redux/slices/valueSlice";
import { nameSetSettings, emailSetSettings, isLoginset } from "../redux/slices/settingSlice";

export default function Header(){
    const [CartOpen, serCartOpen] = useState(false);
    const [price, setPrice] = useState(0);
    const [UserOpen, setUserOpen] = useState(false);
    const [WishListOpen, setWishListOpen] = useState(false);
    const [SettingsOpen, setSettingsOpen] = useState(false);
    const [SectionsOpen, setSectionsOpen] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [SearchValue, setSearchValue] = useState('');
    const [loginNickname, setLoginNickname] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginEmail, setloginEmail] = useState('');
    const [isReg, setIsReg] = useState(false);

    const isLogin = useSelector((state) => state.setting.isLogin)
    const item = useSelector((state) => state.items.value);
    const WishlistItems = useSelector((state) => state.items.wishlist);
    const lang = useSelector((state) => state.setting.value);

    const dispatch = useDispatch();

    const inputDebounce = useCallback(
      debounce((e) => {
        dispatch(valueSet(e));
      }, 300),
      []
    )

   useEffect(() => {
      axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson').then((res) => {
        dispatch(itemsSet(res.data))
      });

      axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/Wishlist').then((res) => {
        dispatch(wishlistSet(res.data))
      })
   }, [])

   useEffect(() => {
      setPrice(0);

      item.forEach((obj) => {
        setPrice((prev) => (prev + obj.price));
      })
   }, [item])

   const UserOnClick = () => {
    setUserOpen(!UserOpen);
    serCartOpen(false);
    setWishListOpen(false); 
    setSettingsOpen(false);
    setSectionsOpen('');
   }

   const DeleteItem = async (id) => {
      await axios.delete(`https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson/${id}`);

      await axios.get('https://67191cfb7fc4c5ff8f4c7d72.mockapi.io/CypherCartJson').then((res) => {
        dispatch(itemsSet(res.data))
    })
  }

    const settingsOnclick = (title) => {
        setSectionsOpen(title);
    }

    const inputOnChange = (e) => {
        setSearchValue(e.target.value);
        inputDebounce(e.target.value)
    }

    const getCokie = (type, name) => {
      const cookies = document.cookie
          .split(" ")
          .find((row) => row.startsWith(`${type}=${name}`));

      return cookies ? cookies.split("=")[1] : null
  }

    const Login = () => {
      if(loginEmail.includes('@') && loginEmail.includes('.com') && loginEmail.length > 6 && loginPassword.length > 6 && loginEmail.includes('gmail') && 
      loginNickname.length < 20) {   
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 30);

          const email = getCokie('email', loginEmail);
          const password = getCokie('password', loginPassword);

          if(isReg && loginNickname.length < 20 && loginNickname.length > 4 && email !== loginEmail && password !== loginPassword){
              document.cookie = `email=${loginEmail} password=${loginPassword} ; expires=${expirationDate.toUTCString()}; path=/`  
              dispatch(nameSetSettings(loginNickname))  
              dispatch(emailSetSettings(loginEmail));
              dispatch(isLoginset(true));
              redirect('/');
          } else{
             isReg && alert('this user alreay exist.')
          }

          if(!isReg){
              const email = getCokie('email', loginEmail);
              const password = getCokie('password', loginPassword);
              
              if (email === loginEmail && password === loginPassword){
                      dispatch(nameSetSettings(loginNickname))  
                      dispatch(emailSetSettings(loginEmail));
                      dispatch(isLoginset(true));
                      redirect('/');
                 }
              }

          setLoginNickname('')
          setLoginPassword('');
          setloginEmail('');
      } else {
          alert('Incorrectly entered data.');
          setLoginNickname('')
          setLoginPassword('');
          setloginEmail('');
      }
    }

    const MenuOpen = () => {
      setMenuOpen(!menuOpen);
      menuOpen && setUserOpen(false);
      menuOpen && serCartOpen(false);
    }

    const SingOut = () => {
      dispatch(isLoginset(false));
    }

    return (
        <>
            <div className="header">
              <Link className="toHome" to={'/'}>CypherTeam</Link>
              <div className="navigation" style={{display: menuOpen && 'flex', flexDirection: menuOpen ? 'column' : 'row', marginTop: menuOpen && '70px'}}>
                <Link to="#" style={{transform: menuOpen ? 'translate(100px,50px)' : ''}}
                >{lang === 'Русский' ? 'Магазин' : 'Store'}</Link>
                <Link to="#" style={{transform: menuOpen ? 'translate(100px,20px)' : ''}}>
                  {lang === 'Русский' ? 'Библиотека' :'Library'}</Link>
                <Link to="/WorkTogether" className="WorkA" style={{transform: menuOpen ? 'translate(100px,-10px)' : ''}}>
                  {lang === 'Русский' ? 'Хотите присоединиться к нашей команде?' : 'Wanna work together?'}</Link>
              </div>

              <div className="menu-wrapper" onClick={MenuOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="menu" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
              </div>
              <div className="input-wrapper"> 
                <input type="text" className="input" value={SearchValue} onChange={inputOnChange} placeholder={lang === 'Русский' ? 'Поиск игр...' :"Search games..."}  />
                {<svg className="input-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8C939F"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="11" cy="11" r="8" ></circle><path d="m21 21-4.3-4.3"></path>
                </svg>}
              </div>

                <div className="Cart" style={{display: menuOpen && 'block', marginTop: menuOpen && '30px', transform: menuOpen ? 'translate(-50px)' : ''}} onClick={() => {serCartOpen(!CartOpen); setUserOpen(false); setWishListOpen(false)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1">
                    </circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                    {item.length ? <div className="count">{item.length}</div> : null}
                </div>
                <div className="User" style={{display: menuOpen && 'block',marginTop: menuOpen && '-70px',transform: menuOpen ? 'translate(-75px)' : ''}} onClick={UserOnClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                    stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
          </div>

          {CartOpen && 
            <div className="ShoppingCart">
              {<ShoppingCartTopSection Close={() => serCartOpen(false)} />}

              {!item.length ? <EmptyCart /> : null}

              {item.length ? 
                <div className="cart">
                  {item
                    .map((obj, index) => (
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

                    <div className="CheckOut">{lang === 'Русский' ? 'Купить' :'Checkout'}</div>
                  </div>
                  
                </div>
             : null }
            </div>
          }

          {UserOpen ? 
            <div className="UserOpen" style={{display: WishListOpen ? 'none' : 'block', marginTop: menuOpen && '100px',  overflowY: SettingsOpen ? 'auto' : 'none', color: 'red'}}>
              
                <div className="top-section" style={{display: SettingsOpen ? 'none' : 'block' && !isLogin ? 'none' : 'block'}}>
                    <UserTopSection />
                </div>

                <div className="sectionsWrapper" style={{display: SettingsOpen ? 'none' : 'block' && !isLogin ? 'none' : 'block'}}> 
                    <div className="wishlist" onClick={() => setWishListOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0  2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                    <p>{lang === 'Русский' ? 'Понравившияся' : 'Wishlist'}</p>
                  </div>
                  <div className="settings" onClick={() => setSettingsOpen(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings ">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73
                      2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2
                        2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 
                        0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 
                        1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <p>{lang === 'Русский' ? 'Настройки' : 'Settings'}</p>
                  </div>
                  <div className="SignOut" onClick={SingOut}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out "><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                    <p>{lang === 'Русский' ? 'Выйти' : 'Sign out'}</p>
                  </div>
                  </div>

                  {!isLogin && 
                    <div className="LoginWrapper">
                      <h1>{isReg ? 'Registration' : "Login"}</h1>
                      { <input type="text" placeholder="NickName" value={loginNickname} onChange={(e) => setLoginNickname(e.target.value)} />}
                      <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setloginEmail(e.target.value)} />
                      <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                      <a href="#" style={{marginLeft: isReg ? '200px' : '150px' }} onClick={() => setIsReg(!isReg)} className="setRegiser">{isReg ? 'Login' : 'Registration'}</a>

                      <div className="Login" onClick={Login}>{isReg ? 'Registration' : 'Login'}</div>
                    </div>
                  }

                  {SettingsOpen ? 
                    <div className="SettingsOpen" style={{display: SectionsOpen != '' ? 'none' : 'block'}}>
                      <h3 className="title">{lang === 'Русский' ? 'Настройки' : 'Settings'}</h3>
                        <svg className="Close" onClick={() => {setUserOpen(false); setSettingsOpen(false)}} xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                          viewBox="0 0 24 24" fill="none" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M18 6 6 18">
                          </path><path d="m6 6 12 12"></path></svg>
                      <div className="sectionAccount">
                        <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                        stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <p>{lang == 'Русский' ? 'Аккаунт' : 'Account'}</p>
                        {SettingsSections
                          .map((obj, index) => (
                            <>
                                {obj.title !== 'Language' && <div onClick={() => settingsOnclick(obj.title)} key={index} className={obj.className}>
                                  <span key={index}>{obj.title}</span>
                                  {obj.svg} 
                                </div>
                                }

                                {obj.title == 'Language' && 
                                  <div className="More" key={index}>
                                    <svg key={index} xmlns="http://www.w3.org/2000/svg" className="MoreSvg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z"/><path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/></svg>
                                    <p key={index}>{lang == 'Русский' ? 'Больше' : 'More'}</p>

                                    <div onClick={() => settingsOnclick(obj.title)} key={index} className={obj.className}>
                                      <span key={index}>{obj.title}</span>
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
                  <div className="wishlistOpen" style={{paddingBottom: WishlistItems.length ? '5px' : '40px'}}>
                   <h3>{lang === 'Русский' ? 'Понравившиеся' : 'Wishlist'}</h3>
                   <svg className="Close" onClick={() => {setUserOpen(false); setWishListOpen(false)}} xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                        viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M18 6 6 18">
                        </path><path d="m6 6 12 12"></path>
                  </svg>

                    {WishlistItems.length ? 
                      WishlistItems.map((obj, index) => (
                        <CardInWishList key={index} title={obj.title} price={obj.price} imageUrl={obj.imageUrl} company={obj.company} />
                      ))
                    : null}

                  {!WishlistItems.length ? <EmptyWishList /> : null}
                </div>
      : null}
        </>
    );
}