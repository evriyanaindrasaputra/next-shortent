import React from 'react'
import { useForm } from 'react-hook-form'
import { createSlug } from '~/server/schema/shorten.schema'
import { trpc } from '~/lib/trpc'
import { Transition } from '@headlessui/react'
import { classNames } from '~/lib/classname'

const FormShorten: React.FC = () => {
  const originURL = window.location.origin
  const [showError, setShowError] = React.useState<boolean>(false)
  const [showSuccess, setShowSuccess] = React.useState<boolean>(false)
  const { register, formState: { errors }, handleSubmit } = useForm<createSlug>()
  const { mutate, isLoading, error } = trpc.useMutation(['shorten.create-slug'], {
    onError: (error) => {
      setShowError(true)
    },
    onSuccess: (data) => {
      console.log(data)
      setShowSuccess(true)
    }
  })

  function onSubmit(values: createSlug) {
    mutate(values)
  }
  return (
    <div className='flex flex-col'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white bg-opacity-30 backdrop-blur-xl rounded p-5 space-y-4"
      >
        <h2 className=' text-3xl text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-rose-400 '>Create Your Shorten</h2>
        <div className="flex ">
          <label htmlFor='slug' className='label__shortent'>{originURL}</label>
          <input
            type='text' placeholder='Enter your shorten'
            autoComplete='false'
            className="field__shortent"
            {...register('slug', { required: true })}
          />
        </div>
        <div className="flex">
          <label htmlFor="url" className='label__shortent'>Your URL</label>
          <input
            type='text' placeholder='Enter your URL'
            autoComplete='false'
            className='field__shortent'
            {...register('url', { required: true })}
          />
        </div>
        <div className='flex'>
          <label htmlFor="maxVisit" className='label__shortent'  >Your limit visit time</label>
          <input
            type='number' placeholder='Enter your limit visit time'
            autoComplete='false'
            className='field__shortent'
            {...register('maxVisit', { required: true, valueAsNumber: true, min: 1 })}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading ? true : false}
          className={classNames(isLoading ? 'animate-pulse' : '', 'py-2 w-full px-4 border transition disabled:transform-none disabled:transition-none disabled:bg-emerald-600 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500')}
        >
          {isLoading ?
            <span>
              <svg role="status" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              Loading....
            </span>
            :
            <span>
              Create
            </span>
          }
        </button>
      </form>
      <Transition
        show={showError}
        enter="transition-all ease-out duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="p-4 text-sm  bg-red-200  rounded-lg mt-2" role="alert">
          <span>
            {error?.message}, try again
          </span>
        </div>
      </Transition>
    </div>
  )
}

export default FormShorten
