import react from "react";
import { Game, Button } from "seven-half-beers";

//Lottie
import { Animated, Easing } from 'react-native';
import Lottie from 'lottie-react-native';


const Gamepage = (props) => {
    const goTo = () => {
        props.navigation.navigate('Homepage')
    }
    return (
        <>
            <Button label="goooo" callback={goTo} />
            <Game>

            </Game>
        </>

    )
}

export default Gamepage