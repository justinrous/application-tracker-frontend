
import type { JSX } from "react";
import { useEffect, useState } from 'react';
import A from '../A/A.tsx';

let navClass: string = "flex justify-between bg-teal-500 min-h-25 items-center";
let imgClass: string = "rounded-full p5 rotate-30 transition-transform ease-in-out duration-2000";
let imgClass2: string = "rounded-full p5 -rotate-30 transition-transform ease-in-out duration-2000";

function Nav(): JSX.Element {

    // Potentially setup state or props here in the future
    // const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [imgClassState, setImgClass] = useState<string>(imgClass);

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
        <nav className={navClass} >
            <img src="src\assets\resume_image_1.jpg" alt="appImage" width={150} height={150} className={imgClassState} />
            <ul className="flex justify-evenly min-w-50">
                <A URL="/" name="Home" />
                <A URL="/about" name="About" />
                <A URL="/contact" name="Contact" />
            </ul>
        </nav>
    );
}

export default Nav;