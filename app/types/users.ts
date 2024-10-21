export type User = {
    id: number;
    name: string;
    password: string;
    email: string;
    created_at:string;
    verified: boolean;
}

export type FrontUser = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    verified: boolean;
}