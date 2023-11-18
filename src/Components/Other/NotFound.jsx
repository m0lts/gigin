import { Link } from "react-router-dom";
import Header from "./Header";

export default function NotFound() {
    return (
        <>
            <Header />
            <main>
                <h1>
                    Page not found. Return home
                    <Link to={'/'}>
                        here
                    </Link>
                </h1>
            </main>
        </>
    )
}