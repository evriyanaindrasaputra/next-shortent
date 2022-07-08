import React from 'react'
import { useForm } from 'react-hook-form'
import { createSlug } from '~/server/schema/shorten.schema'
import { trpc } from '~/lib/trpc'

const FormShorten: React.FC = () => {
  const originURL = window.location.origin
  const { register, formState: { errors }, handleSubmit } = useForm<createSlug>()
  const { mutate, error } = trpc.useMutation(['shorten.create-slug'])

  function onSubmit(values: createSlug) {
    mutate(values)
  }
  return (
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
          {...register('slug', {required: true})}
        />
      </div>
      <div className="flex">
        <label htmlFor="url" className='label__shortent'>Your URL</label>
        <input 
          type='text' placeholder='Enter your URL' 
          autoComplete='false'
          className='field__shortent'
          {...register('url', {required: true})}
        />
      </div>
      <div className='flex'>
        <label htmlFor="maxVisit" className='label__shortent'  >Your limit visit time</label>
        <input 
          type='text' placeholder='Enter your limit visit time' 
          autoComplete='false'
          className='field__shortent'
          {...register('maxVisit', {required: true})}
        />
      </div>
      <button 
        type="submit" 
        className='py-2 w-full px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
      >
        Create
      </button>
    </form>
  )
}

export default FormShorten
