"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Status = 'VERIFIED' | 'UNVERIFIED' | 'PENDING'

export type Evangelist = {
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
    collegeName: string
    status: Status
}

export const columns: ColumnDef<Evangelist>[] = [
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
        accessorKey: "collegeName",
        header: "College",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
]
