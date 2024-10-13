// @flow
import * as React from 'react';

type Props = {
    onClick: (e:any) => void;
};

export function RejectButton(props: Props) {
  return  <button
        className="max-w-[80px] bg-red-500 hover:bg-red-600 text-white font-bold p-4 rounded-full flex justify-center items-center"
        onClick={props.onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
    </button>
};