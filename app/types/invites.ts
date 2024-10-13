
export type Invite = {
    id: number;
    invitee: number;
    invitor: number;
    permissions: InvitesPermissions,
    status: 'pending' | 'accepted' | 'rejected';
    created_at: Date;
}
export type InvitesPermissions = {
    profile:{
        read:boolean,
        write:boolean
    },
    posts:{
        read:boolean,
        write:boolean
    },
    messages:{
        read:boolean,
        write:boolean
    }
}

export type InviteListItem = {
    created_at: string;
    id: number;
    invitee: number;
    invitee_email: string;
    invitor: number;
    invitor_email: string;
    permissions: InvitesPermissions;
    status: 'pending' | 'accepted' | 'rejected';

}
