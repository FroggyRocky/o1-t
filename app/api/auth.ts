import {db} from '@db/db'
import { createServerFn } from '@tanstack/start'
import bcrypt from 'bcrypt'
import {FrontUser, User} from "../types/users";
import jwt, {JwtPayload} from 'jsonwebtoken'

export const login = createServerFn('POST', async (body:{email:string, password:string}) => {
    const user = await db.selectFrom('users').selectAll().where('email', '=', body.email).executeTakeFirstOrThrow()
    if (user.password && await bcrypt.compare(body.password, user.password)) {
        const token =  jwt.sign({email: user.email, id: user.id}, process.env.JWT_SECRET as string)
        return { user:{
             id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
                verified: user.verified,
            } as User, token };
    } else {
        throw new Error('Invalid email or password');
    }
})

export const me = createServerFn('GET', async (body:{token:string}):Promise<{user:FrontUser}> => {
    const isValid = jwt.verify(body.token, process.env.JWT_SECRET as string)
    const {id} = isValid as JwtPayload
    if(!isValid) {
        throw new Error('Invalid token')
    }
    const user = await db.selectFrom('users')
        .select(['id', 'email', 'name', 'created_at', 'verified'])
        .where('id', '=', id)
        .executeTakeFirstOrThrow();
    if(!user) {
        throw new Error('User not found')
    }
    return { user };
})
