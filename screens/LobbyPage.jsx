import React, { useEffect, useState } from "react";
import { Lobby } from 'seven-half-beers'
import { getStorage } from "seven-half-beers/dist/utils/asyncStorage";
import { ActivityIndicator, Text } from 'react-native'

const LobbyPage = (props) => {
    const lobbyId = props.route.params.roomId;
    const [state, setState] = useState({
        userData: undefined
    })
    useEffect(() => {
        userInfo()
    }, [])
    const userInfo = async () => {
        let user = await getStorage('user')
        setState({
            ...state,
            userData: user
        })
    }

    const goToGame = () => {

        props.navigation.navigate('Gamepage', { roomId: lobbyId, myId: state?.userData?.id })
    }

    return (
        <>
            {
                state.userData === undefined ?
                    <ActivityIndicator></ActivityIndicator> :

                    <Lobby mobileUser={state.userData} goToGameCallback={goToGame} />
            }
        </>
    )

}
export default LobbyPage