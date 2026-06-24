'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Please provide more detail (min 10 characters)'),
  // Honeypot — hidden from users, catches bots. Leave empty.
  website: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const router = useRouter()
  const [sending, setSending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send message')
      router.push('/thank-you')
    } catch {
      toast.error('Something went wrong. Please try again or call us directly.')
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      {/* Honeypot — hidden from users, catches bots. Leave empty. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register('website')}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block font-body text-label-md text-ink uppercase tracking-wider mb-2">
            Name <span className="text-brand-red">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            {...register('name')}
            className="form-field"
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-brand-red font-body">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block font-body text-label-md text-ink uppercase tracking-wider mb-2">
            Email <span className="text-brand-red">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register('email')}
            className="form-field"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-brand-red font-body">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block font-body text-label-md text-ink uppercase tracking-wider mb-2">
          Phone Number
        </label>
        <input id="phone" type="tel" placeholder="+91 XXX XXX XXXX" {...register('phone')} className="form-field" />
      </div>

      <div>
        <label htmlFor="subject" className="block font-body text-label-md text-ink uppercase tracking-wider mb-2">
          Subject <span className="text-brand-red">*</span>
        </label>
        <input
          id="subject"
          type="text"
          placeholder="How can we help?"
          {...register('subject')}
          className="form-field"
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="mt-1.5 text-xs text-brand-red font-body">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block font-body text-label-md text-ink uppercase tracking-wider mb-2">
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Detail your project requirements here..."
          {...register('message')}
          className="form-field resize-y"
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-brand-red font-body">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* TODO: Integrate a real reCAPTCHA (e.g. Google reCAPTCHA v3 or hCaptcha) here */}

      <button
        type="submit"
        disabled={sending}
        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send Message
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}
