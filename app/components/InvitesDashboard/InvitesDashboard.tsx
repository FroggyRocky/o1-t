
import React, {useState} from 'react';
import {InvitesSendBox} from "./InvitesSendBox";
import {InvitesList} from "./InvitesList";
import {useUsers} from "@hooks/queries";
import { useReceivedInvites, useSentInvites } from '@hooks/queries';
import {PillButton} from "@ui/PillButton/PillButton";

type Props = {

};

export function InvitesDashboard(props: Props) {
    const [invitesFilter, setInvitesFilter] = useState<'received' | 'sent'>('received');
    return <div className={'w-full'}>
        <aside className={'mb-10'}>
        <InvitesSendBox  />
        </aside>
        <aside className={'flex flex-wrap w-full items-center justify-center gap-3 mb-4'}>
            <PillButton isActivated={invitesFilter === 'sent'} onClick={() => setInvitesFilter('sent')} text={'Sent'}/>
            <PillButton isActivated={invitesFilter === 'received'} onClick={() => setInvitesFilter('received')} text={'Received'}/>
        </aside>
        <h3>{invitesFilter.charAt(0).toUpperCase().slice(1)}</h3>
        <aside>
            <InvitesList invitesFilter={invitesFilter}  />
        </aside>
    </div>
};