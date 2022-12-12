import './App.css';
import { Link } from "react-router-dom";

function App() {
    return (
        <div>
            <h1 class='App'>Blackjack</h1>
            <div class='App'>
                <Link to="Game">
                    <button class='button'>Play Game</button>
                </Link>
                <Link to="Leaderboard">
                    <button class='button'>Leaderboard</button>
                </Link>
            </div>
        </div>
    );
}

export default App;