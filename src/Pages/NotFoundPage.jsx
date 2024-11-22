import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <>
            <div className="NotFoundwrappper">
                <h1>Error 404</h1>
                <p>Sorry but this page do not exist.</p>
                <Link to={'/'}>Back</Link>
            </div>
        </>
    )
}