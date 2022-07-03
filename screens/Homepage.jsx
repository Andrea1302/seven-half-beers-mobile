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
    const navigatTo = (params) => {

        if (params === 'LeaderboardPage') {
            props.navigation.navigate(params, { playerList: state.userData.id })

        } else {
            props.navigation.navigate(params)

        }
        //console.log(params, 'idLobby', idLobby)
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

