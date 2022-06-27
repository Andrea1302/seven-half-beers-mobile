import React, { useEffect } from "react";
import { Home } from "seven-half-beers";

//Storage
import { removeStorage, getStorage } from "seven-half-beers/dist/utils/asyncStorage";

const Homepage = (props) => {

    useEffect(() => {
        getUserInformation()
    }, [])

    const getUserInformation = async () => {
        let user = await getStorage("user")
        console.log("User: ", user)
    }

    const navigatTo = (params) => {
        console.log("evviva i parama: ", params)
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