import { Schema, models, model } from 'mongoose';

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    deadline: { type: Date, required: true },
    createdBy: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

export const Project = models.Project || model('Project', projectSchema);
