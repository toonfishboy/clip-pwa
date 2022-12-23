export const handleUnit = (value: string, setter: (value: string) => void, type: number, setUnit: (number: number, type: number) => void) => {
    let number = parseFloat(value);
    if (value === "")
        setter("");
    if (isNaN(number)) return;
    setter(value);
    setUnit(number, type);
};

/**
 * Generates a random id with the given length. Default is 24
 * @param length
 */
export const generateId = (length: number = 24) => {
    return new Array(length).fill(0).map(_ => (Math.random() * 16).toString(16)[0]).reduce((a, b) => a + b)
}

export function checkNaN(value: number | undefined): number | undefined {
    if (!value) return undefined;
    return isNaN(value) ? undefined : value;
}

/**
 * checks if all values in the given object except for the given key are not undefined
 * @param value
 * @param resultKey
 */
export function hasRequiredValues<Type extends Object, Key extends keyof Type = keyof Type>(value: Type, resultKey: Key) {
    return !Object.entries(value).some(([k, v]) => k !== resultKey && v === undefined);
}
