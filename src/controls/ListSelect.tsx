import classNames from "classnames";
import { FC, useState, KeyboardEvent, useEffect, useRef } from "react";
import { inputStyle } from "../styles/inputStyles";

export type ListOption = {
	key: string;
	label: string;
};

/**
 * Checks if the given value that can be a string or an ListOption is an option
 * @param value select option
 * @returns
 */
function isListOption(value: ListOption | string): value is ListOption {
	return typeof value !== "string";
}

/**
 * Displays the title of the given option value
 * @param value select option
 * @returns
 */
function displayOption(value: ListOption | string): string {
	return isListOption(value) ? value.label : value;
}

/**
 * Returns a key from the given option
 * @param value select option
 * @returns
 */
function getOptionKey(value: ListOption | string): string {
	return isListOption(value) ? value.key : value;
}

interface ListSelectProps {
	options: ListOption[] | string[];
	selected: ListOption | string;
	onOptionChange?: (option: ListOption) => void;
	onStringChange?: (option: string) => void;
	disabled?: boolean;
	className?: string;
}

const ListSelect: FC<ListSelectProps> = ({ className, options, selected, onOptionChange, onStringChange }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		const handleRefClick = (event: Event) => {
			// rome-ignore lint/suspicious/noExplicitAny: Any is needed to cast dom event target to ref
			if (isOpen && !containerRef.current?.contains(event.target as any)) setIsOpen(false);
		};
		window.addEventListener("click", handleRefClick);
		return () => window.removeEventListener("click", handleRefClick);
	}, [isOpen]);

	const handleSelect = (option: ListOption | string) => {
		if (isListOption(option)) onOptionChange?.(option);
		onStringChange?.(displayOption(option));
		setIsOpen(false);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === "Space" || event.key === "Enter") setIsOpen(!isOpen);
	};

	return (
		<div ref={containerRef} className="relative">
			<button
				className={classNames(inputStyle, "w-full text-left", className)}
				onClick={() => setIsOpen(!isOpen)}
				onKeyDown={(event) => handleKeyDown(event)}
			>
				{displayOption(selected)}
			</button>
			{isOpen && (
				<div className="absolute top-full left-0 mt-1 border border-stone-800 rounded-md bg-white  w-full">
					{options.length === 0 ? (
						<span>Keine option verfügbar</span>
					) : (
						options.map((option) => (
							<div
								key={getOptionKey(option)}
								className="py-2 w-full px-4 hover:bg-rose-600 hover:cursor-pointer hover:text-white rounded-md"
								onClick={() => handleSelect(option)}
								onKeyDown={() => handleSelect(option)}
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
