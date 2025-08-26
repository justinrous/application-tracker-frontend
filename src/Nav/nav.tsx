
import type { JSX } from "react";
import { useEffect, useState } from 'react';
import { NavLink } from "react-router";

const navClass: string = "flex justify-between min-h-25 items-center";
const imgClass: string = "rounded-full p5 rotate-30 transition-transform ease-in-out duration-2000";
const imgClass2: string = "rounded-full p5 -rotate-30 transition-transform ease-in-out duration-2000";
const navLinkClass: string = "text-white-500 hover:text-blue-700";

function Nav(): JSX.Element {

    // Potentially setup state or props here in the future
    // const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [imgClassState, setImgClass] = useState<string>(imgClass);

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
            <img src="src\assets\resume_image_1.jpg" alt="appImage" width={150} height={150} className={imgClassState} />
            <ul className="flex justify-evenly min-w-50">
                <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;