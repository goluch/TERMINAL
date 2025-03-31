import {flexRender, Table} from "@tanstack/react-table";
import {ProjectDto, SampleDto} from "@api/terminalSchemas.ts";

export interface TableViewProps{
    table: Table<ProjectDto | SampleDto>
    handleClickRow: (id: string)=> void;
}

const TableView = (props: TableViewProps) => {
    return (
        <table className="table">
            <thead>
            {props.table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th key={header.id}>
                            <div
                                {...{
                                    className: header.column.getCanSort()
                                        ? "cursor-pointer select-none"
                                        : "",
                                    onClick: header.column.getToggleSortingHandler(),
                                }}
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