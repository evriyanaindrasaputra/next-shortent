import type { NextPage } from 'next'
import { trpc } from '~/lib/trpc'

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['shorten.all-slug'])
  if(isLoading){
    return <p>loading ....</p>
  }
  return (
    <div>
      <h1 className=' text-yellow-400 text-5xl'>
        {data?.map(item => (
          <span key={item.slug}>
            <a href={`/${item.slug}`}>{item.slug}</a>
          </span>
        ))}
      </h1>
    </div>
  )
}

export default Home
