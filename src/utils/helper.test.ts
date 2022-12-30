import { describe, expect, it } from "vitest";
import { generateId } from "./helper";

describe("A new id is generated every time the function is called", () => {
	it("generates a new id on every call", () => {
		const id1 = generateId();
		const id2 = generateId();
		expect(id1).not.toEqual(id2);
	});
	it("generate an id with the given length", () => {
		expect(generateId().length).toEqual(24);
		expect(generateId(48).length).toEqual(48);
	});
});
