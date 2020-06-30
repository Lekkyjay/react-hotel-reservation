import React, { useState, useContext } from 'react'
import defaultBcg from "../images/room-1.jpeg"
import Hero from "../components/Hero"
import Banner from "../components/Banner"
import { Link } from "react-router-dom"
import { GlobalContext } from '../context'
import StyledHero from '../components/StyledHero'

//props is setup automatically by react-router
const SingleRoom = (props) => {
  const [slug, setSlug] = useState({
    param: props.match.params.slug,
    defBcg: defaultBcg
  })
  
  const { getRoom } = useContext(GlobalContext)
  const room = getRoom(slug.param)
  
  if(!room) {
    return (
      <div className="error">
        <h3>No such room could be found ...</h3>
        <Link to="/rooms" className="btn-primary">
          Back to rooms
        </Link>
      </div>
    )
  }
  
  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images
  } = room

  // const [main, ...defaultImages] = images

  return (
    <StyledHero img={images[0] || slug.defBcg}>
      <Banner title={`${name} room`}>
        <Link to="/rooms" className="btn-primary">
          back to rooms
        </Link>
      </Banner>
      </StyledHero>
  )
}

export default SingleRoom
