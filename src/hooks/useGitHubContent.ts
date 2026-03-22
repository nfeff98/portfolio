import { useState, useEffect } from 'react'
import { contentRepo } from '@/lib/contentRepo'
import type { Project, ProjectContent, ProjectAsset } from '@/types/project'

// ── Project listing ────────────────────────────────────────────────────────────

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(contentRepo.rawUrl('projects/index.json'))
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<Project[]>
      })
      .then(setProjects)
      .catch((e: unknown) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading, error }
}

// ── Single project ─────────────────────────────────────────────────────────────

export function useProject(slug: string) {
  const [content, setContent] = useState<ProjectContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const base = `projects/${slug}`

    Promise.all([
      fetch(contentRepo.rawUrl(`${base}/content.md`)).then((r) => {
        if (!r.ok) throw new Error(`content.md: HTTP ${r.status}`)
        return r.text()
      }),
      fetch(contentRepo.rawUrl('projects/index.json'))
        .then((r) => r.json() as Promise<Project[]>)
        .then((list) => {
          const meta = list.find((p) => p.slug === slug)
          if (!meta) throw new Error(`No project with slug "${slug}"`)
          return meta
        }),
      fetch(contentRepo.rawUrl(`${base}/assets.json`))
        .then((r) => (r.ok ? (r.json() as Promise<ProjectAsset[]>) : ([] as ProjectAsset[])))
        .catch(() => [] as ProjectAsset[]),
    ])
      .then(([body, meta, assets]) => {
        setContent({ meta, body, assets })
      })
      .catch((e: unknown) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [slug])

  return { content, loading, error }
}
