import {flexRender, Table} from "@tanstack/react-table";
import clsx from "clsx";

interface TableElement {
    id: string;
}

export interface TableViewProps<T extends TableElement>{
    table: Table<T>
    handleClickRow: (id: string)=> void;
}

const TableView = <T extends TableElement,>(props: TableViewProps<T>) => {
    return (
        <table className="table">
            <thead>
            {props.table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th key={header.id}>
                            <div
                                onClick={header.column.getToggleSortingHandler()}
                                className={clsx(header.column.getCanSort() && "cursor-pointer select-none")}
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                                {{
                                    asc: " 🔼",
                                    desc: " 🔽",
                                }[header.column.getIsSorted() as string] ?? null}
                            </div>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody className="®">
            {props.table.getRowModel().rows.map((row) => (
                <tr
                    key={row.id}
                    onClick={() => props.handleClickRow(row.original.id)}
                    className="hover cursor-pointer"
                >
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableView;