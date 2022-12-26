import {AllHTMLAttributes, FC, useEffect, useState} from "react";
import classNames from "classnames";

export interface NumberInputProps extends Omit<AllHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
    number: number | undefined,
    onChangeNumber: (number: number | undefined) => void;
}

const NumberInput: FC<NumberInputProps> = ({number, onChangeNumber, className, ...props}) => {
    const [text, setText] = useState<string>("");

    const handelTextChange = (text: string) => {
        if (text.length === 0) {
            setText("");
            onChangeNumber(undefined);
            return;
        }
        const regex = new RegExp(/^[0-9]+\.?[0-9]*$/);
        const result = text.match(regex);
        if (result === null)
            return;
        const number = parseFloat(text);
        if (!Number.isNaN(number))
            onChangeNumber(number);
        setText(text);
    };

    useEffect(() => {
        if (
            (text.length === 0 && number !== undefined) ||
            (text.length !== 0 && parseFloat(text) !== number)
        )
            setText(number?.toString() ?? "");
    }, [text, number]);

    return <input {...props} value={text} onChange={event => handelTextChange(event.target.value)} type={"number"}
                  className={classNames("border border-slate-800 rounded-md p-2 disabled:bg-gray-300 disabled:text-rose-600", className)}
    />;
};

export default NumberInput;
