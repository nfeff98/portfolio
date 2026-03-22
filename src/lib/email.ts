import emailjs from '@emailjs/browser'

/**
 * Set in .env.local:
 *   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
 *   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
 *   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
 */

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? ''

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS env vars not configured. See .env.local.example')
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name:    data.name,
      from_email:   data.email,
      message:      data.message,
    },
    PUBLIC_KEY,
  )
}
