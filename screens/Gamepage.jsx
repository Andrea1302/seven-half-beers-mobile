import react, { useState, useEffect, useRef } from "react";
import { Game, Button } from "seven-half-beers";

//React Native
import { Text, Animated, Easing } from "react-native"

//Lottie
import Lottie from "lottie-react-native"

const Gamepage = (props) => {

    const [state, setState] = useState({
        currentLiters: 0
    })

    const animationProgress = useRef(new Animated.Value(0))

    useEffect(() => {
        
        Animated.timing(animationProgress.current, {
            toValue: state.currentLiters,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false
        }).start()

    }, [state.currentLiters])

    const goTo = () => {
        props.navigation.navigate('Homepage')
    }

    const addLiters = () => {
        setState({
            ...state,
            currentLiters: state.currentLiters + 0.1
        })
    }

    const subLiters = () => {
        setState({
            ...state,
            currentLiters: state.currentLiters - 0.1
        })
    }

    return (
        <>
            <Button label="goooo" callback={goTo} />
            <Game>
                <Lottie
                    source={require('../assets/lottie/beer.json')}
                    progress={animationProgress.current}
                />
            </Game>

            <Button label="+" callback={addLiters} />
            <Button label="-" callback={subLiters} />
        </>

    )
}

export default Gamepage