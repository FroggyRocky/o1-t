import {createFileRoute, redirect} from '@tanstack/react-router'
import {Login} from "../modules/Login";

export const Route = createFileRoute('/login')({
    beforeLoad: async (context) => {
        console.log(context)
    },
  component: () => <Login />,
})
