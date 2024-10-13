'use client';
import {  useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { InvitesPermissions, Invite} from '@appTypes/invites';
import { User } from '@appTypes/users';
import {login} from '@api/auth'
import { sendInvite, acceptInvite, rejectInvite, changePermissions} from '@api/invites'
import {useMe, useReceivedInvites, useSentInvites} from "@hooks/queries";


export function useLogin() {
    return useMutation({
        mutationFn:(body:{email:string, password:string}) => {
            return login(body)
        },
        onSuccess: async (data:{token:string, user:User}, variables, context) => {
            localStorage.setItem('token', data.token)
        }
    })
}

export function usePermissionEdit() {
    return useMutation({
        mutationFn:(body:{
            userId:number,
            permissions:InvitesPermissions
        }) => {
            return changePermissions({userId:body.userId, permissions:body.permissions})
        },
        onSuccess: async () => {
            await useQueryClient().invalidateQueries({queryKey:['sentInvites', 'receivedInvites']})
            await useQueryClient().refetchQueries({queryKey:['sentInvites', 'receivedInvites']})
        }
    })
}

export function useSentInvite() {
    return useMutation({
        mutationFn:async (body:{permissions:InvitesPermissions, inviteeId:number, invitorId:number}) => {
            const payload = {
                permissions: body.permissions,
                invitor: body.invitorId,
                invitee: body.inviteeId
            }
            return await sendInvite(payload)
        },
        onSuccess: async () => {
            await useQueryClient().invalidateQueries({queryKey:['sentInvites', 'receivedInvites']})
            await useQueryClient().refetchQueries({queryKey:['sentInvites', 'receivedInvites']})
        }
    })
}

export function useAcceptInvite() {
    return useMutation({
        mutationFn:(body:{inviteId:number}) => {
            return acceptInvite(body)
        },
        onSuccess: async () => {
            await useQueryClient().invalidateQueries({queryKey:['sentInvites', 'receivedInvites']})
            await useQueryClient().refetchQueries({queryKey:['sentInvites', 'receivedInvites']})
        }
    })
}

export function useRejectInvite() {
    return useMutation({
        mutationFn:async (body:{inviteId:number}) => {
            return await rejectInvite(body)
        }
    })
}



