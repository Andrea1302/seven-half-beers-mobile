import React from "react";
import { Registration } from "seven-half-beers";

const RegistrationPage = () => {
    const register = (responseUser, responseLogin) => {
        let infoUser = {
            info: responseUser.data,
            token: responseLogin.data.token,
            refreshToken: responseLogin.data.refreshToken
        }
        setStorage("user", infoUser);
        props.navigation.navigate('Homepage')
    }
    return (
        <Registration callback={register} />
    )
}

export default RegistrationPage