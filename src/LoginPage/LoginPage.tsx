import { useState } from "react";

/******************************************************************************************
 ********************   Tailwaind CSS Classes   *******************************************
 ******************************************************************************************/

const formClass: string = "flex flex-col items-center justify-center min-h-screen bg-gray-100";
const divClass: string = "bg-white p-6 rounded shadow-md w-80";
const btnClass: string = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600";

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className={formClass}>
                <div className="divClass">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" value={username} placeholder="username" onChange={handleFormChange} required />
                </div>
                <div className={divClass}>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" value={password} placeholder="password" onChange={handleFormChange} required />
                </div>
                <button type="submit" className={btnClass}>Login</button>
            </form>
        </section>
    )
}

export default LoginPage;