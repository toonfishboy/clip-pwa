import classNames from 'classnames';
import { useState, KeyboardEvent, useEffect, useRef } from 'react';

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

  const handleSelect = (option: ListOption<T> | string) => {
    if (isListOption(option)) onOptionChange?.(option);
    onStringChange?.(displayOption(option));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Space' || event.key === 'Enter') setIsOpen(!isOpen);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        className={classNames('input-primary w-full text-left', className)}
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
                className="w-full rounded-md py-2 px-4 hover:cursor-pointer hover:bg-rose-600 hover:text-white"
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
