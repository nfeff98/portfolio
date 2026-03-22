import { useState, useRef, type FormEvent } from 'react'
import { sendContactEmail, type ContactFormData } from '@/lib/email'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const data: ContactFormData = {
      name:    (fd.get('name')    as string).trim(),
      email:   (fd.get('email')   as string).trim(),
      message: (fd.get('message') as string).trim(),
    }

    try {
      await sendContactEmail(data)
      setStatus('success')
      formRef.current?.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(String(err))
    }
  }

  return (
    <main className="max-w-xl mx-auto px-6 pt-28 pb-16">
      <h1 className="text-3xl md:text-5xl font-bold mb-3">
        Get in <span className="text-gradient">touch</span>
      </h1>
      <p className="text-[var(--color-muted)] mb-10">
        Have a project in mind or just want to say hi? Send me a message.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="text-sm text-[var(--color-muted)] block mb-1.5">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="w-full glass rounded-lg px-4 py-3 text-sm text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm text-[var(--color-muted)] block mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className="w-full glass rounded-lg px-4 py-3 text-sm text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition"
          />
        </div>

        <div>
          <label htmlFor="message" className="text-sm text-[var(--color-muted)] block mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="What's on your mind?"
            className="w-full glass rounded-lg px-4 py-3 text-sm text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100"
          style={{
            background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))',
          }}
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'success' && (
          <p className="text-sm text-emerald-400">
            Message sent! I'll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-400">
            Something went wrong: {errorMsg}
          </p>
        )}
      </form>
    </main>
  )
}
