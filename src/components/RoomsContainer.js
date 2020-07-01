import React, { useContext } from 'react'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import { GlobalContext } from '../context'
import Loading from './Loading'

const RoomsContainer = () => {
  const { loading, sortedRooms, rooms } = useContext(GlobalContext)

  //This is not working. Loading is not getting loaded.
  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </div>
  )
}

export default RoomsContainer
