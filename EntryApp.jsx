import React from 'react';
// modules
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// components
// import { Home } from 'seven-half-beers';
import Homepage from './screens/Homepage'
import Gamepage from './screens/Gamepage'

const EntryApp = () => {
    const Stack = createStackNavigator();

    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Gamepage'}
            >

                <Stack.Screen
                    name='Game'
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

            </Stack.Navigator>
        </NavigationContainer>
    )



}

export default EntryApp;