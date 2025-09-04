import { useState } from "react";
import { useNavigate } from "react-router";

/******************************************************************************************
 ********************   Tailwaind CSS Classes   *******************************************
 ******************************************************************************************/
let sectionClass: string = "flex flex-col items-center justify-top min-h-screen min-w-2xl";
let formClass: string = "flex flex-col items-center items-center";
let divClass: string = "flex flex-row bg-purpleLight4 p-2 rounded shadow-md w-80 min-w-100 mb-4";
let btnClass: string = "bg-purpleLight4 text-purpleDark4 px-4 py-2 rounded hover:bg-blue-600";


/************** Component **********************************/

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const charLength = password.length >= 8;

    function handleFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    function submitForm(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        console.log("Username:", username, "Password:", password);

        // Add registration logic here (e.g., API call)

        // Clear form fields after submission

        // Redirect to login or another page if needed
        navigate('/login');

    }

    return (
        <section className={sectionClass}>
            <form className={formClass} onSubmit={submitForm}>
                <div className={divClass}>
                    <label htmlFor="username">Create Username: </label>
                    <input type="text" id="username" name="username" value={username} onChange={handleFormChange} />
                </div>
                <div className={divClass}>
                    <p>{charLength ? "Y" : "X"}</p>
                    <label htmlFor="password">Create Password: </label>
                    <input type="password" id="password" name="password" value={password} onChange={handleFormChange} />
                </div>
                <button className={btnClass}>Submit</button>
            </form>
        </section>
    )



}