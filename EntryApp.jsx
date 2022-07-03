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
                                        title: 'Homepage',
                                        headerStyle: {
                                            backgroundColor: '#000',
                                        },
                                        headerTintColor: '#007AFF',
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
                                            backgroundColor: '#000',
                                        },
                                        headerTintColor: '#007AFF',
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
                                        title: 'LoginPage',
                                        headerStyle: {
                                            backgroundColor: '#000',
                                        },
                                        headerTintColor: '#007AFF',
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
                                        title: 'LobbyPage',
                                        headerStyle: {
                                            backgroundColor: '#000',
                                        },
                                        headerTintColor: '#007AFF',
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
                                        title: 'RegistrationPage',
                                        headerStyle: {
                                            backgroundColor: '#000',
                                        },
                                        headerTintColor: '#007AFF',
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
                                        title: 'Gamepage',
                                        headerStyle: {
                                            backgroundColor: '#000',
                                        },
                                        headerTintColor: '#007AFF',
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