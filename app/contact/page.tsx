'use client'

import { useState } from 'react'
import { PageTitleBand } from '@/components/layout/PageTitleBand'

export default function ContactPage() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setSent(false)
    
    // Simulate network request
    setTimeout(() => {
      setSending(false)
      setSent(true)
      ;(e.target as HTMLFormElement).reset()
    }, 800)
  }

  return (
    <>
      <PageTitleBand
        title="Contact Us"
        breadcrumbs={[{ label: 'Contact' }]}
        description="Tell us about your project. We respond within one business day."
      />

      <section aria-label="Contact" className="bg-white py-[96px]">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[56px] items-start">
          
          {/* Info panel */}
          <div className="flex flex-col gap-[20px]">
            <div className="bg-surface border border-hairline rounded-card p-[28px]">
              <h3 className="font-display font-bold text-[17px] text-ink mb-[10px]">Registered Office</h3>
              <p className="text-[15px] leading-[1.7] text-body m-0">
                7-8-9, Millenium Arcade, Opp. SVM Engineering College, Old National Highway No 8, Bharuch - 392 002, Gujarat, INDIA
              </p>
            </div>
            
            <div className="bg-surface border border-hairline rounded-card p-[28px]">
              <h3 className="font-display font-bold text-[17px] text-ink mb-[12px]">Phone</h3>
              <div className="flex flex-col gap-[8px]">
                <a href="tel:+919879100355" className="text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors">
                  +91 98791 00355
                </a>
                <a href="tel:+912642262355" className="text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors">
                  +91 264 226 2355
                </a>
              </div>
            </div>
            
            <div className="bg-surface border border-hairline rounded-card p-[28px]">
              <h3 className="font-display font-bold text-[17px] text-ink mb-[12px]">Email</h3>
              <div className="flex flex-col gap-[8px]">
                <a href="mailto:business@bdbuildcon.com" className="text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors">
                  business@bdbuildcon.com
                </a>
                <a href="mailto:info@bdbuildcon.com" className="text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors">
                  info@bdbuildcon.com
                </a>
              </div>
            </div>
            
            <div className="bg-surface border border-hairline rounded-card p-[28px]">
              <h3 className="font-display font-bold text-[17px] text-ink mb-[10px]">Office Hours</h3>
              <p className="text-[15px] leading-[1.7] text-body m-0">
                Monday – Saturday<br />9:00 AM – 6:00 PM IST
              </p>
            </div>
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSubmit}
            className="bg-white border border-hairline rounded-card shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)] p-[36px] flex flex-col gap-[20px]"
          >
            <h2 className="font-display font-bold text-[24px] text-ink m-0 mb-[4px]">Send an Enquiry</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              <div>
                <label htmlFor="c-name" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]">
                  Name <span className="text-[#E23A2E]">*</span>
                </label>
                <input 
                  id="c-name" 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="Your full name" 
                  className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]">
                  Email <span className="text-[#E23A2E]">*</span>
                </label>
                <input 
                  id="c-email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="your.email@example.com" 
                  className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              <div>
                <label htmlFor="c-company" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]">
                  Company
                </label>
                <input 
                  id="c-company" 
                  name="company" 
                  type="text" 
                  placeholder="Your company name" 
                  className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="c-phone" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]">
                  Phone
                </label>
                <input 
                  id="c-phone" 
                  name="phone" 
                  type="tel" 
                  placeholder="+91 XXX XXX XXXX" 
                  className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              <div>
                <label htmlFor="c-sector" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]">
                  Sector
                </label>
                <select 
                  id="c-sector" 
                  name="sector" 
                  className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink appearance-auto focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                >
                  <option>Select sector</option>
                  <option>Chemicals</option>
                  <option>Pharma</option>
                  <option>Petroleum</option>
                  <option>Fertiliser</option>
                  <option>Glass</option>
                  <option>Tyre</option>
                  <option>Food Processing</option>
                  <option>Residential</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="c-type" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]">
                  Project Type
                </label>
                <select 
                  id="c-type" 
                  name="projectType" 
                  className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink appearance-auto focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                >
                  <option>Select type</option>
                  <option>Greenfield Plant</option>
                  <option>Plant Expansion</option>
                  <option>PEB Structure</option>
                  <option>Piping &amp; Mechanical</option>
                  <option>Civil Works</option>
                  <option>Roads &amp; Earthwork</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="c-message" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]">
                Message <span className="text-[#E23A2E]">*</span>
              </label>
              <textarea 
                id="c-message" 
                name="message" 
                rows={5} 
                required 
                placeholder="Brief project description — scope, location, timeline..." 
                className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink resize-y focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
              ></textarea>
            </div>
            
            <div className="flex items-center gap-[16px]">
              <button 
                type="submit" 
                disabled={sending}
                className="bg-teal text-white border-none cursor-pointer font-body text-[13px] font-semibold uppercase tracking-[0.1em] px-[36px] py-[15px] rounded-full transition-colors hover:bg-teal/90 disabled:opacity-70"
              >
                {sending ? 'Sending...' : 'Send Enquiry'}
              </button>
              
              {sent && (
                <span className="text-[14px] text-[#0C7A88] font-medium">
                  ✓ Enquiry sent — we&apos;ll get back to you shortly.
                </span>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Map placeholder */}
      <section aria-label="Map" className="bg-surface border-t border-hairline">
        <div 
          className="h-[320px] flex items-center justify-center bg-[#EFF3F4]" 
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EFF3F4 0 16px, #E6ECEE 16px 32px)' }}
        >
          <a 
            href="https://maps.google.com/?q=Millenium+Arcade+Bharuch" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-mono text-[13px] text-body bg-white border border-hairline rounded-[8px] px-[18px] py-[10px] hover:border-teal transition-colors"
          >
            📍 Open location in Google Maps — Bharuch, Gujarat
          </a>
        </div>
      </section>
    </>
  )
}
