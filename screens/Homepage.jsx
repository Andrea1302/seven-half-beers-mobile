import React from "react";
import { Home } from "seven-half-beers";


//Storage
import { removeStorage, getStorage } from "seven-half-beers/dist/utils/asyncStorage";

const Homepage = (props) => {

    const navigatTo = (params, idLobby) => {
        console.log(params,'idLobby',idLobby)
        props.navigation.navigate(params, { roomId : idLobby })
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