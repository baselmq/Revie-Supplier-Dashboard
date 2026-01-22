export enum ProjectStatus {
  Pending = "pending",
  InProgress = "inProgress",
  Completed = "completed",
}

export type Project = {
  id: string;
  name: string;
  location: string;
  date: string;
  type: string;
  status: ProjectStatus;
};
