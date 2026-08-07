import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import mongoose from 'mongoose';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { projectInputSchema } from '@/lib/projectSchema';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: 'Invalid project id' },
      { status: 400 },
    );
  }

  await connectDB();
  const project = await Project.findOne({
    _id: id,
    createdBy: session.user.id,
  }).lean();
  if (!project) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json({ project });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: 'Invalid project id' },
      { status: 400 },
    );
  }

  const body = await request.json();
  const parsed = projectInputSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  await connectDB();
  const project = await Project.findOneAndUpdate(
    { _id: id, createdBy: session.user.id },
    { $set: parsed.data },
    { new: true, runValidators: true },
  );
  if (!project) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json({ project });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: 'Invalid project id' },
      { status: 400 },
    );
  }

  await connectDB();
  const project = await Project.findOneAndDelete({
    _id: id,
    createdBy: session.user.id,
  });
  if (!project) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Project deleted' });
}
