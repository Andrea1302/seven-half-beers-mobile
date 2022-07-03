
import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ActivityIndicator, Alert } from 'react-native'
import { Button } from "seven-half-beers";
import { createLobby, deleteLobby, randomLobby } from "seven-half-beers/dist/services/api/lobby/lobbyApi";
import { getStorage } from "seven-half-beers/dist/utils/asyncStorage";
import { socket as WS } from 'seven-half-beers/dist/services/configSocket'

let token;
let id;
let lobby;
let idL = 44;

const LobbyPage = (props) => {
    (async () => {
        let user = await getStorage('user')
        token = user?.token
        id = user.id
    })()
    const [state, setState] = useState({
        dataFromServer: undefined,
        createdLobby: false,
    })
    useEffect(() => {

        console.log("ciao, sono dentro il didMount dellalobby")
        /*   WS.onopen = () => {
              console.log("CONNECTED");
          } */

        WS.onmessage = (event) => {

            console.log('onmessage', JSON.parse(event.data));
            lobby = JSON.parse(event.data)
            if (lobby.hasOwnProperty('idLobby')) {
                setState({
                    ...state,
                    dataFromServer: lobby
                })
            } else {
                props.navigation.navigate('Gamepage', { myIdProps: id })
            }

        }
        
        // return () => {
        //     WS.close()
        // }

    }, [])


    const create = () => {
        if (!state.createdLobby) {
            createLobby(token).then((response) => {
                console.log('response.data', response.data)
                lobby = response.data
                setTimeout(() => {
                    if (lobby != null && WS != null) {
                        const message = {
                            user_id: id,
                            method: "connectLobby"
                        }
                        sendMessage(message);
                    }

                }, 1000);
                setState({
                    ...state,
                    createdLobby: true
                })
            }).catch(() => {
                Alert.alert('You are already inside one Lobby, please quit from here if you want to create it')

                setTimeout(() => {
                    if (WS != null) {
                        const message = {
                            user_id: id,
                            method: "connectLobby"
                        }
                        sendMessage(message);
                    }
                    setState({
                        ...state,
                        createdLobby: true,
                    })

                }, 1000);

            })
        }
    }

    const search = () => {
        randomLobby(token, idL).then((response) => {
            console.log('response.data', response.data)
            lobby = response.data
            setTimeout(() => {
                if (lobby != null && WS != null) {
                    const message = {
                        user_id: id,
                        method: "connectLobby"
                    }
                    sendMessage(message);
                    connectionEstablished = true;
                }

            }, 1000);
            setState({
                ...state,
                createdLobby: true
            })
        }).catch((err) => {
            console.log(err)
            Alert.alert('You are already inside one Lobby, please quit from here if you want to change it')
            setTimeout(() => {
                if (WS != null) {
                    const message = {
                        user_id: id,
                        method: "connectLobby"
                    }
                    sendMessage(message);
                }
                setState({
                    ...state,
                    createdLobby: true,
                })

            }, 1000);

        })

    }
    const randomLobbyF = () => {
        if (!state.createdLobby) {
            randomLobby(token, -1).then((response) => {
                console.log('response.data', response.data)
                lobby = response.data
                connectionEstablished = false;
                setTimeout(() => {
                    if (lobby != null && WS != null) {
                        const message = {
                            user_id: id,
                            method: "connectLobby"
                        }
                        sendMessage(message);
                        connectionEstablished = true;
                    }

                }, 1000);
                setState({
                    ...state,
                    createdLobby: true
                })
            }).catch((err) => {
                console.log(err)
                Alert.alert('You are already inside one Lobby, please quit from here if you want to change it')

                setTimeout(() => {
                    if (WS != null) {
                        const message = {
                            user_id: id,
                            method: "connectLobby"
                        }
                        sendMessage(message);
                        connectionEstablished = true;
                    }
                    setState({
                        ...state,
                        createdLobby: true,
                    })

                }, 1000);

            })
        }
    }
    const sendMessage = (message) => {
        WS.send(JSON.stringify(message));
        console.log('sended', message)
    }

    const renderPlayer = (player, key) => {
        return (
            <View key={key} style={{ borderColor: '#fff', borderBottomWidth: 2, padding: 10, backgroundColor: '#4F8CAB' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    {player.username} | {player.score}pts
                </Text>
            </View>
        )
    }

    const quitLobby = () => {
        console.log(lobby)

        deleteLobby(token).then(response => {
            if (response.data.esito) {
                const message = {
                    user_id: id,
                    method: "quitLobby",
                    idLobby: lobby.idLobby
                }
                sendMessage(message);
                props.navigation.navigate('Homepage')
            } else {
                console.log("Cannot disconnect");
            }
        })
    }
    const quitYourLobby = () => {
        deleteLobby(token)
        props.navigation.navigate('Homepage')
    }
    const startGame = () => {

        const message = {
            user_id: id,
            method: "startMatch"
        }
        sendMessage(message);

    }

    return (
        <>
            <View style={{ backgroundColor: '#61B5D9', height: Dimensions.get('screen').height, paddingVertical: 20 }}>

                {!state.dataFromServer ?
                    <>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 36, color: '#fff' }}>EMPTY LOBBY</Text>
                        <Button label="crea lobby" callback={create} />
                        <Button label="random lobby" callback={randomLobbyF} />
                        <Button label="searclobby" callback={search} />


                    </> :

                    <View>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 36, color: '#fff', marginBottom: 10 }}>LOBBY PLAYERS : {state.dataFromServer.users.length}</Text>
                        {state.dataFromServer.users?.map(renderPlayer)}

                        {
                            ((state.dataFromServer.users?.length > 1) && (id == state.dataFromServer.users[0].id)) &&
                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <Button styleCustom={{ width: 100, backgroundColor: '#4F8CAB', alignItems: 'center', padding: 10, borderRadius: 5 }} label='START' callback={startGame} />
                            </View>

                        }
                        {
                            state.dataFromServer?.users?.length > 1 ?
                                <>
                                    <Button label="Quit" callback={quitLobby} />
                                    {/* <Button styleCustom={{ width: 100, backgroundColor: '#4F8CAB', alignItems: 'center', padding: 10, borderRadius: 5 }} label='Card' callback={card} />
                                    <Button styleCustom={{ width: 100, backgroundColor: '#4F8CAB', alignItems: 'center', padding: 10, borderRadius: 5 }} label='Stop' callback={stop} /> */}
                                </>
                                :
                                <Button label="Delete Lobby" callback={quitYourLobby} />
                        }

                    </View>
                }


            </View>




        </>
    )
}

export default LobbyPage