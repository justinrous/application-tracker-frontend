import { Outlet } from 'react-router';
import Nav from '../Nav/nav.tsx';
import type { JSX } from "react";

const AppContainerClass = "bg-gradient-to-bl from-purpleDark3 to-purpleLight3 min-h-screen";
// bg-gradient-to-bl from-brandPurple-dark4 to-brandPurple-light4

function Root(): JSX.Element {
    return (
        <div className={AppContainerClass}>
            <Nav />
            <Outlet />
        </div>
    );
}

export default Root;