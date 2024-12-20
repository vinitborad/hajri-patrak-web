import { Suspense } from 'react'
import ForgotPassword from './ForgotPassword' // This is the client component

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPassword />
    </Suspense>
  )
}
