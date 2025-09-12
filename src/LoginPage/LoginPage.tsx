import { useState } from "react";
import { Link } from "react-router";
import { useNavigate, useOutletContext } from "react-router";

/******************************************************************************************
 ********************   Tailwaind CSS Classes   *******************************************
 ******************************************************************************************/
const sectionClass: string = "flex flex-col items-center justify-start min-h-screen";
const formClass: string = "flex flex-col items-center justify-start";
const divClass: string = "bg-white m-2 p-6 rounded shadow-md w-80";
const btnClass: string = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600";



/****************************************************************************
 *  Type Definitions
 **************************************************************************/
type requestOptionsType = {
    method: string,
    headers: { 'Content-Type': string },
    body: string
}


function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useOutletContext<[loginStatus: boolean, setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>]>();

    function handleFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        console.log("Username:", username, "Password:", password);

        // Send login data to the server

        const fetchURL: string = 'http://localhost:3005/api/users/login';
        const requestOptions: requestOptionsType = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        fetch(fetchURL, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    console.log('Login successful');
                    setLoginStatus(true);
                    navigate('/');
                    // Redirect to dashboard or another page

                } else if (response.status === 401) {
                    console.log('Invalid credentials');
                    // Show error message to user
                } else {
                    console.log('An error occurred');
                }
            })
            .catch((error) => {
                console.error('Network error:', error);
            });
    }

    return (
        <section className={sectionClass}>
            <form onSubmit={handleSubmit} className={formClass}>
                <div className={divClass}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" value={username} placeholder="username" onChange={handleFormChange} required />
                </div>
                <div className={divClass}>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" value={password} placeholder="password" onChange={handleFormChange} required />
                </div>
                <button type="submit" className={btnClass}>Login</button>
            </form>
            <p>Dont have an account? <Link to="/register" className="text-white">Register Here</Link></p>
        </section>
    )
}

export default LoginPage;