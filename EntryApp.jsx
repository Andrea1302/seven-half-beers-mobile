import React, { useEffect, useState } from 'react';

// native components 
import { Text } from 'react-native';
// modules
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// components
import { getStorage } from 'seven-half-beers/dist/utils/asyncStorage';
import Homepage from './screens/Homepage';
import Gamepage from './screens/Gamepage';
import LoginPage from './screens/LoginPage';
import RegistrationPage from './screens/RegistrationPage';
import LobbyPage from './screens/LobbyPage';
import LeaderboardPage from './screens/LeaderboardPage';


const EntryApp = () => {
    const Stack = createStackNavigator();
    const [state, setState] = useState({
        ...state,
        loadingPage: false,
        isUserLogged: false
    })
    useEffect(() => {
        getUser()
    }, [])
    getUser = async () => {
        let newstate = Object.assign({}, state)
        let user = await getStorage('user')

        newstate.loadingPage = true;

        if (user === undefined) {
            newstate.loadingPage = true
        } else {
            newstate.isUserLogged = true;
        }
        setState(newstate)
    }

    return (
        <>
            {
                !state.loadingPage ?
                    <Text>Loading...</Text> :
                    <NavigationContainer>
                        <Stack.Navigator
                            initialRouteName={state.isUserLogged ? 'Homepage' : 'LoginPage'}
                        >

                            <Stack.Screen
                                name='Homepage'
                                component={Homepage}
                                options={
                                    {
                                        title: 'Home',
                                        headerStyle: {
                                            backgroundColor: '#e5be01',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            fontSize: 24,
                                        }
                                    }
                                }
                            />

                            <Stack.Screen
                                name='LeaderboardPage'
                                component={LeaderboardPage}
                                options={
                                    {
                                        title: 'Leaderboard',
                                        headerStyle: {
                                            backgroundColor: '#4F8CAB',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            fontSize: 24,
                                        }
                                    }
                                }
                            />

                            <Stack.Screen
                                name='LoginPage'
                                component={LoginPage}
                                options={
                                    
                                    {
                                        title: 'Login',
                                        headerStyle: {
                                            backgroundColor: '#e5be01',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            fontSize: 24,
                                        }
                                    }
                                }
                            />

                            <Stack.Screen
                                name='LobbyPage'
                                component={LobbyPage}
                                options={
                                    {
                                        title: 'Lobby',
                                        headerStyle: {
                                            backgroundColor: '#4F8CAB',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            fontSize: 24,
                                        }
                                    }
                                }
                            />

                            <Stack.Screen
                                name='RegistrationPage'
                                component={RegistrationPage}
                                options={
                                    {
                                        title: 'Registration',
                                        headerStyle: {
                                            backgroundColor: '#e5be01',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            fontSize: 24,
                                        }
                                    }
                                }
                            />



                            <Stack.Screen
                                name='Gamepage'
                                component={Gamepage}
                                options={
                                    {
                                        title: 'Game',
                                        headerStyle: {
                                            backgroundColor: '#e5be01',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            fontSize: 24,
                                        }
                                    }
                                }
                            />

                        </Stack.Navigator>
                    </NavigationContainer>
            }

        </>
    )



}

export default EntryApp;