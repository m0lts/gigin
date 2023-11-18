import Header from "../Other/Header"
import { Outlet } from "react-router-dom"
import './accounts.css'

export default function AccountsPage() {
    return (
        <>
            <Header />
            <main className="accounts_body">
                <section className="accounts_left_side">
   
                </section>
                <section className="accounts_right_side">
                    <h1 className="accounts_title">Join our users finding and hosting thousands of gigs.</h1>
                    <Outlet />
                </section>
            </main>
        </>
    )
}