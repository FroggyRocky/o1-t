// @flow
import * as React from 'react';

type Props = {
    onClick: () => void;
    text: string;
    isActivated: boolean;
};

export function PillButton(props: Props) {
    return <button onClick={props.onClick} className={`${props.isActivated && 'opacity-7'} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full`}>
        {props.text}
    </button>
};