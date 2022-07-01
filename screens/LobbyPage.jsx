import React, { useEffect, useState } from "react";
import { Lobby } from 'seven-half-beers'
import { getStorage } from "seven-half-beers/dist/utils/asyncStorage";
import { ActivityIndicator, Text } from 'react-native'

const LobbyPage = (props) => {
    const lobbyId = props.route.params.roomId;
    const playerList = props.route.params.playerList

    console.log("PANICO PAURA: ", props.route.params.playerList)

    const [state, setState] = useState({
        userData: undefined,
        players: playerList
    })

    useEffect(() => {
        userInfo()
    }, [])

    const userInfo = async () => {
        let user = await getStorage('user')
        console.log("user: ", user)
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

                    <Lobby mobileUser={state.userData} listPlayers={state.players} goToGameCallback={goToGame} />
            }
        </>
    )

}
export default LobbyPage