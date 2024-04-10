import { describe, expect, it } from 'bun:test';
import { createLocalStorageAtom } from './stores';

describe('Store value is saved in localStorage', () => {
	it('saves the value in localStorage', () => {
		const value = createLocalStorageAtom<string | null>('test', 'test');
		expect(localStorage.getItem('test')).toEqual(JSON.stringify({ value: 'test' }));
		expect(value.get()).toEqual('test');
		value.set('new value');
		expect(localStorage.getItem('test')).toEqual(JSON.stringify({ value: 'new value' }));
		expect(value.get()).toEqual('new value');
		value.set(null);
		expect(localStorage.getItem('test')).toEqual(null);
		expect(value.get()).toEqual(null);
	});
});
