import { FC, PropsWithChildren } from "react";
import {
	BiCalculator,
	BiCylinder,
	BiWater,
	CgCompressRight,
	CgTimer,
	FaFan,
	GiHeatHaze,
	GiPipes,
	GiTeePipe,
	MdMenu,
	MdSettings,
} from "react-icons/all";
import { Link } from "@tanstack/react-router";
import classNames from "classnames";

interface IconLinkProps extends PropsWithChildren {
	to: string;
	className?: string;
	title: string;
}

const IconLink: FC<IconLinkProps> = ({ to, title, className, children }) => (
	<Link
		to={to}
		className={classNames(
			className,
			"grow basis-[350px] my-2 w-full bg-rose-600 p-4 rounded-md flex flex-col items-center gap-2",
		)}
		params={{}}
		search={{}}
	>
		{children}
		<span className={"text-xl w-full text-center"}>{title}</span>
	</Link>
);

export const iconClassName = "w-10 h-10 hover:bg-white/25 rounded hover:cursor-pointer";
const Home: FC = () => {
	return (
		<main className={"h-screen text-white flex flex-col"}>
			<header className={"flex justify-between w-full text-white items-center bg-rose-600"}>
				<MdMenu className={iconClassName} />
				<span className={"p-2 text-2xl"}>Clip GmbH Drucklufttechnik</span>
				<Link to={"/settings"}>
					<MdSettings className={iconClassName} />
				</Link>
			</header>
			<section className={"gap-2 m-4 flex flex-wrap"}>
				<IconLink to={"/pipeCable"} title={"Rohrleitung"}>
					<GiPipes className={"w-10 h-10"} />
				</IconLink>
				<IconLink to={"/leakage"} title={"Leckage"}>
					<GiTeePipe className={"w-10 h-10"} />
				</IconLink>
				<IconLink to={"/airCurrent"} title={"Lüftungstechnik"}>
					<FaFan className={"w-10 h-10"} />
				</IconLink>
				<IconLink to={"/container"} title={"Druckluft Behälter"}>
					<BiCylinder className={"w-10 h-10"} />
				</IconLink>
				<IconLink to={"/containerLeakage"} title={"Behälter Leckage"}>
					<CgTimer className={"w-10 h-10"} />
				</IconLink>
				<IconLink to={"/pressureWork"} title={"Verdichtungsarbeit"}>
					<CgCompressRight className={"w-10 h-10"} />
				</IconLink>
				<IconLink to={"/condensate"} title={"Kondensat"}>
					<BiWater className={"w-10 h-10"} />
				</IconLink>
				<IconLink to={"/units"} title={"Einheiten Rechner"}>
					<BiCalculator className={"w-10 h-10"} />
				</IconLink>
				<IconLink to={"/roomHeater"} title={"Raumheizung durch Abluftwärme"}>
					<GiHeatHaze className={"w-10 h-10"} />
				</IconLink>
			</section>
		</main>
	);
};

export default Home;
