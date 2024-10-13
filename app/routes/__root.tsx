// app/routes/__root.tsx
import { createRootRoute } from '@tanstack/react-router'
import { Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import * as React from 'react'
import '../index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
export const Route = createRootRoute({
    meta: () => [
        {
            charSet: 'utf-8',
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
        },
        {
            title: 'O1 - Test',
        },
    ],
    component: RootComponent,

})
const queryClient = new QueryClient()
function RootComponent() {
    return (
        <RootDocument >
            <Outlet  />
        </RootDocument>
    )
}

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <Html>
            <Head>
                <Meta/>
            </Head>
            <Body>
                <QueryClientProvider client={queryClient}>
                {children}
                </QueryClientProvider>
                <ScrollRestoration />
                <Scripts />
            </Body>
        </Html>
    )
}