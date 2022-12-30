import { Dispatch, SetStateAction, useCallback } from "react";

type GetDocValue<Type, Key extends keyof Type = keyof Type> = (key: Key) => Type[Key];

type SetDocValue<Type, Key extends keyof Type = keyof Type, Value extends Type[Key] = Type[Key]> = (
	key: Key,
) => (value: Value) => void;

export function useUpdateValue<Type>(
	value: Type,
	setValue: Dispatch<SetStateAction<Type>>,
): [GetDocValue<Type>, SetDocValue<Type>] {
	const getDocValue = useCallback(
		<Key extends keyof Type = keyof Type>(key: Key) => value[key],
		[value],
	);
	const setDocValue = useCallback(
		<Key extends keyof Type = keyof Type, Value extends Type[Key] = Type[Key]>(key: Key) =>
			(value: Value) => {
				setValue((prevValue) => ({ ...prevValue, [key]: value }));
			},
		[setValue],
	);

	return [getDocValue, setDocValue];
}
