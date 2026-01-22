import { FolderKanban } from "lucide-react";
import { ProjectsTable } from "./components/projects-table";
import { mockProjects } from "./data/mock-projects";

const HomePage = () => {
  return (
    <div className="container mx-auto py-5">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <FolderKanban className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-2xl tracking-tight">
              Supplier Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              View and manage your projects with Revie
            </p>
          </div>
        </div>
      </div>
      <ProjectsTable data={mockProjects} />
    </div>
  );
};

export default HomePage;
