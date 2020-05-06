import { useState } from 'react';
export function useData() {
	const [ data, setData ] = useState(null);
	return {
        data,
        setData
	};
}