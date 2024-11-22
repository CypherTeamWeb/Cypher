import { useState } from "react";
import {Link} from 'react-router-dom'

export default function WorkTogether(){
    const [isEng, setIsEng] = useState(true);
    return (
        <>
            <div className="workWrapper">
                <div className="eng" onClick={() => setIsEng(!isEng)}>
                    <p style={{color: isEng ? '#fff' : '#ddd', fontWeight: isEng && '700'}} className="Englang">Eng</p>
                     / 
                     <p style={{color: !isEng ? '#fff' : '#ddd', fontWeight: !isEng && '700'}} className="Ru">Ru</p>
                </div>

                <Link to={'/'} className="back">{isEng ? 'Back' : 'Назад'}</Link>

                <h1 className="title">Cypher Team</h1>
                <h3 className="description">{isEng ?
                 'If you are from Russia and you have skills working with frontend, backend or unity, then contact us (all contacts are listed below).' 
                 : 'Eсли вы из России и у вас есть навыки работы с frontend, backend или unity, то свяжитесь с нами (все контакты указаны ниже).'}</h3>

                <Link style={{width: isEng ? '400px' : '460px'}} to={'/'} className="ConnectWithBot">
                {isEng ? "You can also contact us using the telegram bot" : 'Также вы можете связаться с нами с помощью telegram-бота'}</Link>
                <div className="WorktopSection">
                    <div className="board one" style={{background: 'rgba(20, 64, 134, 0.715)', transform: 'rotate(10deg)'}}></div>
                    <div className="board two" style={{background: 'rgba(20, 71, 153, 0.723)', transform: 'rotate(-10deg)'}}></div>
                    <div className="board three" style={{background: 'rgb(59 130 246)'}}>
                            <div className="section">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16"><path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/></svg>
                                <p>{isEng ? "Clean Code" : "Чистый Код"}</p>
                            </div>
                            <div className="section">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16"><path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/><path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/></svg>
                                <p>{isEng ? "Free schedule" : 'Свободный график'}</p>
                            </div>
                            <div className="section last">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>
                                <p>{isEng ? "Friendly team" : 'Дружная команда'}</p>
                            </div>
                    </div>
                </div>

                <div className="down">
                    <h1 className="Contacts">{isEng ? 'Our contacts' : 'Наши контакты' }</h1>
                    
                    <div className="wrapper">
                        <div className="contact firstSection">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>
                            <p className="work">Fontent</p>
                            <span>+7 977 411 ... ...</span>
                            <h4>Глеб</h4>
                        </div>

                        <div className="contact lastSection">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>
                            <p className="work">Unity</p>
                            <h4>Никита</h4>
                            <span>+7 977 463 ... ...</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}