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
    console.log('data after first useEffect fired', data);
  }, [])

  const [roomType, setRoomType] = useState('')
  const [roomFiltered, setRoomFiltered] = useState(false)

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
    setData({...data, [name]: value});  //this is a very efficient piece of code for updating state!!!!
    setRoomType(value)
    setRoomFiltered(true)
    console.log('data after handleChange fired', data);
    console.log('roomFiltered:', roomFiltered);
    
  };

  useEffect(() => {
    if (roomFiltered) {
      console.log('useEffect fired from handleChange!!!!!');
      console.log('data after handleChange useEffect', data);
      filterRooms()
    }
  }, [roomType])

  const filterRooms = () => {
    let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = data;
    let tempRooms = [...rooms]
    capacity = parseInt(capacity);
    price = parseInt(price);
    console.log('type:', type);
    console.log('tempRooms before filter:', tempRooms);
    
    
    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
      console.log('Type inside if conditional:', type);
      console.log('tempRooms after filter:', tempRooms);
      console.log('data after filter:', data);
    }
    
    
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    //filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    if (roomFiltered) {
      setData({...data, sortedRooms: tempRooms});
      console.log('data after final setData:', data);
    }
  }

  return (
    <GlobalContext.Provider value={{ ...data, getRoom, handleChange }}>
      { children }
    </GlobalContext.Provider>
  )
}
