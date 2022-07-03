import React, { useState, useEffect, useRef } from "react";
import { Dimensions, Text, View, Alert, ImageBackground } from "react-native"

//Library
import { Game, Button } from "seven-half-beers";

//ScreenOrientation
import * as ScreenOrientation from 'expo-screen-orientation';

//Lottie
import { Animated, Easing } from 'react-native';
import Lottie from 'lottie-react-native';

let WS = new WebSocket("ws://7emezzo-dev.eba-uwfpyt28.eu-south-1.elasticbeanstalk.com/ws");

WS.onopen = () => {
    console.log("CONNECTED");
}
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

    // //const animationProgress = useRef(new Animated.Value(0))
    const myRef = useRef([])


    useEffect(() => {
        WS.onmessage = (event) => {
            console.log('onmessage', JSON.parse(event.data));
            let lobby = JSON.parse(event.data)
            let index = lobby.hands.findIndex(el => el.turn === true)
            let myTurn;
            if (lobby?.hands[index]?.user?.id === myId) {
                myTurn = true
            } else {
                myTurn = false
            }
            let variable = 0;
            // if (lobby.hands[index].cards.length > 1) {
            switch (lobby?.hands[index]?.cards[lobby?.hands[index]?.cards?.length - 1]?.value) {
                case 0.5: {
                    variable = 11.4
                    break;
                }
                case 1: {
                    variable = 22.8
                    break;
                }
                case 2: {
                    variable = 45.6
                    break;
                }
                case 3: {
                    variable = 68.4
                    break;
                }
                case 4: {
                    variable = 91.2
                    break;
                }
                case 5: {
                    variable = 114
                    break;
                }
                case 6: {
                    variable = 136.8
                    break;
                }
                case 7: {
                    variable = 159.6
                    break;
                }
            }
            // }

            console.log('variable', variable, state.frame)

            myRef?.current[index]?.play(state.frame, state.frame + variable)


            setState({
                ...state,
                frame: state.frame + variable,
                dataFromServer: lobby,
                isMyTurn: myTurn,
                myIndex: index
            })
        }
    })
    useEffect(() => {
        setTimeout(() => {

            const message = {
                user_id: myId,
                method: "startMatch"
            }
            sendMessage(message);


        }, 1000);
    }, [])
    const sendMessage = (message) => {
        WS.send(JSON.stringify(message));
        console.log('sended', message)
        setState({
            ...state,
            counter: state.counter + 1
        })
    }
    // //DidUpdate
    // useEffect(() => {

    //     /*  Animated.timing(animationProgress.current, {
    //          toValue: state.counterLiter,
    //          duration: 10000,
    //          easing: Easing.linear,
    //          useNativeDriver: false
    //      }).start(); */

    // }, [state.counterLiter])



    // const getState = (params) => {
    //     setState({
    //         ...state,
    //         propState: params
    //     })
    // }

    const renderPlayer = (player, key) => {
        return (
            <View
                key={key}
                style={{
                    height: 50,
                    // width: Dimensions.get("screen").width / 4 - 20,
                    marginBottom: 20,
                    alignItems: "center"
                }}>
                <Lottie
                    ref={el => myRef.current[key] = el}
                    source={require('../assets/lottie/beer.json')}
                    //progress={animationProgress.current}
                    style={{ width: "100%", height: "100%" }}
                    loop={false}
                />
                <Text>{player.username}</Text>
            </View>
        )
    }



    const card = () => {
        const message = {
            user_id: myId,
            method: "requestCard"
        }
        sendMessage(message)
        setTimeout(() => {
            const message = {
                user_id: myId,
                method: "checkEndMatch",
            }
            sendMessage(message)
        }, 200);
    }





    const stop = () => {
        const message = {
            user_id: myId,
            method: "stopPlaying"
        }
        sendMessage(message);
        setTimeout(() => {
            const message = {
                user_id: myId,
                method: "checkEndMatch",
            }
            sendMessage(message)
        }, 100);
        setState({
            ...state,
            frame: 71
        })
    }
    const test = () => {

    }
    return (



        <ImageBackground
            source={{ uri: 'https://i.gifer.com/OfmI.gif' }} style={{
                height: Dimensions.get('screen').height,
                width: Dimensions.get('screen').width,
                // alignItems: 'center',
                // justifyContent: 'center'
            }}
        >


            <View style={{ backgroundColor: "brown", alignItems: 'center', width: 150, paddingVertical: 20 }}>
                {
                    state?.dataFromServer?.users.map(renderPlayer)
                }
            </View>
            {
                state.isMyTurn ?
                    <>
                        <View style={{
                            alignItems: 'center',
                            flex:1,
                            justifyContent:'center',
                        }}>
                            <Lottie
                                ref={el => myRef.current[state.myIndex] = el}
                                source={require('../assets/lottie/beer.json')}
                                //progress={animationProgress.current}
                                style={{ width: 100, height: 100 }}
                                loop={false}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 150 }}>

                            <Button
                                style={{
                                    backgroundColor: 'blue',
                                    marginHorizontal: 20,
                                    padding: 10
                                }}
                                label="Stop" c
                                callback={stop} />
                            <Button
                                style={{
                                    backgroundColor: 'blue',
                                    marginHorizontal: 20,
                                    padding: 10
                                }}
                                label="Carta"
                                callback={card} />
                        </View>
                    </> :
                    <View>
                        <Text>Please wait your turn or the end of game</Text>
                    </View>

            }

        </ImageBackground >


    )
}

export default Gamepage