import React from 'react'
import { useForm } from 'react-hook-form'
import { LockClosedIcon } from '@heroicons/react/solid'
import { UserSchema } from '~/server/schema/user.schema'
import { signIn, signOut, useSession } from 'next-auth/react';


const FormLogin: React.FC = () => {
  // const { data: session } = useSession();
  // console.log(session);
  const { register, formState: { errors }, handleSubmit } = useForm<UserSchema>()
  async function onSubmit(values : UserSchema) {
    await signIn('credentials', {...values, callbackUrl: '/admin'})
    
    // mutate(values)
  }
  return (
    <div className='bg-white bg-opacity-60 backdrop-blur-xl p-5 rounded space-y-8'>
      <div>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              {...register("email", { required: true, })}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" aria-hidden="true" />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormLogin
