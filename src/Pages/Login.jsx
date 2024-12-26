import { useState } from 'react'
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { nameSetSettings, emailSetSettings, isLoginset } from "../redux/slices/settingSlice";
import axios from 'axios';

export default function Login(){
    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('');
    const [isEng, setIsEng] = useState(true);
    const [isReg, setIsReg] = useState(false);
    const redirect = useNavigate()
    
    const dispatch = useDispatch();

    const Registration = async () => {
        if(emailValue.includes('@') && emailValue.includes('.') && emailValue.length > 6 && passwordValue.length > 6 && 
        nameValue.length < 20) {   
            let email = '';
            isReg && axios.get('https://6752a82ef3754fcea7b91e39.mockapi.io/users').then((res) => {
                res.data.map((obj) => {
                    if(obj.email === emailValue){
                        email = obj.email
                    }
             })
           })

            if(isReg && nameValue.length < 20 && nameValue.length > 4 && email !== emailValue){
                await axios.post('https://6752a82ef3754fcea7b91e39.mockapi.io/users', {name: nameValue, password: passwordValue, email: emailValue})
                dispatch(nameSetSettings(nameValue))  
                dispatch(emailSetSettings(emailValue));
                dispatch(isLoginset(true));
                redirect('/');
            } else{
                isReg && alert('Error this user already exist')
            }

            if(!isReg){
                axios.get('https://6752a82ef3754fcea7b91e39.mockapi.io/users').then((res) => {
                    res.data.map((obj) => {
                        if(obj.email === emailValue && obj.password === passwordValue){
                            dispatch(nameSetSettings(obj.name))  
                            dispatch(emailSetSettings(emailValue));
                            dispatch(isLoginset(true));
                            redirect('/');
                        }
                 })
               })
            }

            setEmailValue('')
            setNameValue('');
            setPasswordValue('');
        } else {
            alert('Incorrectly entered data.');
            setEmailValue('')
            setNameValue('');
            setPasswordValue('');
        }
    }

    const setRegFunc = () => {
        setIsReg(!isReg);
        setEmailValue('')
        setNameValue('');
        setPasswordValue('');
    }
    
    return (
        <>
           <div className="LoginPageWrapper">
                <div className="bacground-image">
                <div className="background"></div>
                    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000" alt="backgorund" />
                </div>
                <h1 className='LoginTitle'>{!isReg ? isEng ? 'Login' : 'Войти' : isEng ? 'Registration' : 'Регистрация'}</h1>
                <div className="eng" onClick={() => setIsEng(!isEng)}>
                    <p style={{color: isEng ? '#fff' : '#ddd', fontWeight: isEng && '700'}} className="Englang">Eng</p>
                     / 
                     <p style={{color: !isEng ? '#fff' : '#ddd', fontWeight: !isEng && '700'}} className="Ru">Ru</p>
                </div>
                
                <div className="inputWrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="emailSvg" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/></svg>
                    <input type="email" placeholder={isEng ? 'Email' : 'Электронная почта'} value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />

                    {isReg && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="nicnameSvg" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>}
                    {isReg && <input type="text" placeholder={isEng ? 'NickName' : 'Имя'} value={nameValue} onChange={(e) => setNameValue(e.target.value)} className='NicknameLogin' />}
                    
                    <svg xmlns="http://www.w3.org/2000/svg" style={{top: !isReg && '228px'}} width="16" height="16" fill="currentColor" class="passwordSvg" viewBox="0 0 16 16"><path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/><path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>
                    <input type="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} placeholder={isEng ? 'Password' : 'Пароль'} />
                </div>
                <p onClick={setRegFunc} className='SetRegistration'>{isReg ? isEng ? 'Login' : 'Войти' : isEng ? 'Registration' : 'Регистрация'}</p>

                <div className="logiBackWrapper">
                    <Link to={'/'} className='LoginBack' style={{top: !isReg && '350px'}}>{isEng ? "Back" : 'Назад'}</Link>
                </div>
                <div className="LoginSubmit" style={{top: !isReg && '350px'}} onClick={Registration} >{!isReg ? isEng ? 'Login' : 'Войти' : isEng ? 'Registration' : 'Регистрация'}</div>
           </div>
        </>
    )
}