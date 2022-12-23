import {AllHTMLAttributes, FC, PropsWithChildren} from "react";
import classNames from "classnames";

export type  LabelWrapperProps = AllHTMLAttributes<HTMLLabelElement> & PropsWithChildren & {
    label: string;
};
const LabelWrapper: FC<LabelWrapperProps> = ({label,className,children, ...props}) => (
    <label {...props} className={classNames(className)}>
        <span>{label}</span>
        {children}
    </label>
);

export default LabelWrapper;
