import { SampleDto } from "../../api/terminalSchemas";
import { useState, useEffect } from "react";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  flexRender,
  SortingState,
} from "@tanstack/react-table";

export interface SamplesTableProps {
  samplesData: SampleDto[];
  onChangeSampleDetails?: (code: string) => void;
}

const SamplesTable = (props: SamplesTableProps) => {
  const columnHelper = createColumnHelper<SampleDto>();

  const columns = [
    columnHelper.accessor("code", {
      header: "Code",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("projectName", {
      header: "Project Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) => info.getValue()?.toLocaleDateString(),
    }),
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns: columns,
    data: props.samplesData,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const handleClick = (code: string | null | undefined) => {
    props.onChangeSampleDetails?.(code?.toString() ?? "");
  };

  useEffect(() => {
    const sortParam = sorting[0]?.id ?? "";
    const orderParam = sorting[0]?.desc ? 0 : 1; // 0 - desc, 1 - asc (I'm not sure if this is correct)
    console.log("Sorting: ", sortParam, orderParam);
    let url = `http://localhost:5006/api/v1/samples`;
    if (sortParam) {
      url += `&orderBy=${sortParam}&orderDirection=${orderParam}`;
    }
    console.log("FETCH DATA:", url);
  }, [sorting]);

  return (
    <div className="flex justify-center">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
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
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleClick(row.original.code)}
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
    </div>
  );
};

export default SamplesTable;
