import { NextPage } from 'next'
import React from 'react'
import { LayoutRoot } from '~/components/layout'
import FormLogin from '~/components/ui/forms/form-login'

const login : NextPage = () => {
  return (
    <LayoutRoot>
      <div className='min-h-screen flex items-center justify-center'>
        <FormLogin />
      </div>
    </LayoutRoot>
  )
}

export default login
