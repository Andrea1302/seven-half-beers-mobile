export function valueLogicLottie(lobby, index) {
    let variable = 0;
    switch (lobby?.hands[index]?.cards[lobby?.hands[index]?.cards?.length - 1]?.value) {
        case 0.5: {
            variable = 11.4
            break;
        }
        case 1: {
            variable = 22.8
            break;
        }
        case 2: {
            variable = 45.6
            break;
        }
        case 3: {
            variable = 68.4
            break;
        }
        case 4: {
            variable = 91.2
            break;
        }
        case 5: {
            variable = 114
            break;
        }
        case 6: {
            variable = 136.8
            break;
        }
        case 7: {
            variable = 159.6
            break;
        }
    }
    return variable
}

export function checkMyTurn(lobby, index, myId) {
    let myTurn
    if (lobby?.hands[index]?.user?.id === myId) {
        myTurn = true
    } else {
        myTurn = false
    }
    return myTurn
}