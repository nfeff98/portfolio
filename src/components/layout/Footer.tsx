export default function Footer() {
  return (
    <footer
      className="mt-32 border-t py-8 px-6 text-center"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
        Built with React, Three.js &amp; GLSL —{' '}
        <a
          href="https://github.com/nfeffer"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          @nfeffer
        </a>
      </p>
    </footer>
  )
}
