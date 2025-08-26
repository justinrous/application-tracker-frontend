import { Outlet } from 'react-router';
import Nav from '../Nav/nav.tsx';
import type { JSX } from "react";

const AppContainerClass = "bg-linear-to-bl from-violet-600 to-violet-800 min-h-screen";

function Root(): JSX.Element {
    return (
        <div className={AppContainerClass}>
            <Nav />
            <Outlet />
        </div>
    );
}

export default Root;