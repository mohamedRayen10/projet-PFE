import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import OAuth from '../components/OAuth'
import NewsSwiper from "../components/NewsSwiper"

const SignUp = () => {

  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (step === 1) {
      if (!formData.username || !formData.email || !formData.tele) {
        return setErrorMessage("All fields are required!")
      }
      setStep(2)
      return
    }

    if (!formData.password) {
      return setErrorMessage("Password is required!")
    }

    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success === false) {
        setLoading(false)
        return setErrorMessage(data.message)
      }

      setLoading(false)

      if (res.ok) {
        navigate("/PaymentPage")
      }

    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all">
      <div className="relative bg-gradient-to-b from-red-400 to-red-700 py-16 transition-all duration-700 ease-in-out">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold">Create an Account</h1>
          <p className="mt-4 text-xl">Join us and get started with all features</p>
        </div>
      </div>

      <div className="flex justify-center mt-12 px-4">
        <div className="max-w-7xl w-full flex gap-10">
          <div className="w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-red-600 dark:text-white">Why Join Us?</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center">
                <span className="text-red-600 dark:text-red-400">✔</span>
                <span className="ml-2 text-gray-800 dark:text-gray-300">Get access to exclusive content</span>
              </li>
              <li className="flex items-center">
                <span className="text-red-600 dark:text-red-400">✔</span>
                <span className="ml-2 text-gray-800 dark:text-gray-300">Receive regular updates</span>
              </li>
              <li className="flex items-center">
                <span className="text-red-600 dark:text-red-400">✔</span>
                <span className="ml-2 text-gray-800 dark:text-gray-300">Connect with a great community</span>
              </li>
            </ul>
          </div>

          <div className="w-2/3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div>
                    <Label value="Votre nom d’utilisateur" className="text-gray-800 dark:text-gray-300" />
                    <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} required className="focus:ring-red-500" />
                  </div>

                  <div>
                    <Label value="Votre E-mail" className="text-gray-800 dark:text-gray-300" />
                    <TextInput type="email" placeholder="nomprenom@gmail.com" id="email" onChange={handleChange} required className="focus:ring-red-500" />
                  </div>

                  <div>
                    <Label value="Votre Numero De Telephone" className="text-gray-800 dark:text-gray-300" />
                    <TextInput type="tel" placeholder="+216-123-123-123" id="tele" onChange={handleChange} required className="focus:ring-red-500" />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <Label value="Mot De Passe" className="text-gray-800 dark:text-gray-300" />
                    <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} required className="focus:ring-red-500" />
                  </div>
                </>
              )}

              <Button gradientDuoTone="redToOrange" type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (step === 1 ? "Next" : "Sign Up")}
              </Button>
            </form>

            <div className="mt-6">
              <OAuth />
            </div>

            <div className="mt-4 text-center text-sm">
              <span className="text-gray-800 dark:text-gray-300">Already have an account?</span>
              <Link to="/sign-in" className="text-red-500 hover:underline">Sign In</Link>
            </div>

            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
