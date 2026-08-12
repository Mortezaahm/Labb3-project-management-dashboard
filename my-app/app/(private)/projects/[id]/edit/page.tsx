import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { EditProjectClient } from './EditProjectClient';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) notFound();
  if (!mongoose.isValidObjectId(id)) notFound();

  await connectDB();
  const project = await Project.findOne({
    _id: id,
    createdBy: session.user.id,
  }).lean();
  if (!project) notFound();

  return <EditProjectClient project={JSON.parse(JSON.stringify(project))} />;
}
