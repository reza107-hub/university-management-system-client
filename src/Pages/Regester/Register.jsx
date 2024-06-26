import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import useAuth from '../../Hooks/useAuth'
import GoogleSignIn from '../Shared/GoogleSignIn/GoogleSignIn'
import Swal from 'sweetalert2'
import GetHostUrl from '../../Components/GetHostUrl/GetHostUrl'
import { useCreateUserMutation } from '../../Redux/features/User/UserApi'

const Register = () => {
  const { createUser, updateUserProfile, verifyEmail } = useAuth()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const navigate = useNavigate()
  const [createUserToDB] = useCreateUserMutation()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      Swal.fire({
        title: 'wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })
      const imageUrl = await GetHostUrl(data.photo[0])
      const resFromFirebase = await createUser(data.email, data.password)
      if (resFromFirebase) {
        updateUserProfile(data.name, imageUrl)
        verifyEmail()
        const res = await createUserToDB({ email: data.email }).unwrap()
        Swal.fire({
          title: `${res.message}
          Check your email for verification email address
          `,
          icon: 'success',
        })
        navigate('/login')
      }
    } catch (error) {
      Swal.fire({
        title: error?.data?.message,
        text: error?.data?.errorMessage,
        icon: 'error',
      })
    }
  }

  const password = watch('password')
  const confirmPassword = watch('confirmPassword')
  const passwordMismatch = password !== confirmPassword

  return (
    <div className="py-32 flex justify-center">
      <div className="form-container w-[90%] md:w-[30%] bg-primary rounded-lg p-8 text-white">
        <p className="text-center text-2xl font-bold">Sign Up</p>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="input-groups">
            <label htmlFor="name">Name</label>
            <input
              {...register('name', { required: true })}
              type="text"
              name="name"
              id="name"
              placeholder=""
            />
            {errors.name && (
              <span className="text-accent">This field is required</span>
            )}
          </div>
          <div className="input-groups">
            <label htmlFor="email">Email</label>
            <input
              {...register('email', { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder=""
            />
            {errors.email && (
              <span className="text-accent">This field is required</span>
            )}
          </div>

          <div className="input-groups ">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                {...register('password', {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                })}
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder=""
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <span className="text-accent">This field is required</span>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-accent">Password must be 6 characters</p>
            )}
            {errors.password?.type === 'pattern' && (
              <p className="text-red-600">
                Password must have one Uppercase, and one special character.
              </p>
            )}
          </div>
          <div className="input-groups">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                {...register('confirmPassword', {
                  required: true,
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                placeholder=""
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-accent">This field is required</span>
            )}
            {passwordMismatch && (
              <span className="text-red-600">Passwords do not match</span>
            )}
          </div>
          <div className="input-groups">
            <label htmlFor="photo">Photo</label>
            <input
              {...register('photo', { required: true })}
              className="inpdddut"
              name="photo"
              id="photo"
              type="file"
              accept=".png, .jpg, .jpeg"
            />
            {errors.photo && (
              <span className="text-accent">This field is required</span>
            )}
          </div>
          <div className="flex justify-center mt-5">
            <button className="login">Sign Up</button>
          </div>
        </form>
        <div className="social-message">
          <div className="line"></div>
          <p className="message">Login with social accounts</p>
          <div className="line"></div>
        </div>
        <GoogleSignIn />
        <p className="signup">
          Already have an account?
          <Link
            rel="noopener noreferrer"
            to={'/login'}
            className="link link-hover link-accent"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
