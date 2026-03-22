import { Link } from 'react-router-dom'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group glass rounded-xl overflow-hidden hover:border-[var(--color-accent)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-video bg-[var(--color-surface)] overflow-hidden">
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-muted)]">
            <span className="text-4xl">◈</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-white mb-1 group-hover:text-gradient transition-all">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--color-muted)] mb-3 line-clamp-2">
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(124, 110, 245, 0.12)',
                color: 'var(--color-accent)',
                border: '1px solid rgba(124, 110, 245, 0.2)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
