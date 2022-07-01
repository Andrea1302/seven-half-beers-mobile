import React, { useState, useEffect } from "react";
import { Home } from "seven-half-beers";
import { ActivityIndicator, Text } from 'react-native'


//Storage
import { removeStorage, getStorage } from "seven-half-beers/dist/utils/asyncStorage";

let prova = 2;
const Homepage = (props) => {
    const [state, setState] = useState({
        userData: undefined
    })
    useEffect(() => {
        userInfo()
    }, [])
    const userInfo = async () => {
        let user = await getStorage('user')
        setState({
            userData: user
        })
    }
    const navigatTo = (params, infoLobby) => {
        //console.log(params, 'idLobby', idLobby)
        props.navigation.navigate(params, { roomId: infoLobby.idLobby, playerList : infoLobby })
    }

    const logout = async () => {
        await removeStorage("user")
        props.navigation.navigate("LoginPage")
    }

    return (
        <>
            {
                state.userData === undefined ?
                    <ActivityIndicator></ActivityIndicator> :
                    <Home mobileUser={state.userData} goTo={navigatTo} logoutCallback={logout} />

            }
        </>

    )
}

export default Homepage