"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Status } from "@/lib/types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface UsernameStatus {
    username: string;
    status: Status;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    statusOptions: Status[]
}

export function DataTable<TData, TValue>({ columns, data, statusOptions }: DataTableProps<TData, TValue>) {
    const router = useRouter();

    const [currentValues, setCurrentValues] = useState<Record<string, UsernameStatus>>({});
    const [originalValues, setOriginalValues] = useState<Record<string, UsernameStatus>>({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    useEffect(() => {
        const initialValues: Record<string, UsernameStatus> = {};
        table.getRowModel().rows.forEach(row => {
            const usernameCell = row.getVisibleCells().find(cell => cell.column.id === 'username');
            const statusCell = row.getVisibleCells().find(cell => cell.column.id === 'status');
            if (usernameCell && statusCell) {
                const username = usernameCell.getValue() as string;
                const status = statusCell.getValue() as Status;
                initialValues[row.id] = {
                    username,
                    status
                };
            }
        });
        setOriginalValues(initialValues);
        setCurrentValues(initialValues);
    }, [data]);

    const handleStatusChange = (rowId: string, newValue: Status) => {
        setCurrentValues(prev => ({
            ...prev,
            [rowId]: {
                ...prev[rowId],
                status: newValue
            }
        }));
    };

    const hasChanges = Object.entries(currentValues).some(
        ([rowId, value]) => originalValues[rowId]?.status !== value.status
    );

    const handleSubmit = async () => {
        const changedRows = Object.entries(currentValues)
            .filter(([rowId, value]) => originalValues[rowId].status !== value.status)
            .map(([_, { username, status }]) => ({ username, status }))

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/community-partner/update-status`, {
                method: 'PATCH',
                body: JSON.stringify(changedRows),
                headers: {
                    'Content-Type': 'application/json',
                    username: process.env.NEXT_PUBLIC_APERTRE_ADMIN_USERNAME as string,
                    password: process.env.NEXT_PUBLIC_APERTRE_ADMIN_PASSWORD as string,
                },
            });

            const data = await res.json();

            if (res.status === 202) {
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            console.error("Failed to fetch status options:", error);
            toast.error("Error occurred");
        }
        finally {
            router.refresh();
        }
    }

    return (
        <div className="space-y-4">
            <Table className="border rounded-md overflow-hidden text-white">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="text-white bg-slate-700"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className={
                                    currentValues[row.id]?.status !== originalValues[row.id]?.status
                                        ? "bg-red-400 text-slate-900 transition-colors duration-300"
                                        : ""
                                }
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        <div className="overflow-x-auto max-w-xs py-1 whitespace-nowrap">
                                            {cell.column.id === "status" ? (
                                                <select
                                                    value={currentValues[row.id]?.status || cell.getValue<Status>()}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value as Status;
                                                        handleStatusChange(row.id, newValue);
                                                    }}
                                                    className="outline-none w-fit rounded px-1 py-1 text-black"
                                                >
                                                    {statusOptions.map((status) => (
                                                        <option
                                                            key={status}
                                                            value={status}
                                                        >
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            )}
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button
                variant="outline"
                className="w-fit"
                onClick={handleSubmit}
                disabled={!hasChanges}
            >
                Apply
            </Button>
        </div>
    )
}
