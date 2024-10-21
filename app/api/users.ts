import {db} from '@db/db'
import {createServerFn} from '@tanstack/start'
import {FrontUser, User} from "../types/users";
import {base64ToUtf8, utf8ToBase64} from '@helpers/dataTransformation'

export const getUsers = createServerFn('GET', async (body: {
    pageSize: number,
    searchTerm: string,
    lastPagePointer: string | undefined
}): Promise<{ users: FrontUser[], lastPagePointer: string | undefined }> => {
    let lastPagePointer = body.lastPagePointer
    let query;
    let res;
    if (body.searchTerm) {
        query = db.selectFrom('users')
            .where('email', 'ilike', `%${body.searchTerm}%`)
            .select(['id', 'email', 'name', 'created_at', 'verified'])
            .limit(body.pageSize)
        if (lastPagePointer) {
            lastPagePointer = base64ToUtf8(lastPagePointer)
            query = query.where('id', '>', Number(lastPagePointer))
        }
        query = query.limit(body.pageSize).orderBy('id', 'asc')
        res = await query.execute()
        let newPagePointer = res.length > 0 ? res[res.length - 1].id : undefined
        return {
            users: res,
            lastPagePointer: newPagePointer ? utf8ToBase64(newPagePointer.toString()) : undefined
        }
    } else {
        query = db.selectFrom('users')
            .limit(body.pageSize)
            .select(['id', 'email', 'name', 'created_at', 'verified'])
        if (lastPagePointer) {
            lastPagePointer = base64ToUtf8(lastPagePointer)
            query = query.where('id', '>', Number(lastPagePointer))
        }
        query = query.limit(body.pageSize).orderBy('id', 'asc')
        res = await query.execute()
        let newPagePointer = res.length > 0 ? res[res.length - 1].id : undefined
        return {
            users: res,
            lastPagePointer: newPagePointer ? utf8ToBase64(newPagePointer.toString()) : undefined
        }
    }
})