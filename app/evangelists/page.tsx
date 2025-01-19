import { headers } from "next/headers"
import { Evangelist, columns } from "./columns"
import { DataTable } from "./data-table";
import { getStatusOptions } from "@/lib/utils";

async function getData(): Promise<Evangelist[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/evangelist`, {
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
    const statusOptions = await getStatusOptions();
    const data = await getData();

    return (
        <div className="flex flex-col gap-5 px-8 py-4">
            <h1 className="text-4xl font-semibold text-white">Evangelists</h1>
            <DataTable columns={columns} data={data} statusOptions={statusOptions} />
        </div>
    )
}
