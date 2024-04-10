import { atom } from 'nanostores';

export function createLocalStorageAtom<T>(initalValue: T, key: string) {
	const state = atom<T>(initalValue);

	const savedValue = localStorage.getItem(key);
	if (savedValue != null) {
		const { value } = JSON.parse(savedValue) as { value: T };
		state.set(value);
	}

	state.subscribe((newValue) => {
		if (newValue === undefined || newValue === null) {
			localStorage.removeItem(key);
			return;
		}
		localStorage.setItem(key, JSON.stringify({ value: newValue }));
	});

	return state;
}

export const $email = createLocalStorageAtom<string>('sven.stampa@clip-system.de', 'emailState');
