import React from "react";
import { Login } from "seven-half-beers";
import { setStorage } from "seven-half-beers/dist/utils/asyncStorage";
import { getUserInfo } from "seven-half-beers/dist/services/api/auth/authApi"
const LoginPage = (props) => {
    // async function goTo(params) {
    //     console.log(params, 'ciao')
    // let user = await getStorage('user')
    // console.log(user)
    // }

    const goTo = () => {
        props.navigation.navigate('RegistrationPage')
    }

    async function login(res) {
        if (res.status === 200) {
            let response = await getUserInfo(res.data.id)
            console.log(response)
            await setStorage("user", response.data);
            props.navigation.navigate('Homepage')
        }
    }
    return (
        <Login callback={login} goToRegistration={goTo} />
    )
}

export default LoginPage