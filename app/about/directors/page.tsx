import { redirect } from 'next/navigation'

// Desk of Directors has moved to the home page — this route is no longer active
export default function DirectorsPage() {
  redirect('/')
}
