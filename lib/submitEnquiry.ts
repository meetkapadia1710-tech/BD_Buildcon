export type EnquiryResult = { ok: boolean; error?: string }

// Placeholder <option>s carry an explicit value="" so an unchosen select submits an
// empty string. Anything empty (or whitespace-only) means "nothing entered."
//
// This used to also discard values starting with "Select ", back when the placeholder
// options had no value attribute and submitted their own label. That heuristic ate
// legitimate input — a message beginning "Select the best option for..." was silently
// dropped, then failed the API's min-length check as a generic error.
function cleanField(value: FormDataEntryValue | null): string | undefined {
  const str = value?.toString().trim()
  return str ? str : undefined
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
