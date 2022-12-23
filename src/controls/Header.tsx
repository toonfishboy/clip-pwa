import {FC} from "react";
import {MdArrowBack} from "react-icons/all";
import {iconClassName} from "../pages/Home";
import {Link} from "@tanstack/react-router";

interface HeaderProps {
    title: string;
}

const Header: FC<HeaderProps> = ({title}) => {
    return (
        <header className={"flex justify-between w-full text-white items-center bg-rose-600"}>
            <Link to={"/"}>
                <MdArrowBack className={iconClassName}/>
            </Link>
            <span className={"p-2 text-2xl"}>{title}</span>
            <div className={"w-10"}/>
        </header>
    )
};

export default Header;
