import React, { createContext, useState, useEffect } from 'react'
import items from './data'

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  })

  useEffect(() => {
    let rooms = formatData(items)
    let featuredRooms = rooms.filter(room => room.featured === true);
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));
    setData({...data,
      rooms, 
      featuredRooms, 
      sortedRooms: rooms, 
      loading: false, 
      price: maxPrice, 
      maxPrice, 
      maxSize
    });
  }, [])

  const formatData = (items) => {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  const getRoom = slug => {
    //create a copy of rooms array in tempRooms
    let tempRooms = [...data.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  const handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log('name:', name, 'value:', value);

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
    <GlobalContext.Provider value={{ ...data, getRoom, handleChange }}>
      { children }
    </GlobalContext.Provider>
  )
}
