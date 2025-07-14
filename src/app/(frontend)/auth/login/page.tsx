import LoginForm from '@/components/LoginForm'
import { authorizeUser } from '@/lib/actions/authorize-user'
import { redirect } from 'next/navigation'

export interface PageProps {}

const Page = async ({}: PageProps) => {
  const result = await authorizeUser()

  if (result.user) {
    redirect('/')
  } else {
    return <LoginForm />
  }
}

export default Page
