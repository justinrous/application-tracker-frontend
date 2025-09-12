import { Outlet } from 'react-router';
import Nav from '../Nav/nav.tsx';
import type { JSX } from "react";
import { useState } from 'react';

const AppContainerClass = "bg-gradient-to-bl from-purpleDark3 to-purpleLight3 min-h-screen";
// bg-gradient-to-bl from-brandPurple-dark4 to-brandPurple-light4

function Root(): JSX.Element {
    const [loginStatus, setLoginStatus] = useState<boolean>(false);

    return (
        <div className={AppContainerClass}>
            <Nav loginStatus={loginStatus} />
            <Outlet context={[loginStatus, setLoginStatus]} />
        </div>
    );
}

export default Root;