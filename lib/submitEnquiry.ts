export type EnquiryResult = { ok: boolean; error?: string }

// Native <select> placeholder options ("Select sector") have no `value` attribute,
// so their implicit value is their text — treat that as "nothing chosen."
function cleanField(value: FormDataEntryValue | null): string | undefined {
  const str = value?.toString().trim()
  if (!str || str.startsWith('Select ')) return undefined
  return str
}

/**
 * Submits a contact/enquiry <form> to /api/contact. Shared by the Home quick-enquiry
 * form and the Contact page form, which use the same field names but neither collects
 * a "subject" — the API requires one, so it's synthesized from the project type.
 */
export async function submitEnquiry(form: HTMLFormElement): Promise<EnquiryResult> {
  const fd = new FormData(form)
  const projectType = cleanField(fd.get('projectType'))

  const payload = {
    name: cleanField(fd.get('name')),
    email: cleanField(fd.get('email')),
    phone: cleanField(fd.get('phone')),
    company: cleanField(fd.get('company')),
    sector: cleanField(fd.get('sector')),
    projectType,
    message: cleanField(fd.get('message')),
    subject: cleanField(fd.get('subject')) ?? (projectType ? `Enquiry — ${projectType}` : 'Website Enquiry'),
    website: fd.get('website')?.toString() ?? '',
  }

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      return {
        ok: false,
        error:
          res.status === 429
            ? 'Too many attempts — please try again in a minute.'
            : 'Something went wrong. Please try again or call us directly.',
      }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error — please check your connection and try again.' }
  }
}
