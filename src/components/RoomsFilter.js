import React from 'react'
import { useContext } from "react";
import { GlobalContext } from "../context";
import Title from "./Title"

const RoomsFilter = ({ rooms }) => {
  const context = useContext(GlobalContext)
  console.log('context-type:', context);
  
  const {
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context

  // get all unique values. items is an array, value is a string
  const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
  };

  // get unique types
  let types = getUnique(rooms, "type")

  // add all
  types = ["all", ...types];

  // map to jsx
  types = types.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ))

  const handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log('name:', name, 'value:', value);

    const selectedType = 

    // setData(
    //   {...data,
    //     [name]: value
    //   },
      filterRooms()
    // );
  };

  const filterRooms = () => {
    console.log('hello');
    
    // let {
    //   rooms,
    //   type,
    //   capacity,
    //   price,
    //   minSize,
    //   maxSize,
    //   breakfast,
    //   pets
    // } = this.state;
  }
  
  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form"></form>
        {/* select type */}
        <div className="form-group">
        <label htmlFor="type">room type</label>
        <select
          name="type"
          id="type"
          onChange={handleChange}
          className="form-control"
          value={type}
        >
          {types}
        </select>
      </div>
      {/* end of select type */}
    </section>
  )
}

export default RoomsFilter
