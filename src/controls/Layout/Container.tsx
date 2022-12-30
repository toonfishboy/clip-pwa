import classNames from "classnames";
import { AllHTMLAttributes, FC } from "react";

const Container: FC<AllHTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
	<div {...props} className={classNames("flex flex-col", className)} />
);

export default Container;
