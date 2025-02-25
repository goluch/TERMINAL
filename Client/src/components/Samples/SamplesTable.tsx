import { SampleDto } from "../../api/terminalSchemas";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  flexRender,
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

  const table = useReactTable({
    columns: columns,
    data: props.samplesData,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleClick = (code: string) => {
    props.onChangeSampleDetails?.(code);
  };

  return (
    <div className="flex justify-center">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
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
