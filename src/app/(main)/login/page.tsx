import LoginForm from '@/components/auth/login-form'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 to-black'>
      <LoginForm />
    </div>
  )
}

export default LoginPage