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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center">
        <span>{originURL}</span>
        <input 
          type='text' placeholder='Enter your shorten' 
          {...register('slug', {required: true})}
        />
      </div>
      <div>
        <label htmlFor="url">Your URL</label>
        <input 
          type='text' placeholder='Enter your URL' 
          {...register('url', {required: true})}
        />
      </div>
      <div>
        <label htmlFor="maxVisit">Your limit visit time</label>
        <input 
          type='text' placeholder='Enter your limit visit time' 
          {...register('maxVisit', {required: true})}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default FormShorten
