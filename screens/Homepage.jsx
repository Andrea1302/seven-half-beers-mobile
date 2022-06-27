import react from "react";
import { Home } from "seven-half-beers";

const Homepage = () => {
    const navigatTo = (params) => {
        console.log('params', params)
    }
    return (
        <Home goTo={navigatTo} />
    )
}

export default Homepage