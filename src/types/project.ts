export interface Project {
  slug: string
  title: string
  tagline: string
  tags: string[]
  thumbnailUrl: string
  date: string
  featured: boolean
}

export interface ProjectContent {
  meta: Project
  body: string // raw markdown
  assets: ProjectAsset[]
}

export interface ProjectAsset {
  name: string
  url: string
  type: 'image' | 'model' | 'video' | 'other'
}
