import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { projectInputSchema } from '@/lib/projectSchema';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  const projects = await Project.find({ createdBy: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = projectInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  await connectDB();

  const project = await Project.create({
    ...parsed.data,
    createdBy: session.user.id,
  });

  return NextResponse.json({ project }, { status: 201 });
}
