import { useState } from 'react';
export function useLoading() {
	const [ state, setState ] = useState({
        Loading:false,
        type:null //Screen && Icon
    });
	return{
		state,
		setState,
	};
}
