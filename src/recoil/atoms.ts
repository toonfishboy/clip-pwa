import { atom, DefaultValue } from "recoil";

type SyncEffect<T> = {
	setSelf: (param: T | DefaultValue | ((param: T | DefaultValue) => T | DefaultValue)) => void;
	onSet: (param: (newValue: T, oldValue: T | DefaultValue, isReset: boolean) => void) => void;
};

const localStorageEffect =
	<T>(key: string) =>
	({ setSelf, onSet }: SyncEffect<T>) => {
		const savedValue = window.localStorage.getItem(key);
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue) as T);
		}

		onSet((newValue: T) => {
			if (newValue === undefined || newValue === null) {
				window.localStorage.removeItem(key);
				return;
			}
			const value = typeof newValue === "string" ? newValue : JSON.stringify(newValue);
			window.localStorage.setItem(key, value);
		});
	};

export const emailState = atom<string>({
	key: "emailState",
	default: "sven.stampa@clip-systems.de",
	effects: [localStorageEffect<string>("emailState")],
});
