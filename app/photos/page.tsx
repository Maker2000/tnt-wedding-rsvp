import React from "react";
import Carousel from "../../components/Carousel";

function Photos() {
  return (
    <div>
      <Carousel folder="carousel/photo-shoot" prefix="shoot" ext="JPG" count={17} />
    </div>
  );
}

export default Photos;
