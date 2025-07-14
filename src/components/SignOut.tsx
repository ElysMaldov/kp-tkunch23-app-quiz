'use client'

import { Button } from '@/components/ui/button'
import { signout } from '@/lib/actions/signout'
import { User } from '@/payload-types'
import { useRouter } from 'next/navigation'

const SignOut = (props: { user: User }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col">
      <p>{props.user.email}</p>
      <Button
        onClick={async () => {
          await signout()
          router.refresh()
        }}
      >
        Sign Out
      </Button>
    </div>
  )
}

export default SignOut
