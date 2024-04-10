import clsx from 'clsx';
import type { FC, KeyboardEvent } from 'react';
import LabelText from '../LabelText';
import { useRadioGroup } from './RadioGroup';

export interface RadioButtonProps {
	value: string;
	className?: string;
	label: string;
}

const RadioButton: FC<RadioButtonProps> = ({ className, value, label }) => {
	const { selected, onSelectChange } = useRadioGroup();

	function handleSelect() {
		onSelectChange(value);
	}

	function handleKeyUp(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSelect();
		}
	}

	return (
		<div onKeyUp={handleKeyUp} className={'flex items-center gap-1'} onClick={handleSelect}>
			<div className={clsx(className, 'h-5 w-5 rounded-full border border-black p-1')}>
				{selected === value && <div className={'h-full w-full rounded-full bg-clip'} />}
			</div>
			<LabelText>{label}</LabelText>
		</div>
	);
};

export default RadioButton;
