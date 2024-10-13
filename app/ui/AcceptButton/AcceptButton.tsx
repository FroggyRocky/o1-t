// @flow
import * as React from 'react';

type Props = {
    onClick: (e:any) => void;
};

export function AcceptButton(props: Props) {
    return <button onClick={props.onClick} className="bg-green-500 hover:bg-green-600 text-white font-bold p-4 rounded-full flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    </button>
};