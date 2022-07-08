import type { NextPage } from 'next'
import React from 'react'
import dynamic from 'next/dynamic'
import { LayoutRoot } from '~/components/layout'

const FormShorten = dynamic(() => import('~/components/ui/forms/form-shorten'), {
  ssr: false
})

const Home: NextPage = () => {
  return (
    <LayoutRoot>
      <div className=' w-full min-h-screen flex items-center justify-center'>
        <React.Suspense>
          <FormShorten />
        </React.Suspense>
      </div>
    </LayoutRoot>
  )
}

export default Home
