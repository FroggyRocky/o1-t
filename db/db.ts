'use server';
import {Generated, Kysely, PostgresDialect} from 'kysely';
import pg from 'pg';
import {InvitesPermissions} from "@appTypes/invites";
import {User} from "@appTypes/users";
import dotenv from 'dotenv';

dotenv.config({
    path: '../.env',
});

interface Database {
    users: User;
    invites: {
        id: Generated<number>;
        invitee: number;
        invitor: number;
        permissions: InvitesPermissions //jsonb object
        status: 'pending' | 'accepted' | 'rejected';
        created_at: Generated<string>;
    }
}

export const db = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: new pg.Pool({
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
        }),
    }),
});
