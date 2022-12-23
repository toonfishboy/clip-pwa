import {FC, PropsWithChildren} from "react";
import {BiCylinder, GiPipes, MdMenu, MdSettings} from "react-icons/all";
import {Link} from "@tanstack/react-router";
import * as React from "react";
import classNames from "classnames";

interface IconLinkProps extends PropsWithChildren {
    to: string;
    className?: string;
    title: string;
}

const IconLink: FC<IconLinkProps> = ({to, title, className, children}) => (
    <Link to={to}
          className={classNames(className, "w-full bg-rose-600 p-4 rounded-md flex flex-col items-center gap-2")}
          params={{}} search={{}}>
        {children}
        <span className={"text-xl"}>{title}</span>
    </Link>
);

export const iconClassName = "w-10 h-10 hover:bg-white/25 rounded hover:cursor-pointer"
const Home: FC = () => {
    return (
        <main className={"h-screen text-white"}>
            <header className={"flex justify-between w-full text-white items-center bg-rose-600"}>
                <MdMenu className={iconClassName}/>
                <span className={"p-2 text-2xl"}>Clip GmbH Drucklufttechnik</span>
                <MdSettings className={iconClassName}/>
            </header>
            <section className={"gap-2 m-4 grid grid-cols-[50%_50%]"}>
                <IconLink to={"/pipeCable"} title={"Rohrleitung"}>
                    <GiPipes className={"w-10 h-10"}/>
                </IconLink>
                <IconLink to={"/container"} title={"Druckluft Behälter"}>
                    <BiCylinder className={"w-10 h-10"}/>
                </IconLink>
            </section>
        </main>
    )
};

export default Home;
