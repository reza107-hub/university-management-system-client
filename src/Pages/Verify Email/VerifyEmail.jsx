import useAuth from '../../Hooks/useAuth'
import { useState } from 'react'

const VerifyEmail = () => {
  const { verifyEmail, logOut } = useAuth()
  const [emailSent, setEmailSent] = useState(false)

  const handleVerifyEmail = () => {
    verifyEmail().then(() => {
      setEmailSent(true)
    })
  }

  const handleLogOut = () => {
    logOut()
    window.location.replace('/login')
  }

  return (
    <div className="flex justify-center text-center text-xl pt-36">
      <div>
        <h1>Please verify your email</h1>
        <p>
          We have sent you a verification link to your email. Please check your
          inbox and click on the link to verify your email address.
        </p>
        <p>
          If you have not received the email yet,
          <button onClick={handleVerifyEmail} className="text-red underline">
            Click Here
          </button>
        </p>
        <p className='mt-3'>
          <button onClick={handleLogOut} className="btn-primary">
            Sign Out
          </button>
        </p>
        {emailSent && (
          <p className="text-green-500">Verification email sent!</p>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
