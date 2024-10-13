import {InvitesListItem} from "./InvitesListItem";
import {Invite} from "@appTypes/invites";
import {useMe, useReceivedInvites, useSentInvites} from '@hooks/queries';
import {Loader} from "@ui/Loader/Loader";
import {useObserverRef} from "@hooks/hooks";
import React from "react";

const PAGE_SIZE = 10;

type Props = {
    invitesFilter: 'received' | 'sent';
};

export function InvitesList(props: Props) {
    const {data, isFetching, fetchNextPage} = props.invitesFilter === 'received' ? useReceivedInvites(PAGE_SIZE) : useSentInvites(PAGE_SIZE);
    const invites = data?.pages.flatMap(page => page) || [];
    const lastItemRef = useObserverRef(fetchNextPage)
    // Grid is more flexible than table and better for responsive design
    return (
        <div className="h-full overflow-y-auto shadow-lg rounded-lg border border-gray-200">
            {invites.length > 0 ? invites.map((invite, index) => {
                if(invites.length === index + 1) {
                    return <InvitesListItem
                        key={invite.id}
                        id={invite.id}
                        invitor_email={invite.invitor_email}
                        invitee_email={invite.invitee_email}
                        status={invite.status}
                        created_at={invite.created_at}
                        permissions={invite.permissions}
                        lastItemRef={lastItemRef}
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
                    />
                }
            }) : !isFetching && <p className="p-4 text-center">No invites Found</p>}
            {isFetching && <Loader />}
        </div>
    );
};