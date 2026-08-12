'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import {
  ProjectFilters,
  type SortOption,
} from '@/components/projects/ProjectFilters';
import { Pagination } from '@/components/projects/Pagination';
import type { ProjectStatus } from '@/types/project';
import Link from 'next/link';

const priorityWeight = { Low: 1, Medium: 2, High: 3 };
const PAGE_SIZE = 6;

export default function ProjectsPage() {
  const { projects, loading, error, deleteProject } = useProjects();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'All'>(
    'All',
  );
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [page, setPage] = useState(1);

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (search.trim()) {
      const term = search.trim().toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(term));
    }

    if (statusFilter !== 'All') {
      result = result.filter((p) => p.status === statusFilter);
    }

    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return b.createdAt.localeCompare(a.createdAt);
        case 'oldest':
          return a.createdAt.localeCompare(b.createdAt);
        case 'deadline':
          return a.deadline.localeCompare(b.deadline);
        case 'priority':
          return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
    });

    return result;
  }, [projects, search, statusFilter, sortOption]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, sortOption]);

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteProject(id);
    },
    [deleteProject],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PAGE_SIZE),
  );
  const pagedProjects = filteredProjects.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  if (loading) return <p>Loading projects…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <Link
        href="/projects/create"
        className="mb-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        New Project
      </Link>

      <ProjectFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pagedProjects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
