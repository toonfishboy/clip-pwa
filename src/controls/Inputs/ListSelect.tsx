import clsx from 'clsx';
import { type KeyboardEvent, useEffect, useRef, useState, type MouseEvent } from 'react';

export type ListOption<T = unknown> = {
	key: string;
	label: string;
	value?: T;
};

/**
 * Checks if the given value that can be a string or an ListOption is an option
 * @param value select option
 * @returns
 */
function isListOption<T>(value: ListOption<T> | string): value is ListOption<T> {
	return typeof value !== 'string';
}

/**
 * Displays the title of the given option value
 * @param value select option
 * @returns
 */
function displayOption<T>(value: ListOption<T> | string): string {
	return isListOption(value) ? value.label : value;
}

/**
 * Returns a key from the given option
 * @param value select option
 * @returns
 */
function getOptionKey<T>(value: ListOption<T> | string): string {
	return isListOption(value) ? value.key : value;
}

interface ListSelectProps<T = undefined> {
	options: ListOption<T>[] | string[];
	selected: ListOption<T> | string;
	onOptionChange?: (option: ListOption<T>) => void;
	onStringChange?: (option: string) => void;
	disabled?: boolean;
	className?: string;
}

const ListSelect = <T,>({
	className,
	options,
	selected,
	onOptionChange,
	onStringChange,
}: ListSelectProps<T>) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		const handleRefClick = (event: Event) => {
			if (isOpen && !containerRef.current?.contains(event.target as Node)) setIsOpen(false);
		};
		window.addEventListener('click', handleRefClick);
		return () => window.removeEventListener('click', handleRefClick);
	}, [isOpen]);

	function handleSelect(event: MouseEvent | KeyboardEvent, option: ListOption<T> | string) {
		event.preventDefault();
		if (isListOption(option)) onOptionChange?.(option);
		onStringChange?.(displayOption(option));
		setIsOpen(false);
	}

	function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
		if (event.key === 'Space' || event.key === 'Enter') setIsOpen(!isOpen);
	}

	return (
		<div ref={containerRef} className="relative">
			<button
				type="button"
				className={clsx(
					'w-full rounded-md border border-slate-400 p-2 text-left hover:border-black focus:border-clip disabled:bg-gray-300 disabled:text-rose-600',
					className,
				)}
				onClick={() => setIsOpen(!isOpen)}
				onKeyDown={(event) => handleKeyDown(event)}
			>
				{displayOption(selected)}
			</button>
			{isOpen && (
				<div className="absolute top-full left-0 z-10 mt-1 max-h-[20rem] w-full overflow-auto rounded-md border border-stone-800  bg-white">
					{options.length === 0 ? (
						<span>Keine option verfügbar</span>
					) : (
						options.map((option) => (
							<div
								key={getOptionKey(option)}
								className="w-full rounded-md py-2 px-4 hover:cursor-pointer hover:bg-clip hover:text-white"
								onClick={(event) => handleSelect(event, option)}
								onKeyDown={(event) => handleSelect(event, option)}
							>
								{displayOption(option)}
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
};

export default ListSelect;
