import { z } from 'zod';

export const projectInputSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(120),
  description: z.string().trim().max(2000).optional().default(''),
  status: z.enum(['Pending', 'In Progress', 'Completed']),
  priority: z.enum(['Low', 'Medium', 'High']),
  deadline: z.string().min(1, 'Deadline is required'),
});
