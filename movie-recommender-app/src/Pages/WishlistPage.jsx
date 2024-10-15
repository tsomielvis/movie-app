import React from "react";
import Wishlist from "./Components/Wishlist";

const WishlistPage = ({ wishlist }) => {
    return (
      <div>
        <h2>My Wishlist</h2>
        <Wishlist movies={wishlist} />
      </div>
    );
  };
  
  export default WishlistPage;