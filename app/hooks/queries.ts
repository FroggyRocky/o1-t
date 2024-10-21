import {useQuery, useInfiniteQuery} from '@tanstack/react-query';
import {getUsers} from '@api/users'
import {me} from '@api/auth'
import {getSentInvites, getReceivedInvites} from '@api/invites'

export function useSentInvites(pageSize: number) {
    return useInfiniteQuery({
        queryKey: ['sentInvites'],
        queryFn: async ({pageParam = undefined}) => {
                const user = await _me()
                if (!user || !user.id) {
                    throw new Error('User not found')
                }
                const res = await getSentInvites({userId: user.id, pageSize: pageSize, lastPagePointer: pageParam});
                return res
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            const hasMore = lastPage.invites.length >= pageSize;
            const nextPage = lastPage.lastPagePointer
            return hasMore ? nextPage : undefined;
        },
        initialPageParam: undefined,
    });
}

export function useReceivedInvites(pageSize: number) {

    return useInfiniteQuery({
        queryKey: ['receivedInvites'],
        queryFn: async ({pageParam = undefined}) => {
            const user = await _me()
            if(!user || !user.id) {
                throw new Error('User not found')
            }
            return await getReceivedInvites({userId:user.id, pageSize: pageSize, lastPagePointer: pageParam});
        },

        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            const hasMore = lastPage.invites.length >= pageSize;
            const nextPage = lastPage.lastPagePointer
            return hasMore ? nextPage : undefined;
        },
        initialPageParam: undefined,
    });
}

export function useUsers(pageSize: number, searchInput: string) {
    return useInfiniteQuery({
        queryKey: ['users', searchInput],
        queryFn: async ({pageParam = undefined}) => {
            return await getUsers({pageSize: pageSize, searchTerm: searchInput, lastPagePointer: pageParam});
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            const hasMore = lastPage.users.length >= pageSize;
            const nextPage = lastPage.lastPagePointer;
            return hasMore ? nextPage : undefined;
        },
        initialPageParam: undefined,
    });
}

export function useMe() {
    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            return await _me();
        },
    });
}


async function _me() {
    const token = localStorage.getItem('token');
    if(!token) {
        throw new Error('No token found')
    }
    const res = await me({token});
    return res.user
}



