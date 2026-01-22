"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { Project, ProjectStatus } from "@/types/project";

export const statusVariants: Record<
  ProjectStatus,
  "success" | "warning" | "error"
> = {
  completed: "success",
  inProgress: "warning",
  pending: "error",
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Project Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as ProjectStatus;
      return (
        <Badge variant={statusVariants[status]} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
];
