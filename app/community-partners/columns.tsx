"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Status = 'VERIFIED' | 'UNVERIFIED' | 'PENDING'

export type CommunityPartner = {
    id: number
    email: string
    username: string
    fullname: string
    address: string
    phoneNumber: string
    discordUsername: string
    linkedinUrl: string
    instagramUsername: string
    twitterUsername: string
    communityName: string
    communityUrl: string
    communityStrength: number
    status: Status
}

export const columns: ColumnDef<CommunityPartner>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "username",
        header: "Github",
    },
    {
        accessorKey: "fullname",
        header: "Name",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone",
    },
    {
        accessorKey: "discordUsername",
        header: "Discord",
    },
    {
        accessorKey: "linkedinUrl",
        header: "LinkedIn",
    },
    {
        accessorKey: "instagramUsername",
        header: "Instagram",
    },
    {
        accessorKey: "twitterUsername",
        header: "Twitter",
    },
    {
        accessorKey: "communityName",
        header: "Community Name",
    },
    {
        accessorKey: "communityUrl",
        header: "Community Website",
    },
    {
        accessorKey: "communityStrength",
        header: "Community Strength",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
]
