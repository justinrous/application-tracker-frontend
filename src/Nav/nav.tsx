
import type { JSX } from "react";
import { useState } from 'react';
import A from '../A/A.tsx';

const navClass = "flex justify-end bg-teal-500 min-h-25 items-center";

function Nav(): JSX.Element {

    // Potentially setup state or props here in the future
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <nav className={navClass} >
            <ul className="flex justify-evenly min-w-50">
                <A URL="/" name="Home" />
                <A URL="/about" name="About" />
                <A URL="/contact" name="Contact" />
            </ul>
        </nav>
    );
}

export default Nav;