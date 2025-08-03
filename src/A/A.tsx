// import { react } from 'react';
import type { JSX } from "react";


type props = {
    URL: string,
    name: string,
}

const anchorClass = 'text-black-600 hover:text-pink-600 no-underline';

export default function A({ URL, name }: props): JSX.Element {
    return (
        <li><a href={URL} className={anchorClass}>{name}</a></li>
    )
}

