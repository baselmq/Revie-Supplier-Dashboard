import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { LayoutGridIcon } from "lucide-react";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { For, Show } from "@/utils";
import { Button } from "../ui/button";

export type CardsPerRow = 1 | 2 | 3 | 4 | 5 | 6;

interface DataGridProps<TData, TValue> extends React.ComponentProps<"div"> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  renderCard: (row: Row<TData>) => React.ReactNode;
  actionBar?: React.ReactNode;
  cardsPerRow?: CardsPerRow;
  onCardsPerRowChange?: (value: CardsPerRow) => void;
  showCardsPerRowControl?: boolean;
}

const GRID_COLS_MAP: Record<CardsPerRow, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
};

const CARDS_PER_ROW_OPTIONS: { value: CardsPerRow; label: string }[] = [
  { value: 1, label: "1 card" },
  { value: 2, label: "2 cards" },
  { value: 3, label: "3 cards" },
  { value: 4, label: "4 cards" },
  { value: 5, label: "5 cards" },
  { value: 6, label: "6 cards" },
];

export function DataGrid<TData, TValue>({
  data,
  columns,
  renderCard,
  actionBar,
  children,
  className,
  cardsPerRow = 4,
  onCardsPerRowChange,
  showCardsPerRowControl = false,
  ...props
}: DataGridProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const gridColsClass = GRID_COLS_MAP[cardsPerRow];

  const handleCardsPerRowChange = (value: CardsPerRow) => {
    onCardsPerRowChange?.(value);
  };

  return (
    <div className={cn("flex w-full flex-col gap-2.5", className)} {...props}>
      {children}
      <div className="flex flex-col gap-4">
        <Show.When isTrue={showCardsPerRowControl}>
          <div className="flex items-center justify-end gap-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <LayoutGridIcon className="size-4" />
              <span>Cards per row:</span>
            </div>
            <Select
              value={cardsPerRow.toString()}
              onValueChange={(val) =>
                handleCardsPerRowChange(Number(val) as CardsPerRow)
              }
            >
              <SelectTrigger size="sm" className="w-25">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <For
                  each={CARDS_PER_ROW_OPTIONS}
                  render={(option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  )}
                />
              </SelectContent>
            </Select>
          </div>
        </Show.When>
        <div
          className={cn(
            "grid gap-4 transition-all duration-300 ease-in-out",
            gridColsClass,
          )}
        >
          <Show>
            <Show.When isTrue={!!table.getRowModel().rows?.length}>
              <For
                each={table.getRowModel().rows}
                render={(row) => (
                  <div key={row.id} className="h-full">
                    {renderCard(row)}
                  </div>
                )}
              />
            </Show.When>
            <Show.Else>
              <div className="col-span-full text-center text-muted-foreground">
                No results.
              </div>
            </Show.Else>
          </Show>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <div className="flex-1 text-muted-foreground text-sm">
          {table.getFilteredRowModel().rows.length} row(s)
        </div>
        <div className="space-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="sm"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="sm"
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
