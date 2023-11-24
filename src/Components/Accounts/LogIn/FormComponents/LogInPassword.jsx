import { useState } from "react"

export default function LogInPassword({ logInData, setLogInData }) {

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLogInData({
            ...logInData,
            [name]: value,
        });
    }

    return (
        <div className="accounts_form_input_cont">
            <label htmlFor="password" className="accounts_form_label">Password</label>
            <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            onChange={handleInputChange}
            className="accounts_form_input"
                />
        </div>
    )
}