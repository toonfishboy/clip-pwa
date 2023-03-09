import { FC } from 'react';
import classNames from 'classnames';
import { useRadioGroup } from './RadioGroup';
import LabelText from '../LabelText';

export interface RadioButtonProps {
  value: string;
  className?: string;
  label: string;
}

const RadioButton: FC<RadioButtonProps> = ({ className, value, label }) => {
  const { selected, onSelectChange } = useRadioGroup();

  const handleSelect = () => {
    onSelectChange(value);
  };

  return (
    <div className={'flex items-center gap-1'} onClick={handleSelect}>
      <div className={classNames(className, 'h-5 w-5 rounded-full border border-black p-1')}>
        {selected === value && <div className={'h-full w-full rounded-full bg-clip'} />}
      </div>
      <LabelText>{label}</LabelText>
    </div>
  );
};

export default RadioButton;
