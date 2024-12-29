import { useDispatch, useSelector } from 'react-redux'
import Languages from '../Configs/Languages.json'
import {valueSetSettings, nameSetSettings, emailSetSettings} from '../redux/slices/settingSlice'
import { useState } from 'react';
import { Alert } from 'antd';
import axios from 'axios';

export default function SectionsOpen({title, onClose}){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const value = useSelector((state) => state.setting.value);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [password, setPassword] = useState('');
    const [Repeatpassword, setRepeatPassword] = useState('');

    const emailUser = useSelector((state) => state.setting.email);
    const dispatch = useDispatch();

    const isUserAlreadyExisted = () => {
        axios.get('https://6752a82ef3754fcea7b91e39.mockapi.io/users').then(async (res) => {
            let count = 0;
            await res.data.forEach((obj) => {
                if(obj.email == email){
                    count++;
                }
            })

            if(count == 0){
                setNameSettings()
            } else{
                alert('This user already exist.');
                setEmail('')
                setName('');
            }
        })
    }

    const SetNameAndEmailFunc = () => {
        axios.get('https://6752a82ef3754fcea7b91e39.mockapi.io/users').then((res) => {
            res.data.map(async (obj) => {
                if(emailUser == obj.email){
                    if(email && name && email.includes('@') && email.includes('.com') && email.includes('gmail') && email !== emailUser && name.length < 10){
                        await axios.put(`https://6752a82ef3754fcea7b91e39.mockapi.io/users/${obj.id}`, {"name": name, 'email': email})

                        dispatch(nameSetSettings(name));
                        dispatch(emailSetSettings(email));
                        setEmail('');
                        setName('');
                        setPassword('');
                        setRepeatPassword('');

                        setSuccess(true);
                        setTimeout(() => {
                            setSuccess(false)
                        }, 3000)
                    } else{
                        setError(true);
                        setTimeout(() => {
                            setError(false);
                        }, 3000)
                    }
                } 
            })
        })
    }

    const SetEmailFunc = () => {
        axios.get('https://6752a82ef3754fcea7b91e39.mockapi.io/users').then((res) => {
            res.data.map(async (obj) => {
                if(emailUser == obj.email && obj.email !== email){
                    if(email && !name &&  email.includes('@') && email.includes('.com') && email.includes('gmail') && email !== emailUser){
                        await axios.put(`https://6752a82ef3754fcea7b91e39.mockapi.io/users/${obj.id}`, {'email': email});

                        dispatch(emailSetSettings(email));
                        setEmail('');
                        setName('');
                        setPassword('');
                        setRepeatPassword('');

                        setSuccess(true);
                        setTimeout(() => {
                            setSuccess(false)
                        }, 3000)
                    } else{
                        setError(true);
                        setTimeout(() => {
                            setError(false);
                        }, 3000)
                    }
                }
            })
        })
    }

    const SetNameFunc = () => {
        axios.get('https://6752a82ef3754fcea7b91e39.mockapi.io/users').then((res) => {
            res.data.map(async (obj) => {
                if(emailUser == obj.email){
                    if(!email && name && name.length < 10){
                        await axios.put(`https://6752a82ef3754fcea7b91e39.mockapi.io/users/${obj.id}`, {"name": name})

                        dispatch(nameSetSettings(name));
                        setEmail('');
                        setName('');
                        setPassword('');
                        setRepeatPassword('');

                        setSuccess(true);
                        setTimeout(() => {
                            setSuccess(false)
                        }, 3000)
                    }
                } else{
                    setError(true);
                    setTimeout(() => {
                        setError(false);
                    }, 3000)
                }
            })
        })
    }

    const SetPasswordFunc = () => {
        axios.get('https://6752a82ef3754fcea7b91e39.mockapi.io/users').then((res) => {
            res.data.map(async (obj) => {
                if(emailUser == obj.email){
                    if(password && Repeatpassword && password === Repeatpassword && password !== obj.password){
                        await axios.put(`https://6752a82ef3754fcea7b91e39.mockapi.io/users/${obj.id}`, {"password": password});

                        setEmail('');
                        setName('');
                        setPassword('');
                        setRepeatPassword('');

                        setSuccess(true);
                        setTimeout(() => {
                            setSuccess(false)
                        }, 3000)
                    } else{
                        setError(true);
                        setTimeout(() => {
                            setError(false);
                        }, 3000)
                    }
                }
            })
        })
    }

    const setNameSettings = () => {
        axios.get('https://6752a82ef3754fcea7b91e39.mockapi.io/users').then((res) => {
            res.data.map((obj) => {
                if(emailUser == obj.email){
                    if(email && name && email.includes('@') && email.includes('.com') && email.includes('gmail') && email !== emailUser && name.length < 10){
                        SetNameAndEmailFunc();
                    } else if(email && !name && email.includes('@') && email.includes('.com') && email.includes('gmail') && email !== emailUser){
                        SetEmailFunc();
                    }  else if(!email && name && name.length < 10){
                         SetNameFunc();
                    } else if(password && Repeatpassword && password === Repeatpassword && password !== obj.password){
                        SetPasswordFunc();
                    }
                }
            })
        })
    }
    
    return (
        <>
            {success && <Alert style={{background: 'green'}} className='alert' showIcon={true} closable={true} type={'success'}  message={'Profile parameters have been successfully changed'}/>}
            {error && <Alert style={{background: 'rgb(218, 8, 8)'}} className='alert' showIcon={true} closable={true} type={'error'} message={!email.includes('@') ? 'Not correct email.' : !email.includes('.com')? 'Not correct email.' : !email.length > 6 ? 'Not correct email.' :name.length < 4 ? 'NickName length must be more or equal 6' : !email.includes('gmail') && 'Not correct email.'} />}
            <div className="topSection">
                <h1 className="SectionsOpenTitle">{title}</h1>
                <svg onClick={onClose} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div className="setctionsMain">
                {title == 'Edit Profile' && 
                    <div>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="nickname" type="text" placeholder="NickName" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="email" type="email" placeholder="Email" />
                    </div>
                }
                {title == 'Change Password' && 
                    <div>
                        <input className="nickname" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        <input className="repeatPassword" value={Repeatpassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" placeholder="Repeat Password" />
                    </div>
                }
            </div>

           {title == 'Language' && <select onChange={(e) => dispatch(valueSetSettings(e.target.value))} id="languages">
                {Languages.map((title) => (
                    <option>{title}</option>
                ))}
            </select>}

            {title == 'Privacy' && <div>
                <p className='rights'>Made by Cypher Team. All rights reserved ©. 
                    {value == 'English' ? 'You can always get feedback or contact tech support by this email address: testHelp@email.com'
                    : 'Вы всегда можете получить обратную связь или связаться с технической поддержкой по этому адресу электронной почты: testHelp@email.com'}</p>    
            </div>}

            {title !== 'Privacy' && <div 
            style={{marginTop: title == 'Language' ? '130px' : '70px', display: title === 'Language' ? 'none' : 'block'}} 
            className="Submit" onClick={() => isUserAlreadyExisted()}>Submit</div>}
        </>
    )
}