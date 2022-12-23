import {AllHTMLAttributes, FC, PropsWithChildren} from "react";
import classNames from "classnames";

export type  LabelWrapperProps = AllHTMLAttributes<HTMLLabelElement> & PropsWithChildren;
const LabelWrapper: FC<LabelWrapperProps> = ({className,children, ...props}) => (
    <label {...props} className={classNames(className)}>{children}</label>
);

export default LabelWrapper;
