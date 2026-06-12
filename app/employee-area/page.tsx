import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { employeeLinks } from '@/content/links'

export const metadata: Metadata = {
  title: 'Employee Area',
  description: 'Staff access portal for BD Buildcon LLP — ERP and email login.',
}

const portals = [
  {
    label: 'ERP Login',
    href: employeeLinks.erp,
    description: 'Access the Enterprise Resource Planning system for project management, timesheets, and reporting.',
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        <rect x="2" y="3" width="20" height="18" rx="2" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'Email Login',
    href: employeeLinks.email,
    description: 'Access your company email account for internal communications.',
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
]

export default function EmployeeAreaPage() {
  return (
    <>
      <PageTitleBand
        title="Employee Area"
        breadcrumbs={[{ label: 'Employee Area' }]}
        description="Staff access — please use your company credentials to log in."
      />

      <section className="section-pad bg-surface">
        <div className="container-max max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {portals.map((portal) => (
              <a
                key={portal.label}
                href={portal.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-6 bg-white rounded-card border border-hairline shadow-card p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover hover:border-teal/30"
              >
                <div className="w-20 h-20 rounded-full bg-teal flex items-center justify-center group-hover:bg-teal-hover transition-colors duration-300">
                  {portal.icon}
                </div>
                <div>
                  <h2 className="font-display text-headline-sm text-ink mb-2">{portal.label}</h2>
                  <p className="font-body text-body-md text-body leading-relaxed">{portal.description}</p>
                </div>
                <div className="flex items-center gap-2 font-body text-label-md text-teal uppercase tracking-wider">
                  Login
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-10 text-center font-body text-body-md text-body">
            Having trouble accessing your account?{' '}
            <a href="mailto:it@bdbuildcon.com" className="text-teal hover:underline">
              Contact IT Support
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
