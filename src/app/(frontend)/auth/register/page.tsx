import RegistrationForm from '@/components/registration-form'
import { authorizeUser } from '@/lib/actions/authorize-user'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const result = await authorizeUser()

  if (result.user) {
    redirect('/')
  } else {
    return <RegistrationForm />
  }
}
