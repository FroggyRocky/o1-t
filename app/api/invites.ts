import {db} from '@db/db'
import {createServerFn} from '@tanstack/start'
import {Invite, InvitesPermissions, InviteListItem} from "../types/invites";
import {utf8ToBase64, base64ToUtf8} from '@helpers/dataTransformation'
export const changePermissions = createServerFn('POST', async (body: {
    permissions: InvitesPermissions,
    userId: number
}) => {
    return await db.updateTable('invites')
        .set({permissions: body.permissions})
        .where('id', '=', body.userId)
        .execute()
})

export const sendInvite = createServerFn('POST', async (body: {
    invitee: number,
    invitor: number,
    permissions: InvitesPermissions
}) => {
    function isInviteExist() {
        return db.selectFrom('invites')
            .where('invitee', '=', body.invitee)
            .where('invitor', '=', body.invitor)
            .execute()
    }

    const invite = await isInviteExist()
    if (invite.length > 0) {
        return {message: 'Invite already exists'}

    }
    const res = await db.insertInto('invites')
        .values({
            invitee: body.invitee,
            invitor: body.invitor,
            permissions: JSON.stringify(body.permissions) as any,
            status: 'pending',
        })
        .execute()
    return {message: 'Invite sent'}
})

export const acceptInvite = createServerFn('POST', async (body: { inviteId: number }) => {
     await db.updateTable('invites')
        .set({status: 'accepted'})
        .where('id', '=', body.inviteId)
        .execute()
})


export const rejectInvite = createServerFn('POST', async (body: { inviteId: number }) => {
     await db.deleteFrom('invites').where('id', '=', body.inviteId).execute()
})

export const getSentInvites = createServerFn('GET', async (body: {
    userId: number,
    pageSize: number,
    lastPagePointer:string | undefined
}): Promise<{invites:InviteListItem[], lastPagePointer:string | undefined}> => {
    let lastPagePointer = body.lastPagePointer
    let query = db
        .selectFrom('invites')
        .innerJoin('users as invitor', 'invites.invitor', 'invitor.id')
        .innerJoin('users as invitee', 'invites.invitee', 'invitee.id')
        .select(['invites.id', 'invites.invitee', 'invites.invitor', 'invites.permissions', 'invites.status', 'invites.created_at',
            'invitor.email as invitor_email', 'invitee.email as invitee_email'])
        .where('invitor.id', '=', body.userId)
        if(lastPagePointer) {
            lastPagePointer = base64ToUtf8(lastPagePointer)
            query = query.where('invites.id', '>', Number(lastPagePointer))
        }
        query = query.limit(body.pageSize).orderBy('invites.id', 'asc')
    let res = await query.execute()
    let newPagePointer = res.length > 0 ? res[res.length - 1].id : undefined
    return {
            invites:res,
            lastPagePointer: newPagePointer ? utf8ToBase64(newPagePointer.toString()) : undefined
    }
})

export const getReceivedInvites = createServerFn('GET', async (body: {
    userId: number, pageSize: number,
    lastPagePointer:string | undefined
}): Promise<{invites:InviteListItem[], lastPagePointer:string | undefined}> => {
    let lastPagePointer = body.lastPagePointer
    let query = db
        .selectFrom('invites')
        .innerJoin('users as invitor', 'invites.invitor', 'invitor.id')
        .innerJoin('users as invitee', 'invites.invitee', 'invitee.id')
        .select(['invites.id', 'invites.invitee', 'invites.invitor', 'invites.permissions', 'invites.status', 'invites.created_at',
            'invitor.email as invitor_email', 'invitee.email as invitee_email'])
        .where('invitee', '=', body.userId)
        if(lastPagePointer) {
            lastPagePointer = base64ToUtf8(lastPagePointer)
            query = query.where('invites.id', '>', Number(lastPagePointer))
        }
        query = query = query.limit(body.pageSize).orderBy('invites.id', 'asc')
    let res = await query.execute()
    let newPagePointer = res.length > 0 ? res[res.length - 1].id : undefined
    return {
            invites:res,
            lastPagePointer: newPagePointer ? utf8ToBase64(newPagePointer.toString()) : undefined
    }

})


