import { useDispatch, useSelector } from 'react-redux'
import Languages from '../Configs/Languages.json'
import {valueSetSettings, nameSetSettings, emailSetSettings} from '../redux/slices/settingSlice'
import { useState } from 'react';
import { Alert } from 'antd';

export default function SectionsOpen({title, onClose}){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const value = useSelector((state) => state.setting.value);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

    const setNameSettings = () => {
        if(email.includes('@') && email.includes('.com') && email.length > 6 && name.length > 4 && email.includes('gmail')){
            dispatch(nameSetSettings(name));
            dispatch(emailSetSettings(email));
            setEmail('');
            setName('');

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
                        <input className="nickname" type="password" placeholder="Password" />
                        <input className="repeatPassword" type="password" placeholder="Repeat Password" />
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
            className="Submit" onClick={() => title == 'Edit Profile' ? setNameSettings() : null}>Submit</div>}
        </>
    )
}