import React, { useContext } from 'react'
import { GlobalContext } from '../context'
import Loading from './Loading'
import Room from './Room'
import Title from './Title'


const FeaturedRooms = () => {
  const { loading, featuredRooms } = useContext(GlobalContext)

  const rooms = featuredRooms.map(room => {
    return <Room key={room.id} room={room} />;
  })
  
  return (
    <div>
      <Title title="featured rooms" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : rooms}
      </div>
    </div>
  )
}

export default FeaturedRooms
