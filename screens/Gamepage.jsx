import react from "react";
import { Game,Button } from "seven-half-beers";

const Gamepage = (props) => {
    const goTo = () =>{
        props.navigation.navigate('Homepage')
    }
    return (
        <>
            <Button label="goooo" callback={goTo} />
            <Game />
        </>

    )
}

export default Gamepage