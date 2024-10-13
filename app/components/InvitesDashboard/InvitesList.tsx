import {InvitesListItem} from "./InvitesListItem";
import {Invite, InviteListItem} from "@appTypes/invites";
import {useMe, useReceivedInvites, useSentInvites} from '@hooks/queries';
import {Loader} from "@ui/Loader/Loader";
import {useObserverRef} from "@hooks/hooks";
import React, {useMemo} from "react";


type Props = {
    invites: InviteListItem[];
    fetchNextPage: () => void;
    refetch: () => void;
    isFetching: boolean;
    hasNextPage: boolean;
};

export function InvitesList({invites, hasNextPage, fetchNextPage, isFetching, refetch}: Props) {

    const lastItemRef = useObserverRef(fetchNextPage)
    const inviteComponents = useMemo(() => {
        return invites.map((invite, index) => {
            if (invites.length === index + 1 && hasNextPage) {
                return <InvitesListItem
                    key={invite.id}
                    id={invite.id}
                    invitor_email={invite.invitor_email}
                    invitee_email={invite.invitee_email}
                    status={invite.status}
                    created_at={invite.created_at}
                    permissions={invite.permissions}
                    lastItemRef={lastItemRef}
                    refetchLists={refetch}
                />
            } else {
                return <InvitesListItem
                    key={invite.id}
                    id={invite.id}
                    invitor_email={invite.invitor_email}
                    invitee_email={invite.invitee_email}
                    status={invite.status}
                    created_at={invite.created_at}
                    permissions={invite.permissions}
                    refetchLists={refetch}
                />
            }
        })
    }, [invites])
    // Grid is more flexible than table and better for responsive design
    return (
        <div className="h-full overflow-y-auto shadow-lg rounded-lg border border-gray-200">
            {invites.length > 0 ? inviteComponents : !isFetching && <p className="p-4 text-center">No invites Found</p>}
            {isFetching && <Loader/>}
        </div>
    );
};