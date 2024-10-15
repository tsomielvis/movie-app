import React, { useState } from "react";
import MyContext from "./MyContext";

const MyContextProvider = ({ children }) => {
  const [myState, setMyState] = useState("Initial value");

  return (
    <MyContext.Provider value={myState}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;