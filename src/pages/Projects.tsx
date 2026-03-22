import ProjectCard from '@/components/ui/ProjectCard'
import { useProjects } from '@/hooks/useGitHubContent'

export default function Projects() {
  const { projects, loading, error } = useProjects()

  return (
    <main className="max-w-5xl mx-auto px-6 pt-28 pb-16">
      <h1 className="text-3xl md:text-5xl font-bold mb-3">
        Work &amp; <span className="text-gradient">Projects</span>
      </h1>
      <p className="text-[var(--color-muted)] mb-12 max-w-xl">
        A selection of things I've built — experiments, tools, and shipped products.
      </p>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass rounded-xl aspect-[4/3] animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <div
          className="glass rounded-xl p-6 text-sm"
          style={{ color: 'var(--color-muted)', borderColor: 'rgba(255,80,80,0.2)' }}
        >
          <p className="font-medium text-white mb-1">Couldn't load projects</p>
          <p>{error}</p>
          <p className="mt-2 text-xs">
            Make sure <code>VITE_CONTENT_REPO_OWNER</code> and{' '}
            <code>VITE_CONTENT_REPO_NAME</code> are set in <code>.env.local</code>.
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </main>
  )
}
