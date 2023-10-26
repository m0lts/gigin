import { useState } from "react";

export default function UserData() {
    const [userData, setUserData] = useState({
        forename: sessionStorage.getItem('Forename'),
        surname: sessionStorage.getItem('Surname'),
        type: sessionStorage.getItem('Type'),
        alias: sessionStorage.getItem('Alias'),
        email: sessionStorage.getItem('Email'),
    })

    return { userData };
    
}