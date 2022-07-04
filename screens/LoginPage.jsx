import React from "react";
import { Login } from "seven-half-beers";
import { setStorage } from "seven-half-beers/dist/utils/asyncStorage";
import { getUserInfo } from "seven-half-beers/dist/services/api/auth/authApi"
import { Dimensions } from "react-native";
const LoginPage = (props) => {

    const goTo = () => {
        props.navigation.navigate('RegistrationPage')
    }

    async function login(res) {
        if (res.status === 200) {
            let response = await getUserInfo(res.data.id)
            let user = {
                "email": res.data.email,
                "id": res.data.id,
                "online": response.data.online,
                "password": null,
                "refreshToken": res.data.refreshToken,
                "score": response.data.score,
                "token": res.data.token,
                "username": response.data.username,
            }
            await setStorage("user", user);
            props.navigation.navigate('Homepage')
        }
    }
    return (
        <Login containerStyle={{width:Dimensions.get('screen').width -50,marginBottom : 120}} callback={login} goToRegistration={goTo} />
    )
}

export default LoginPage