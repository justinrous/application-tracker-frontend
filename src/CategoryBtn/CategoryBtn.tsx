
import type { JSX } from "react";

const btnClass: string = "bg-fuchsia-200 text-gray py-2 px-4 rounded hover:border border-gray-400";

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