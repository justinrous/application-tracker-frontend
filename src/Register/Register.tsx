import { useState } from "react";
import { useNavigate } from "react-router";

/******************************************************************************************
 ********************   Tailwaind CSS Classes   *******************************************
 ******************************************************************************************/
const sectionClass: string = "flex flex-col items-center justify-top min-h-screen min-w-2xl";
const formClass: string = "flex flex-col items-center items-center";
const divClass: string = "flex flex-row bg-purpleLight4 p-2 rounded shadow-md w-80 min-w-100 mb-4";
const btnClass: string = "bg-purpleLight4 text-purpleDark4 px-4 py-2 rounded hover:bg-blue-600";


/****************************************************************************
 *  Type Definitions
 **************************************************************************/
type requestOptionsType = {
    method: string,
    headers: { 'Content-Type': string },
    body: string
}


/************** Component **********************************/

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // const charLength = password.length >= 8;

    function handleFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    async function submitForm(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        console.log("Username:", username, "Password:", password);

        // Add registration logic here (e.g., API call)
        const fetchURL: string = 'http://localhost:3005/api/users/register';
        const requestOptions: requestOptionsType = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };
        fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

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
                    <label htmlFor="password">Create Password: </label>
                    <input type="password" id="password" name="password" value={password} onChange={handleFormChange} />
                </div>
                <button className={btnClass}>Submit</button>
            </form>
        </section>
    )



}