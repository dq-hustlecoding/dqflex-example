import React, { useState, useContext, createContext } from "react";

const RatingContext = createContext(null);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const RatingContextProvider = ({
  ratings
}) => {
  const [rating, setRating] = useState([]);
  return (
    <RatingContext.Provider value={{ setRating }}>
      {rating}
    </RatingContext.Provider>
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useRating = () => {
  const rating = useContext(RatingContext);
  return rating;
};

export const useSetRating = () => {
  const { setRating } = useContext(RatingContext);
  return setRating;
};