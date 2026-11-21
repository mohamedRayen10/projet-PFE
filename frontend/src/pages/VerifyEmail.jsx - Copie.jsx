// src/pages/VerifyEmail.jsx
const VerifyEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center p-10 bg-white dark:bg-gray-800 rounded shadow-md">
        <h1 className="text-3xl font-bold text-red-600 dark:text-white">Check Your Email</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          We've sent a verification link to your email address. Please verify to activate your account.
        </p>
      </div>
    </div>
  )
}

export default VerifyEmail
