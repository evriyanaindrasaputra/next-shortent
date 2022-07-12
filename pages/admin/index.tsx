import { NextPage } from 'next'
import React from 'react'
import { LayoutRoot } from '~/components/layout'
import Navigation from '~/components/layout/navigation'
import TableAdmin from '~/components/ui/table/table-admin'

const Index: NextPage = () => {
  return (
    <LayoutRoot>
      <Navigation 
        navigationTitle={'Shortent'} 
        breadcrumbs={[
          {title: 'Admin', href:'/admin', isCurrent: true}
        ]}
      />
      <TableAdmin />
    </LayoutRoot>
  )
}

export default Index
