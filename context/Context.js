import React, { createContext } from "react";

const Context = createContext({
  rooms: [],
  setRooms: () => {},
  unfilteredRooms: [],
  setUnfilteredRooms: () => {},
});

export default Context;
