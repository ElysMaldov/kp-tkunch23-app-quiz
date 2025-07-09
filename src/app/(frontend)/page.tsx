import SignOut from '@/components/SignOut'
import config from '@/payload.config'
import { headers as nextHeaders } from 'next/headers'
import { getPayload } from 'payload'

export default async function HomePage() {
  const headers = await nextHeaders()
  const payload = await getPayload({ config })

  const result = await payload.auth({ headers, canSetHeaders: false })

  if (result.user) {
    return <SignOut user={result.user} />
  }

  return <p>Home</p>
}
