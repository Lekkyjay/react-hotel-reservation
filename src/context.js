import React, { createContext, useState, useEffect } from 'react'
import items from './data'

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    /*
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false*/
  })

  useEffect(() => {
    let rooms = formatData(items)
    let featuredRooms = rooms.filter(room => room.featured === true);
    // let maxPrice = Math.max(...rooms.map(item => item.price));
    // let maxSize = Math.max(...rooms.map(item => item.size));
    setData({rooms, featuredRooms, sortedRooms: rooms, loading: false});
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

  return (
    <GlobalContext.Provider value={{ ...data }}>
      { children }
    </GlobalContext.Provider>
  )
}
