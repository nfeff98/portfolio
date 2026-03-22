import { useParams, Link } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { useProject } from '@/hooks/useGitHubContent'
import type { ProjectAsset } from '@/types/project'

const ModelViewer = lazy(() => import('@/canvas/ModelViewer'))

function AssetGallery({ assets }: { assets: ProjectAsset[] }) {
  const images  = assets.filter((a) => a.type === 'image')
  const models  = assets.filter((a) => a.type === 'model')

  return (
    <div className="mt-12 space-y-8">
      {images.length > 0 && (
        <div>
          <h3 className="text-sm uppercase tracking-widest text-[var(--color-muted)] mb-4">
            Gallery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img) => (
              <img
                key={img.url}
                src={img.url}
                alt={img.name}
                className="rounded-xl w-full object-cover glass"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}

      {models.length > 0 && (
        <div>
          <h3 className="text-sm uppercase tracking-widest text-[var(--color-muted)] mb-4">
            3D Models
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {models.map((model) => (
              <div key={model.url} className="glass rounded-xl overflow-hidden aspect-square">
                <Suspense fallback={<div className="w-full h-full animate-pulse" />}>
                  <ModelViewer url={model.url} />
                </Suspense>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProjectDetail() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { content, loading, error } = useProject(slug)

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <div className="h-8 w-48 glass rounded-lg animate-pulse mb-4" />
        <div className="h-4 w-full glass rounded animate-pulse mb-2" />
        <div className="h-4 w-3/4 glass rounded animate-pulse" />
      </main>
    )
  }

  if (error || !content) {
    return (
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <Link to="/projects" className="text-sm text-[var(--color-muted)] hover:text-white mb-8 inline-block">
          ← Back to projects
        </Link>
        <p className="text-[var(--color-muted)]">{error ?? 'Project not found.'}</p>
      </main>
    )
  }

  const { meta, body, assets } = content

  return (
    <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
      <Link to="/projects" className="text-sm text-[var(--color-muted)] hover:text-white mb-10 inline-block transition-colors">
        ← Back to projects
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {meta.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(124,110,245,0.12)',
              color: 'var(--color-accent)',
              border: '1px solid rgba(124,110,245,0.2)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-4">{meta.title}</h1>
      <p className="text-lg text-[var(--color-muted)] mb-8">{meta.tagline}</p>

      {/* Markdown body — rendered as raw HTML from a markdown parser */}
      <MarkdownBody markdown={body} />

      <AssetGallery assets={assets} />
    </main>
  )
}

// Simple markdown renderer — replace with react-markdown if you need richer output
function MarkdownBody({ markdown }: { markdown: string }) {
  return (
    <article
      className="prose prose-invert max-w-none leading-relaxed"
      dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
    />
  )
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hpuol])(.+)$/gm, '<p>$1</p>')
}
