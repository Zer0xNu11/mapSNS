import RegisterForm from "@/components/auth/register-form"

const RegisterPage = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 to-black'>
      <RegisterForm />
    </div>
      
  )
}

export default RegisterPage