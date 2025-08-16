
import type { JSX } from "react";

const btnClass: string = "bg-purple-200 text-purple-800 py-2 px-4 rounded border border-purple-100 shadow-md shadow-amber-100" +
    " hover:border-2 hover:border-amber-200 hover:text-amber-700 transition duration-100 ease-out";

type CategoryBtnProps = {
    handleBtnClick: () => void;
};

function CategoryBtn({ handleBtnClick }: CategoryBtnProps): JSX.Element {

    return (
        <button className={btnClass} onClick={handleBtnClick}>
            + Add Category
        </button>
    );
}

export default CategoryBtn;