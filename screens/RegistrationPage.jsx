import React from "react";
import { Registration } from "seven-half-beers";

//Storage
import { setStorage } from "seven-half-beers/dist/utils/asyncStorage";

const RegistrationPage = (props) => {
    const register = async (responseUser, responseLogin) => {
        let infoUser = {
            info: responseUser.data,
            token: responseLogin.data.token,
            refreshToken: responseLogin.data.refreshToken
        }
        await setStorage("user", infoUser);
        props.navigation.navigate('Homepage')
    }
    return (
        <Registration callback={register} />
    )
}

export default RegistrationPage