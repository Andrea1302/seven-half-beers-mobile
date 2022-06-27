import react from "react";
import { Home } from "seven-half-beers";

const Homepage = (props) => {
    const navigatTo = (params) => {
        props.navigation.navigate(params)
    }
    return (
        <Home goTo={navigatTo} />
    )
}

export default Homepage