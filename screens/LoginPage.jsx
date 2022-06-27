import React from "react";
import { Login } from "seven-half-beers";
import { setStorage } from "seven-half-beers/dist/utils/asyncStorage";

const LoginPage = (props) => {
    // async function goTo(params) {
    //     console.log(params, 'ciao')
    // let user = await getStorage('user')
    // console.log(user)
    // }
    const goTo = () => {
        props.navigation.navigate('RegistrationPage')
    }
    function login(res) {

        if (res.status === 200) {
            let infoUser = {
                info : res.data,
                token : res.data.token,
                refreshToken : res.data.refreshToken
            }
            setStorage("user",infoUser);
            props.navigation.navigate('Homepage')
        }
    }
    return (
        <Login callback={login} goToRegistration={goTo} />
    )
}

export default LoginPage