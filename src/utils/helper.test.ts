import { checkNaN, generateId, handleUnit, hasRequiredValues, round } from './helper';
import { describe, it, expect, jest } from 'bun:test';

describe("The unit is handled correctly", () => {
    it("sets the value to an empty string if the value is an empty string", () => {
        const setValue = jest.fn();
        const setUnit = jest.fn();
        handleUnit("", setValue, 0, setUnit);
        expect(setValue).toHaveBeenCalledWith("");
    });
    it("sets the value to the given value if it is a valid number", () => {
        const setValue = jest.fn();
        const setUnit = jest.fn();
        handleUnit("1", setValue, 0, setUnit);
        expect(setValue).toHaveBeenCalledWith("1");
        expect(setUnit).toHaveBeenCalledWith(1, 0);
    });
    it("does not set the value if it is NaN", () => {
        const setValue = jest.fn();
        const setUnit = jest.fn();
        handleUnit("a", setValue, 0, setUnit);
        expect(setValue).not.toHaveBeenCalled();
        expect(setUnit).not.toHaveBeenCalled();
    });
});

describe('A new id is generated every time the function is called', () => {
	it('generates a new id on every call', () => {
		const id1 = generateId();
		const id2 = generateId();
		expect(id1).not.toEqual(id2);
	});
	it('generate an id with the given length', () => {
		expect(generateId().length).toEqual(24);
		expect(generateId(48).length).toEqual(48);
	});
});

describe('The given value is checked for NaN', () => {
	it('returns the value if it is not NaN', () => {
		expect(checkNaN(1)).toEqual(1);
		expect(checkNaN(0)).toEqual(0);
		expect(checkNaN(-1)).toEqual(-1);
	});
	it('returns undefined if the value is NaN', () => {
		expect(checkNaN(Number.NaN)).toBeUndefined();
		expect(checkNaN(undefined)).toBeUndefined();
	});
});

describe('The given object has all required values', () => {
	it('returns true if all values are not undefined', () => {
		expect(hasRequiredValues({ value: 1, result: 2 }, 'result')).toBeTruthy();
		expect(hasRequiredValues({ value: 1, result: 2 })).toBeTruthy();
		expect(hasRequiredValues({ value: 0, result: 2 }, 'value')).toBeTruthy();
	});
	it('returns false if one value is undefined', () => {
		expect(hasRequiredValues({ value: undefined, result: 2 })).toBeFalsy();
		expect(hasRequiredValues({ value: 1, result: undefined }, 'value')).toBeFalsy();
	});
});

describe("The given value is rounded to the given length", () => {
    it("rounds the value to the given length", () => {
        expect(round(1.2345)).toEqual(1.23);
        expect(round(1.2345, 1)).toEqual(1.2);
        expect(round(1.2345, 3)).toEqual(1.235);
    });
});
