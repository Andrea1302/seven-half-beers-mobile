import react from "react";

import { Leaderboard } from "seven-half-beers";
const LeaderboardPage = (props) =>{
    const userId = props.route.params.playerList;
    console.log('userId',userId)

    return (
        <Leaderboard mobileUser={userId} />
    )
}

export default LeaderboardPage