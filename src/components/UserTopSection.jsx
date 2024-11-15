export default function UserTopSection(){
    return (
        <>
            <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-user text-gray-300">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
            <div className="name">Guest User</div><p className="gmail">guest@example.com</p>
        </>
    )
}