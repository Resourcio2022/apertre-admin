import { headers } from "next/headers"
import { CommunityPartner, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<CommunityPartner[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/community-partner`, {
        headers: {
            username: process.env.NEXT_PUBLIC_APERTRE_ADMIN_USERNAME as string,
            password: process.env.NEXT_PUBLIC_APERTRE_ADMIN_PASSWORD as string
        }
    })
    const data = await res.json();

    if (!res.ok) {
        return [];
    }

    return data as CommunityPartner[];
}

export default async function page() {
    headers();
    const data = await getData();

    return (
        <div className="flex flex-col gap-3 px-8 py-4">
            <h1 className="text-2xl font-semibold">Community Partners</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}