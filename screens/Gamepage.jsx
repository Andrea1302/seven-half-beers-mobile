import React, { useState, useEffect, useRef } from "react";
import { Dimensions, Text, View, FlatList, ImageBackground, ScrollView } from "react-native"

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
        turnIndex: undefined,
        isFinishGame: false,
        winners: undefined,
        myIndexInArray: undefined
    })

    const myRef = useRef([])

    useEffect(() => {
        WS.onmessage = (event) => {

            console.log('onmessage', JSON.parse(event.data));
            let lobby = JSON.parse(event.data)
            if (lobby?.winners?.length > 0) {
                setState({
                    ...state,
                    isFinishGame: true,
                    winners: lobby.winners
                })
                WS.close()
                return
            }

            let index = lobby?.hands.findIndex(el => el?.turn === true)
            console.log("Turno: ", index)

            let myIndex = lobby?.hands.findIndex(el => el?.user.id === myId)

            let myTurn = checkMyTurn(lobby, index, myId);
            let variable = valueLogicLottie(lobby, index);

            if (index === 0) {
                myRef?.current[index]?.play(state.frame, state.frame + variable)
            } else {
                myRef?.current[index - 1]?.play(state.frame, state.frame + variable)
            }

            //myRef?.current[index]?.play(state.frame, state.frame + variable)

            setState({
                ...state,
                frame: lobby?.hands[index].cardValue > 7.5 ? 71 : state.frame + variable,
                dataFromServer: lobby,
                isMyTurn: myTurn,
                turnIndex: index,
                myIndexInArray: myIndex
            })
        }

    }, [WS.onmessage])


    WS.onclose = (event) => {
        console.log(event, 'event')
    }

    // send message 
    const sendMessage = (message) => {
        WS.send(JSON.stringify(message));
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
                    alignItems: "center",
                    marginHorizontal: 10,
                    borderRightColor: '#fff',
                    borderRightWidth: 2,
                    paddingRight: 20
                }}>
                <Lottie
                    ref={el => myRef.current[key] = el}
                    source={require('../assets/lottie/beer.json')}
                    style={{ height: 50 }}
                    loop={false}
                />
                {
                    player?.cards?.length >= 1 ?
                        <View style={{ flexDirection: 'row' }}>

                            {
                                player.cards.map(renderCards)
                            }
                        </View>
                        :

                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>0</Text>
                }
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>{player?.user?.username}</Text>
                <>
                    {
                        parseInt(player.cardValue) > 7.5 ?
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>is Drunk</Text> :
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Total : {player?.cards?.length > 0 ? parseInt(player?.cardValue) - parseInt(player?.cards[0]?.value) : 0}</Text>
                    }
                </>

            </View>
        )
    }

    // function to render all draw cards 
    const renderCards = (card, key) => {
        if (key === 0) {
            return (

                <Text style={{ color: '#fff', fontWeight: 'bold' }} key={key + 100}>First : ?  </Text>
            )
        } else if (key === 1) {
            return (
                <Text style={{ color: '#fff', fontWeight: 'bold' }} key={key + 100}>Other Liters :  {card.value}  |</Text>
            )
        } else {
            return (
                <Text style={{ color: '#fff', fontWeight: 'bold' }} key={key + 100}>  {card.value}  |</Text>
            )
        }

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




    // function to stop playing
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

        /*       setState({
                  ...state,
                  frame: 71
              }) */
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

    //JSX Return
    return (
        <>
            {
                !state.isFinishGame ?
                    <ImageBackground
                        source={{ uri: 'https://i.gifer.com/OfmI.gif' }}
                        style={{
                            height: Dimensions.get('screen').height,
                            width: Dimensions.get('screen').width,
                        }}
                    >

                        <View style={{ backgroundColor: "rgba(61, 52, 25, 0.6)", paddingVertical: 20 }}>
                            <ScrollView horizontal={true} >
                                {
                                    state?.dataFromServer?.hands.map(renderPlayer)
                                }
                            </ScrollView>
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
                                            ref={el => myRef.current[state.myIndexInArray] = el}
                                            source={require('../assets/lottie/beer.json')}
                                            style={{ width: 100, height: 100, backgroundColor: 'rgba(61, 52, 25, 0.6)' }}
                                            loop={false}
                                        />
                                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{state?.dataFromServer?.hands[state?.myIndexInArray]?.cardValue}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', bottom: 150, justifyContent: 'center' }}>

                                        <Button label="Bastaaa!" callback={stop} />
                                        <Button label="Versa !" callback={card} />
                                        <Button label="Meglio che esca" callback={quitMatch} />

                                    </View>
                                </> :
                                <View style={{ flex: .8, justifyContent: 'flex-end' }}>
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Please wait your turn or the end of the game</Text>
                                    <Button label="Meglio che esca" callback={quitMatch} />
                                </View>

                        }

                    </ImageBackground > :
                    <View style={{ height: Dimensions.get('screen').height, alignItems: 'center', justifyContent: 'center' }}>
                        <ScrollView horizontal={true} >
                            {
                                state?.winners?.map((player, key) => {

                                    return (
                                        <View key={key} style={{ marginHorizontal: 15 }}>
                                            <Lottie
                                                source={require('../assets/lottie/winner.json')}
                                                style={{ height: 200 }}
                                                loop={true}
                                                autoPlay={true}
                                            />

                                            <Text style={{ color: '#000' }} key={key + 1000}>The winner is : {player.username}</Text>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
            }
        </>



    )
}

export default Gamepage