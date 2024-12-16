import { headers } from "next/headers"
import { Evangelist, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Evangelist[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/evangelists`, {
        headers: {
            username: process.env.NEXT_PUBLIC_APERTRE_ADMIN_USERNAME as string,
            password: process.env.NEXT_PUBLIC_APERTRE_ADMIN_PASSWORD as string
        }
    })
    const data = await res.json();

    if (!res.ok) {
        return [];
    }

    return data as Evangelist[];
}

export default async function page() {
    headers();
    const data = await getData();

    return (
        <div className="flex flex-col gap-3 px-8 py-4">
            <h1 className="text-2xl font-semibold">Evangelists</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
