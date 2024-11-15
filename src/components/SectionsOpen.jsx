import { useDispatch, useSelector } from 'react-redux'
import Languages from '../Configs/Languages.json'
import {valueSetSettings} from '../redux/slices/settingSlice'
import { useEffect } from 'react';

export default function SectionsOpen({title, onClose}){
    const value = useSelector((state) => state.setting.value);

    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem('lang', value);
    }, [value])
    
    return (
        <>
            <div className="topSection">
                <h1 className="SectionsOpenTitle">{title}</h1>
                <svg onClick={onClose} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div className="setctionsMain">
                {title == 'Edit Profile' && 
                    <div>
                        <input className="nickname" type="text" placeholder="NickName" />
                        <input className="email" type="email" placeholder="Email" />
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
                    {localStorage.getItem('lang') == 'English' ? 'You can always get feedback or contact tech support by this email address: testHelp@email.com'
                    : 'Вы всегда можете получить обратную связь или связаться с технической поддержкой по этому адресу электронной почты: testHelp@email.com'}</p>    
            </div>}

            {title !== 'Privacy' && <div 
            style={{marginTop: title == 'Language' ? '130px' : '70px', display: title === 'Language' ? 'none' : 'block'}} className="Submit">Submit</div>}
        </>
    )
}