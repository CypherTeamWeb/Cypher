import React from "react";
import { useSelector } from "react-redux"
import { EmailState } from "./Header";

type UserTopSectionType = {
    onClose: () => void;
}

const UserTopSection: React.FC<UserTopSectionType> = ({onClose}) => {
    const name = useSelector(NameState);
    const email = useSelector(EmailState);

    return (
        <>  
            <svg className="CloseUserTopSection" onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
            viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M18 6 6 18">
            </path><path d="m6 6 12 12"></path></svg>
            <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-gray-300">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
            <div className="name">{name}</div><p className="gmail">{email}</p>
        </>
    )
}

export const NameState = (state: any) => state.setting.name;
export default UserTopSection;