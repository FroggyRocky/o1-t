'use client';
import {Layout} from "../components";
import {useEffect} from "react";
import {InvitesDashboard} from "../components";
type Props = {

};

export function Invites(props: Props) {
    //it's client data, so it has to be controlled by the client
    useEffect(() => {
        if (!window.localStorage.getItem('token')) {
            window.location.href = '/login';
        }
    }, [window.localStorage.getItem('token')]);
    return <Layout contentPosition={'start'}>
            <InvitesDashboard />
    </Layout>
};