import React, { useContext } from 'react'
import { GlobalContext } from '../context'
import Loading from './Loading'

const FeaturedRooms = () => {
  const { featuredRooms } = useContext(GlobalContext)
  
  return (
    <div>
      <Loading />
    </div>
  )
}

export default FeaturedRooms
