export type ProjectStatus = 'Pending' | 'In Progress' | 'Completed';
export type ProjectPriority = 'Low' | 'Medium' | 'High';

export interface Project {
  _id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  deadline: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectInput = {
  title: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  deadline: string;
};
