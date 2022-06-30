import React from "react";
import { Lobby } from 'seven-half-beers'
const LobbyPage = (props) => {
    const lobbyId = props.route.params.roomId
    const goToGame = () => {

        props.navigation.navigate('Gamepage', { roomId : lobbyId })
    }
    return (
        <Lobby  goToGameCallback={goToGame} />
    )
}
export default LobbyPage