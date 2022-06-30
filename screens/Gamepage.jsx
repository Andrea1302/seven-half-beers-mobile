import React, { useState, useEffect, useRef } from "react";
import { Dimensions, Text, View, Alert } from "react-native"

//Library
import { Game, Button } from "seven-half-beers";

//ScreenOrientation
import * as ScreenOrientation from 'expo-screen-orientation';

//Lottie
import { Animated, Easing } from 'react-native';
import Lottie from 'lottie-react-native';


let turns = 0

const Gamepage = (props) => {

    const [state, setState] = useState({
        counterPrevBeer: 71,
        propState: null
    })

    //const animationProgress = useRef(new Animated.Value(0))
    const myRef = useRef([])

    //DidUpdate
    useEffect(() => {

        /*  Animated.timing(animationProgress.current, {
             toValue: state.counterLiter,
             duration: 10000,
             easing: Easing.linear,
             useNativeDriver: false
         }).start(); */

    }, [state.counterLiter])

    useEffect(() => {
        /*        (async () => {
                   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
               })() */
    }, [])

    const getState = (params) => {
        setState({
            ...state,
            propState: params
        })
    }

    const renderPlayer = (player, key) => {
        return (
            <View
                key={key}
                style={{
                    height: 100,
                    width: Dimensions.get("screen").width / 4 - 20,
                    margin: 10,
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
                <Text>{player.otherCards}</Text>
                <Text>{player.firstCard}</Text>
            </View>
        )
    }

    const add = (params) => {

        console.log("Oh fra: ", params)

        if (isNaN(params)) {
            Alert.alert('Loser')
        } else {
            myRef.current[state.propState.turns].play(71, 71 + params)
        }


    }

    const alt = (params) => {

    }

    return (
        <Game
            callback={getState}
            styleChildren={{ width: Dimensions.get("screen").width, }}
            addCard={add}
            stop={alt}
        >
            {
                state.propState &&
                <>
                    <Text style={{ fontSize: 30, color: "white" }}>Turno: {state.propState.turns}</Text>
                    <View style={{ flexDirection: "row", backgroundColor: "red", flexWrap: "wrap" }}>
                        {
                            state.propState?.infoGiocatori?.user.map(renderPlayer)
                        }
                    </View>
                </>

            }
        </Game>

    )
}

export default Gamepage