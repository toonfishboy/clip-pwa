import classNames from 'classnames';
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

export interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isClearable?: boolean;
}

const Input: FC<InputProps> = ({ value, className, ...props }) => {
  return (
    <input
      {...props}
      value={value ?? ''}
      className={classNames(
        'rounded-md border border-slate-400 p-2 outline-none hover:border-black  focus:border-clip disabled:bg-gray-300 disabled:text-rose-600 disabled:hover:border-slate-400',
        className
      )}
    />
  );
};

export default Input;
