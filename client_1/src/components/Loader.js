import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";


function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#b06610");

    const override: = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
  return(
    <div>
    <div className="sweet-loading text-center">
    <BounceLoader
      color="#000"
      loading={loading}
      cssOverride=""
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
    </div>
  )
}

export default Loader
