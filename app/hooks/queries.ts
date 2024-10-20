import {useQuery, useInfiniteQuery} from '@tanstack/react-query';
import {getUsers} from '@api/users'
import {me} from '@api/auth'
import {getSentInvites, getReceivedInvites} from '@api/invites'

export function useSentInvites(pageSize: number) {
    return useInfiniteQuery({
        queryKey: ['sentInvites'],
        queryFn: async ({pageParam = 0}) => {
                const user = await _me()
                if (!user || !user.id) {
                    console.log('User not found')
                    throw new Error('User not found')
                }
                console.log('user', user, pageSize, pageParam)
                return getSentInvites({userId: user.id, pageSize: pageSize, page: pageParam});
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            const hasMore = lastPage.length >= pageSize;
            const nextPage = lastPageParam + 1;
            return hasMore ? nextPage : undefined;
        },
        initialPageParam: 0,
    });
}

export function useReceivedInvites(pageSize: number) {

    return useInfiniteQuery({
        queryKey: ['receivedInvites'],
        queryFn: async ({pageParam = 0}) => {
            const user = await _me()
            if(!user || !user.id) {
                throw new Error('User not found')
            }
            return await getReceivedInvites({userId:user.id, pageSize: pageSize, page: pageParam});
        },

        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            const hasMore = lastPage.length >= pageSize;
            const nextPage = lastPageParam + 1;
            return hasMore ? nextPage : undefined;
        },
        initialPageParam: 0,
    });
}

export function useUsers(pageSize: number, searchInput: string) {
    return useInfiniteQuery({
        queryKey: ['users', searchInput],
        queryFn: async ({pageParam = 0}) => {
            return await getUsers({pageSize: pageSize, page: pageParam, searchTerm: searchInput});
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            const hasMore = lastPage.length >= pageSize;
            const nextPage = lastPageParam + 1;
            return hasMore ? nextPage : undefined;
        },
        initialPageParam: 0,
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



