import {db} from '@db/db'
import { createServerFn } from '@tanstack/start'
import {User} from "../types/users";
export const getUsers = createServerFn('GET', async (body:{pageSize:number, page:number, searchTerm:string}):Promise<User[]> => {
    console.log(body)
    if(body.searchTerm) {
        console.log(body.searchTerm)
        return await db.selectFrom('users')
            .where('email', 'ilike', `%${body.searchTerm}%`)
            .select(['id', 'email', 'name', 'created_at', 'verified'])
            .limit(body.pageSize)
            .offset(body.page * body.pageSize)
            .execute()
    } else {
        const res = await db.selectFrom('users')
            .limit(body.pageSize)
            .select(['id', 'email', 'name', 'created_at', 'verified'])
            .offset(body.page * body.pageSize)
            .execute()
        return res
    }
})