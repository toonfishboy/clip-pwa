import { FC } from "react";
import { MdArrowBack, MdSettings } from "react-icons/all";
import { iconClassName } from "../../pages/Home";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
	title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
	const navigate = useNavigate();

	return (
		<header className={"flex justify-between w-full text-white items-center bg-rose-600"}>
			<MdArrowBack className={iconClassName} onClick={() => navigate(-1)} />
			<span className={"p-2 text-2xl"}>{title}</span>
			<MdSettings className={iconClassName} onClick={() => navigate("/settings")} />
		</header>
	);
};

export default Header;
