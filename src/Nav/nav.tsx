
import type { JSX } from "react";
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useOutletContext } from "react-router";

/****************************************************************************
***********             Tailwind CSS classes            **********************
* ****************************************************************************/

const navClass: string = "flex justify-between min-h-25 items-center";
const imgClass: string = "cursor-pointer rounded-full p5 rotate-30 transition-transform ease-in-out duration-2000";
const imgClass2: string = "cursor-pointer rounded-full p5 -rotate-30 transition-transform ease-in-out duration-2000";
const navLinkClass: string = "text-2xl text-white hover:text-purpleLight2 hover:cursor-pointer transition-colors duration-100";
const logOutBtnClass: string = "text-2xl text-white absolute invisible hover:text-purpleLight2 transition-colors duration-100 cursor-pointer bg-transparent border-none group-hover:visible";
const containerUl: string = "flex justify-evenly min-w-50 group";


/****************************************************************************
 * Prop Types
 * *************************************************************************/

interface NavProps {
    loginStatus: boolean,
    setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>
}

function Nav({ loginStatus, setLoginStatus }: NavProps): JSX.Element {

    // Potentially setup state or props here in the future
    // const [loginStatus, setLoginStatus] = useOutletContext<[loginStatus: boolean, setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>]>();
    const [imgClassState, setImgClass] = useState<string>(imgClass);
    const navigate = useNavigate();

    const logOutUrl: string = "http://localhost:3005/api/users/logout";
    const httpOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' as RequestCredentials
    };

    function handleLogOut(): void {
        fetch(logOutUrl, httpOptions)
            .then(res => {
                if (res.ok) {
                    setLoginStatus(false);
                    navigate('/login');
                } else {
                    throw new Error('Logout failed');
                }
            })
            .catch(err => console.error('Error during logout:', err));
    }

    function navigateHome(): void {
        navigate('/');
    }

    function handleNavLoad(): void {
        setImgClass(imgClassState => imgClassState === imgClass ? imgClass2 : imgClass);
    }

    useEffect(() => {
        // Simulate a login check
        const interval: number = setInterval(() => {
            setImgClass(imgClassState => {
                return (imgClassState === imgClass ? imgClass2 : imgClass);
            });
        }, 2000);
        return () => clearTimeout(interval);
    }, []);

    return (
        <nav className={navClass} onLoad={handleNavLoad} >
            <img src="src\assets\resume_image_1.jpg" alt="appImage" width={150} height={150} className={imgClassState} onClick={navigateHome} />
            <ul className={containerUl}>
                {loginStatus ?
                    <ul>
                        <li><NavLink to="/" className={navLinkClass}>Dashboard</NavLink></li>
                        <li><button className={logOutBtnClass} onClick={handleLogOut}>Logout</button></li>
                    </ul>
                    :
                    <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>
                }
            </ul>
        </nav>
    );
}
export default Nav;
