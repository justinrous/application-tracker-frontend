
import type { JSX } from "react";
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router";

const navClass: string = "flex justify-between min-h-25 items-center";
const imgClass: string = "cursor-pointer rounded-full p5 rotate-30 transition-transform ease-in-out duration-2000";
const imgClass2: string = "cursor-pointer rounded-full p5 -rotate-30 transition-transform ease-in-out duration-2000";
const navLinkClass: string = "text-2xl text-white hover:text-blue-700";


/****************************************************************************
 * Prop Types
 * *************************************************************************/
type NavProps = {
    loginStatus?: boolean
}

function Nav({ loginStatus }: NavProps): JSX.Element {

    // Potentially setup state or props here in the future
    const [imgClassState, setImgClass] = useState<string>(imgClass);
    const navigate = useNavigate();

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
    }, [])

    return (
        <nav className={navClass} onLoad={handleNavLoad} >
            <img src="src\assets\resume_image_1.jpg" alt="appImage" width={150} height={150} className={imgClassState} onClick={navigateHome} />
            <ul className="flex justify-evenly min-w-50">
                {loginStatus ?
                    <li><NavLink to="/" className={navLinkClass}>Dashboard</NavLink></li> :
                    <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>
                }
            </ul>
        </nav>
    );
}

export default Nav;