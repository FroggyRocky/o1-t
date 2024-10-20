import React, {useState, useMemo, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {User} from '@appTypes/users';
import {useClickOutside} from "@hooks/hooks";
import {useMe, useUsers} from "@hooks/queries";
import {useObserverRef} from "@hooks/hooks";
import {Loader} from "@ui/Loader/Loader";
import {useDebounce} from "@hooks/hooks";
import {useSentInvite} from '@hooks/mutations';
import {InvitesPermissions} from "@appTypes/invites";
import {useQueryClient} from "@tanstack/react-query";

const PAGE_SIZE = 10;
type Props = {
    refetchInvites: () => void;
};
const inviteSchema = z.object({
    permissions: z.object({
        posts: z.object({
            read: z.boolean(),
            write: z.boolean(),
        }),
        messages: z.object({
            read: z.boolean(),
            write: z.boolean(),
        }),
        profile: z.object({
            read: z.boolean(),
            write: z.boolean(),
        }),
    }).refine(data => {
        const hasPermissions = ['posts', 'messages', 'profile'].some(
            (key) => data[key].read || data[key].write
        );
        return hasPermissions;
    }, 'At least one permission is required')
});

export function InvitesSendBox(props: Props) {
    const {mutate, isPending, isSuccess, error: submitErrors} = useSentInvite()
    const me = useMe().data;
    const {register, handleSubmit, watch, setValue, reset, formState: {errors}} = useForm({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            permissions: {
                posts: {read: false, write: false},
                messages: {read: false, write: false},
                profile: {read: false, write: false},
            }
        }
    });
    const [searchTerm, setSearchTerm] = useState('');
    const {data, isFetching} = useUsers(PAGE_SIZE, searchTerm);
    const [selectedInvitee, setSelectedInvitee] = useState<any>(null);
    const users = data?.pages.flatMap(page => page) || [];
    const InvitesSendBoxRef = React.useRef(null);
    useEffect(() => {
        const subscription = watch((value, {name, type}) => {
            const permissions = value.permissions;
            for (let key in permissions) {
                const typedKey = key as 'posts' | 'messages' | 'profile';
                if (permissions[key].write && !permissions[key].read) {
                    setValue(`permissions.${typedKey}.read`, true);
                }
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])

    useClickOutside(InvitesSendBoxRef, () => {
        setSelectedInvitee(null);
        reset()
    });


    const onSubmit = async (data: { permissions: InvitesPermissions }) => {
        const inviteData = {
            ...data,
            invitorId: Number(me?.id) as number,
            inviteeId: Number(selectedInvitee.id) as number,
        };
        mutate(inviteData)
        props.refetchInvites()
    };

    function handleSetSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value);
    }

    const foundUsers = users.filter(user => user.id !== me?.id)
    return <div>
        {/* User Search Input */}
        <input
            type="text"
            value={searchTerm}
            onChange={handleSetSearchTerm}
            placeholder="Search for a user by email"
            className="border p-2 rounded w-full mb-4"
        />
        {foundUsers.length > 0 && searchTerm &&
            <div className="space-y-2" ref={InvitesSendBoxRef}>
                {foundUsers.map((user) => (
                    <div
                        key={user.id}
                        className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                            setSelectedInvitee(user);
                        }}
                    >
                        <div className="flex justify-between items-center">
                            <span>{user.name}</span>
                            <span>{user.email}</span>
                        </div>
                        {/* Collapsible Invite Sandbox */}
                        {selectedInvitee && selectedInvitee.id === user.id && (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                                    {/* Collapsible Content */}
                                    <div>
                                        <h4 className="font-semibold">{selectedInvitee.name}</h4>
                                        {/* Permissions Selection */}
                                        {/* Posts Permissions */}
                                        <div className="my-2">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" {...register('permissions.posts.read')} />
                                                <span>Posts - Read</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" {...register('permissions.posts.write')} />
                                                <span>Posts - Write</span>
                                            </label>
                                        </div>

                                        {/* Messages Permissions */}
                                        <div className="my-2">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" {...register('permissions.messages.read')} />
                                                <span>Messages - Read</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" {...register('permissions.messages.write')} />
                                                <span>Messages - Write</span>
                                            </label>
                                        </div>

                                        {/* Profile Permissions */}
                                        <div className="my-2">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" {...register('permissions.profile.read')} />
                                                <span>Profile - Read</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" {...register('permissions.profile.write')} />
                                                <span>Profile - Write</span>
                                            </label>
                                        </div>
                                    </div>
                                    {/* Send Invite Button */}
                                    {errors.permissions?.root?.message && (
                                        <p className="text-red-500">{errors.permissions.root.message}</p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                    >
                                        {isPending ? "Sending Invite" : isSuccess ? "Sent!" : "Send Invite"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                ))}
                {isFetching && <Loader/>}
            </div>}
    </div>
};