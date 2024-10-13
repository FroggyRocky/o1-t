import {Layout, LoginForm} from "../components";
import {useEffect} from "react";

type Props = {

};

export function Login(props: Props) {
    //it's client data, so it has to be controlled by the client
    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            window.location.href = '/invites';
        }
    }, [window.localStorage.getItem('token')]);
    return <Layout>
    <LoginForm />
    </Layout>
};