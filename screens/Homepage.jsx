import react from "react";
import { Home } from "seven-half-beers";

const Homepage = (props) => {

    const navigatTo = (params) => {
        console.log("evviva i parama: ", params)
        props.navigation.navigate(params)
    }

    return (
        <Home goTo={navigatTo} />
    )
}

export default Homepage