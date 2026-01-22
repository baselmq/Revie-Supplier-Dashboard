"use client";

import type { Project } from "@/types/project";
import { columns, statusVariants } from "./columns";
import DataTable from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Calendar, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataGrid } from "@/components/data-table/data-grid";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Row } from "@tanstack/react-table";

interface ProjectsTableProps {
  data: Project[];
}

export function ProjectsTable({ data }: ProjectsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");

  const filteredData = data.filter((project) => {
    return project.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
  };

  const renderCard = (row: Row<Project>) => {
    const project = row.original;
    const date = new Date(project.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return (
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardContent className="flex h-full flex-col justify-between px-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="min-w-0 space-y-1">
              <h3 className="truncate font-semibold" title={project.name}>
                {project.name}
              </h3>
              <p
                className="text-muted-foreground truncate text-sm"
                title={project.type}
              >
                {project.type}
              </p>
            </div>
            <Badge
              variant={statusVariants[project.status] || "secondary"}
              className="shrink-0 capitalize"
            >
              {project.status}
            </Badge>
          </div>
          <div className="text-muted-foreground space-y-1 text-sm">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{project.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5 shrink-0" />
              <span>{date}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <InputGroup className="max-w-xs">
          <InputGroupInput
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <InputGroupAddon
            align="inline-end"
            className={cn(!inputValue && "hidden")}
          >
            <InputGroupButton size="icon-xs" onClick={handleClear}>
              <X className="size-4" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="hidden md:block">
        <DataTable data={filteredData} columns={columns} />
      </div>
      <div className="md:hidden">
        <DataGrid
          data={filteredData}
          columns={columns}
          renderCard={renderCard}
        />
      </div>
    </div>
  );
}
