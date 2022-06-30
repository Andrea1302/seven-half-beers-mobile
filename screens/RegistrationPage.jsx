import React from "react";
import { Registration } from "seven-half-beers";

//Storage
import { setStorage } from "seven-half-beers/dist/utils/asyncStorage";
import { getUserInfo } from "seven-half-beers/dist/services/api/auth/authApi"

const RegistrationPage = (props) => {
    const register = async (responseUser, responseLogin) => {
         if (responseLogin.status === 200) {
            let response = await getUserInfo(responseLogin.data.id)
            await setStorage("user", response.data);
            props.navigation.navigate('Homepage')
        } else if ((responseUser.status === 200) && (responseLogin.status !== 200)) {
            props.navigation.navigate('LoginPage')
        } else {
            alert('error')
        }

    }
    return (
        <Registration callback={register} />
    )
}

export default RegistrationPage