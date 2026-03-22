/**
 * Configuration for the content GitHub repo.
 *
 * Set these in .env.local:
 *   VITE_CONTENT_REPO_OWNER=your-github-username
 *   VITE_CONTENT_REPO_NAME=portfolio-content
 *   VITE_CONTENT_REPO_BRANCH=main
 *
 * The content repo structure expected:
 *   projects/
 *     index.json          ← array of Project metadata
 *     my-project/
 *       content.md        ← markdown body
 *       assets.json       ← array of ProjectAsset
 */

const OWNER = import.meta.env.VITE_CONTENT_REPO_OWNER ?? ''
const REPO  = import.meta.env.VITE_CONTENT_REPO_NAME  ?? 'portfolio-content'
const BRANCH = import.meta.env.VITE_CONTENT_REPO_BRANCH ?? 'main'

function rawUrl(path: string): string {
  return `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`
}

export const contentRepo = { OWNER, REPO, BRANCH, rawUrl }
