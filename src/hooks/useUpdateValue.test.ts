import { describe, expect, jest, test } from 'bun:test';
import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { useUpdateValue } from './useUpdateValue';

describe('values are updated with the key', () => {
	test('should update the value of the key', () => {
		const updateValue = jest.fn();
		const { result } = renderHook(() => {
			const [value, setValue] = useState({ key: 'value' });

			return useUpdateValue(value, (event) => {
				updateValue();
				setValue(event);
			});
		});

		expect(result.current[0]('key')).toBe('value');
		expect(updateValue).toHaveBeenCalledTimes(0);
		act(() => {
			result.current[1]('key')('new value');
		});
		expect(result.current[0]('key')).toBe('new value');
		expect(updateValue).toHaveBeenCalledTimes(1);
	});
});
