import React from "react";
import { Lobby } from 'seven-half-beers'
const LobbyPage = (props) => {
    const goToGame = () =>{
        props.navigation.navigate('Gamepage')
    }
    return (
        <Lobby goToGameCallback={goToGame}/>
    )
}
export default LobbyPage