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
  console.log('room:', room);   //returns twice undefined then twice data
  
  
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

  //aray destructuring with rest operator
  const [main, ...defaultImages] = images

  return (
    <div>
      <StyledHero img={images[0] || slug.defBcg}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImages.map((item, index) => (
            <img key={index} src={item} alt={name} />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>
              max capacity :
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras </h6>
        <ul className="extras">
          {extras.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default SingleRoom
