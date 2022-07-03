import React, { useState, useEffect, useRef } from "react";
import { Dimensions, Text, View, Alert, ImageBackground } from "react-native"

//Library
import { Game, Button } from "seven-half-beers";

//ScreenOrientation
import * as ScreenOrientation from 'expo-screen-orientation';

import Lottie from 'lottie-react-native';

import { socket as WS } from 'seven-half-beers/dist/services/configSocket'
import { valueLogicLottie, checkMyTurn } from '../utils'


const Gamepage = (props) => {

    const myId = props.route.params.myIdProps
    const [state, setState] = useState({
        counterPrevBeer: 71,
        dataFromServer: null,
        counter: 0,
        frame: 71,
        isMyTurn: false,
        myIndex: undefined
    })

    const myRef = useRef([])
    useEffect(() => {
        console.log("ciao, sono dentro il didUpdate del game")
        WS.onmessage = (event) => {
            console.log('onmessage', JSON.parse(event.data));
            let lobby = JSON.parse(event.data)
            let index = lobby?.hands.findIndex(el => el?.turn === true)

            console.log('index', index)
            let myTurn = checkMyTurn(lobby, index, myId);
            let variable = valueLogicLottie(lobby, index);

            myRef?.current[index]?.play(state.frame, state.frame + variable)


            setState({
                ...state,
                frame: state.frame + variable,
                dataFromServer: lobby,
                isMyTurn: myTurn,
                myIndex: index
            })
        }
    }, [WS.onmessage])

    useEffect(() => {
        console.log("ciao, sono dentro il didMount del game")
        WS.onopen = () => {
            console.log("CONNECTED");
        }
        setTimeout(() => {

            const message = {
                user_id: myId,
                method: "startMatch"
            }
            sendMessage(message);


        }, 1000);
        return () => {
            WS.close()
        }
    }, [])

    // send message 
    const sendMessage = (message) => {
        WS.send(JSON.stringify(message));
        console.log('sended', message)
        setState({
            ...state,
            counter: state.counter + 1
        })
    }

    // function to render players and info game 
    const renderPlayer = (player, key) => {
        return (
            <View
                key={key}
                style={{
                    marginBottom: 20,
                    alignItems: "center"
                }}>
                {/* <Lottie
                    ref={el => myRef.current[key] = el}
                    source={require('../assets/lottie/beer.json')}
                    //progress={animationProgress.current}
                    style={{ width: "100%", height: "100%" }}
                    loop={false}
                /> */}
                {
                    player?.cards?.length >= 1 ?
                        <>
                            {
                                player.cards.map(renderCards)
                            }
                        </>
                        :

                        <Text>0</Text>
                }
                <Text>{player?.user?.username}</Text>
                <Text>Total : {player?.cardValue}</Text>
            </View>
        )
    }

    // function to render all draw cards 
    const renderCards = (card, key) => {
        return (
            <Text key={key + 100}>{card.value}</Text>
        )
    }

    const card = () => {
        const message = {
            user_id: myId,
            method: "requestCard"
        }
        sendMessage(message)
        // setTimeout(() => {
        //     const message = {
        //         user_id: myId,
        //         method: "checkEndMatch",
        //     }
        //     sendMessage(message)
        // }, 200);
    }




    // function to stop playing
    const stop = () => {
        const message = {
            user_id: myId,
            method: "stopPlaying"
        }
        sendMessage(message);
        // setTimeout(() => {
        //     const message = {
        //         user_id: myId,
        //         method: "checkEndMatch",
        //     }
        //     sendMessage(message)
        // }, 100);
        setState({
            ...state,
            frame: 71
        })
    }


    // function to quit game 
    const quitMatch = () => {
        const message = {
            user_id: myId,
            method: "quitMatch"
        }
        sendMessage(message);
        setTimeout(() => {
            const message = {
                user_id: myId,
                method: "checkEndMatch",
            }
            sendMessage(message)
        }, 100);
        props.navigation.navigate('Homepage')
    }
    return (
        <ImageBackground
            source={{ uri: 'https://i.gifer.com/OfmI.gif' }} style={{
                height: Dimensions.get('screen').height,
                width: Dimensions.get('screen').width,
            }}
        >


            <View style={{ backgroundColor: "brown", alignItems: 'center', width: 150, paddingVertical: 20 }}>
                {
                    state?.dataFromServer?.hands.map(renderPlayer)
                }
            </View>
            {
                state.isMyTurn ?
                    <>
                        <View style={{
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center',
                        }}>
                            <Lottie
                                ref={el => myRef.current[state.myIndex] = el}
                                source={require('../assets/lottie/beer.json')}
                                style={{ width: 100, height: 100 }}
                                loop={false}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 150 }}>

                            <Button label="Stop" callback={stop} />
                            <Button label="Carta" callback={card} />
                            <Button label="Quit match" callback={quitMatch} />

                        </View>
                    </> :
                    <View>
                        <Text>Please wait your turn or the end of game</Text>
                        <Button label="Quit match" callback={quitMatch} />

                    </View>

            }

        </ImageBackground >


    )
}

export default Gamepage