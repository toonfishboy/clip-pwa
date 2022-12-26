import {FC, PropsWithChildren} from "react";
import classNames from "classnames";

interface LabelText extends PropsWithChildren {
    className?: string;
}

const LabelText: FC<LabelText> = ({className, children}) => (
    <span className={classNames("text-lg", className)}>{children}</span>
);

export default LabelText;
