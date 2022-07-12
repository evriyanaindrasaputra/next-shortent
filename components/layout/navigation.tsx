import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'

type BreadcrumbItem = {
  title: string
  href: string
  as?: string
  isCurrent?: boolean
}

type NavigationProps = {
  navigationTitle: string
  breadcrumbs?: BreadcrumbItem[]
}

const Navigation: React.FC<NavigationProps> = ({ navigationTitle, breadcrumbs }) => {
  return (
    <header className='p-4 bg-white bg-opacity-30 backdrop-blur sticky top-0 z-10 '>
      <div>
        <nav className='sm:hidden' aria-label='Back'>
          <Link href={'/'} className="flex items-center text-sm font-medium text-emerald-500">
            <ChevronLeftIcon
              className='h-5 w-5 text-emerald-400'
            />
          </Link>
        </nav>
        <nav className='hidden sm:flex '>
          <ol className='flex items-center space-x-4'>
            <li>
              <div className="flex">
                <Link href={'/'}>
                  <a className='text-sm font-medium text-emerald-500'>Home</a>
                </Link>
              </div>
            </li>
            {breadcrumbs?.map((item) => (
              <li key={item.href}>
                <div className="flex items-center">
                  <ChevronRightIcon className=" h-5 w-5 text-emerald-400" />
                  <Link href={item.href} as={item.as}>
                    <a
                      className='ml-4 text-sm font-medium text-emerald-500'
                      aria-current={item.isCurrent ? 'page' : undefined}
                    >
                      {item.title}
                    </a>
                  </Link>
                </div>
              </li>
            ))
            }
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-emerald-400 sm:text-3xl sm:truncate">
            {navigationTitle}
          </h2>
        </div>
      </div>
    </header>
  )
}

export default Navigation
