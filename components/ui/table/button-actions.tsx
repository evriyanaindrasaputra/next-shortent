import React from 'react'
import { trpc } from '~/lib/trpc'

type ButtonActionProps = {
  idSlug : string,
  page : number,
  limit : number,
}
const ButtonActions: React.FC<ButtonActionProps> = ({ idSlug, page, limit }) => {
  const utils = trpc.useContext()
  const { mutate } = trpc.useMutation(['shorten.delete-slug'], {
    onSuccess: () => {
      utils.invalidateQueries(['shorten.list-slug', {page, limit}]);
    }
  })

  function handleDelete(idSlug : string) {
    mutate({id : idSlug})
  }
  return (
    <>
      <button className="py-3 px-2 bg-red-400 rounded text-black" type="button" onClick={() => handleDelete(idSlug)}>Delete</button>
    </>
  )
}


export default ButtonActions
