import React from "react";
import { Home } from "seven-half-beers";


//Storage
import { removeStorage, getStorage } from "seven-half-beers/dist/utils/asyncStorage";

const Homepage = (props) => {

    const navigatTo = (params) => {
        props.navigation.navigate(params)
    }

    const logout = async () => {
        await removeStorage("user")
        props.navigation.navigate("LoginPage")
    }

    return (
        <Home goTo={navigatTo} logoutCallback={logout} />
    )
}

export default Homepage