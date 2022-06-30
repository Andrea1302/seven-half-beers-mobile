import React from "react";
import { Lobby } from 'seven-half-beers'
const LobbyPage = (props) => {
    const goToGame = () =>{
        props.navigation.navigate('Gamepage')
    }
    return (
        <Lobby startGameCallback={goToGame}/>
    )
}
export default LobbyPage