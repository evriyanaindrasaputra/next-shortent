import { NextPage } from 'next'
import React from 'react'
import { LayoutRoot } from '~/components/layout'
import TableAdmin from '~/components/ui/table/table-admin'

const Index : NextPage = () => {
  return (
    <LayoutRoot>
      <TableAdmin />
    </LayoutRoot>
  )
}

export default Index
