import React, {useState} from 'react';
import {InvitesPermissions} from "@appTypes/invites";
import {RejectButton} from "@ui/RejectButton/RejectButton";
import {AcceptButton} from "@ui/AcceptButton/AcceptButton";
import {useAcceptInvite, useRejectInvite} from "@hooks/mutations";
import {useSentInvites, useReceivedInvites} from "@hooks/queries";
import {useQueryClient} from "@tanstack/react-query";
import {useRouter} from "@tanstack/react-router";

type Props = {
    id: number;
    invitee_email: string;
    invitor_email: string;
    status: 'pending' | 'accepted' | 'rejected';
    created_at: string;
    permissions: InvitesPermissions;
    lastItemRef?: (node: any) => void
}

export function InvitesListItem(props: Props) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const {mutate:accept} = useAcceptInvite();
    const {mutate:reject} = useRejectInvite();
    const router = useRouter()
    const client = useQueryClient()
    async function acceptInvite(e: React.MouseEvent) {
        e.stopPropagation()
        accept({inviteId: props.id})
        await client.refetchQueries({queryKey:['sentInvites', 'receivedInvites']})
    }

     async function rejectInvite(e: React.MouseEvent) {
        e.stopPropagation()
        reject({inviteId: props.id})
         await client.refetchQueries({queryKey:['sentInvites', 'receivedInvites']})
    }

    // Grid is more flexible than table and better for responsive design
    return (
        <div className="border-b" ref={props.lastItemRef}>
            <div
                className="p-4 cursor-pointer hover:bg-gray-100 transition-all"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <aside className="grid grid-cols-1 md:grid-cols-5 items-center gap-4">
                    <p className="font-semibold text-xs text-gray-500">ID</p>
                    <p className="font-semibold text-xs text-gray-500">Email</p>
                    <p className="font-semibold text-xs text-gray-500">Created At</p>
                    <p className="font-semibold text-xs text-gray-500">Status</p>
                    <p className="font-semibold text-xs text-gray-500">Actions</p>
                </aside>

                <aside className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 mt-1 break-words text-wrap">
                    <p className="font-medium">{props.id}</p>
                    <p>Invitor {props.invitor_email} / Invitee {props.invitee_email}</p>
                    <p>{props.created_at}</p>
                    <p>{props.status}</p>
                    <aside className="flex md:justify-start justify-between space-x-2">
                        {props.status !== 'accepted' && <AcceptButton onClick={acceptInvite}/>}
                        <RejectButton onClick={rejectInvite}/>
                    </aside>
                </aside>
            </div>

            {/* Expanded View (Dropdown) */}
            {!isCollapsed && (
                <div className="bg-gray-50 p-4 flex justify-between break-words whitespace-pre-line gap-5 h-full">
                    <div>
                        <div className="font-semibold text-xs text-gray-500 mb-1">Permissions</div>
                        {
                            Object.entries(props.permissions).map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-2">
                                    <input type="checkbox" checked={Boolean(value)} disabled/>
                                    <span>{key}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <div className="font-semibold text-xs text-gray-500 mt-2">Created At</div>
                        <p>{props.created_at}</p>
                    </div>
                    <div>
                        <div className="font-semibold text-xs text-gray-500 mt-2">Status</div>
                        <p>{props.status}</p>
                    </div>
                    <div>
                        <div className="font-semibold text-xs text-gray-500 mt-2">Invitor</div>
                        <p>{props.invitor_email}</p>
                    </div>
                    <div>
                        <div className="font-semibold text-xs text-gray-500 mt-2">Invitee</div>
                        <p>{props.invitee_email}</p>
                    </div>
                </div>
            )}
        </div>
    );
    ;
};