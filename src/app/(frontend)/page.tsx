import SignOut from '@/components/SignOut'
import { authorizeUser } from '@/lib/actions/authorize-user'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const result = await authorizeUser()

  if (result.user) {
    return <SignOut user={result.user} />
  } else {
    redirect('/auth/login')
  }
}
