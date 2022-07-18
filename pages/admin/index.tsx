import { NextPage } from 'next'
import React from 'react'
import { LayoutRoot } from '~/components/layout'
import Navigation from '~/components/layout/navigation'
import TableAdmin from '~/components/ui/table/table-admin'
import { requireAuth } from '~/lib/requireAuth'

const Index: NextPage = () => {
  return (
    <LayoutRoot>
      <Navigation 
        navigationTitle={'Table List Shorten'} 
        breadcrumbs={[
          {title: 'Admin', href:'/admin', isCurrent: true}
        ]}
      />
      <TableAdmin />
    </LayoutRoot>
  )
}

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default Index
