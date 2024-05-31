import React, { createContext } from "react";

const Context = createContext({
  rooms: [],
  setRooms: () => {},
});

export default Context;
