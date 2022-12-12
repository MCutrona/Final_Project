import './App.css';
import React, { useState } from 'react';
import ReactSlider from "react-slider";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Link } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyDG3W6gYtaaHLOVd-ULWKMrhPZ10s5Lrck",
  authDomain: "blackjack-52235.firebaseapp.com",
  projectId: "blackjack-52235",
  storageBucket: "blackjack-52235.appspot.com",
  messagingSenderId: "151767467150",
  appId: "1:151767467150:web:a560960b11a9a8c121b5df",
  measurementId: "G-5HS7NV2SL8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function newCardObj() {
  const allCards = [{value: 2, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Playing_card_spade_2.svg/1200px-Playing_card_spade_2.svg.png'},
                    {value: 3, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Playing_card_spade_3.svg/1200px-Playing_card_spade_3.svg.png'},
                    {value: 4, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Playing_card_spade_4.svg/1638px-Playing_card_spade_4.svg.png'},
                    {value: 5, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_spade_5.svg/1200px-Playing_card_spade_5.svg.png'},
                    {value: 6, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Playing_card_spade_6.svg/1200px-Playing_card_spade_6.svg.png'},
                    {value: 7, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Playing_card_spade_7.svg/1200px-Playing_card_spade_7.svg.png'},
                    {value: 8, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Playing_card_spade_8.svg/1200px-Playing_card_spade_8.svg.png'},
                    {value: 9, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Playing_card_spade_9.svg/1200px-Playing_card_spade_9.svg.png'},
                    {value: 10, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Playing_card_spade_10.svg/1200px-Playing_card_spade_10.svg.png'},
                    {value: 10, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/English_pattern_jack_of_spades.svg/1200px-English_pattern_jack_of_spades.svg.png'},
                    {value: 10, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/English_pattern_queen_of_spades.svg/1200px-English_pattern_queen_of_spades.svg.png'},
                    {value: 10, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/English_pattern_king_of_spades.svg/1200px-English_pattern_king_of_spades.svg.png'},
                    {value: 11, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ace_of_spades.svg/1200px-Ace_of_spades.svg.png'}]
  return allCards[Math.floor(Math.random() * 13)];
}

function getHandtotal(handList) {
  var total = 0;
  for(let i = 0; i < handList.length; i++){
    total += handList[i].value;
  }
  return total;
}

function App() {
  const db = firebase.firestore();
  const [dealerHand, setDealerHand] = useState([newCardObj()]);
  const [playerHand, setPlayerHand] = useState([newCardObj(), newCardObj()]);
  const [hitButtonStatus, setHitButtonStatus] = useState(false);
  const [dealButtonState, setDealButtonState] = useState('visible');
  const [gameState, setGameState] = useState('hidden');
  const [playAgainButton, setplayAgainButton] = useState('hidden');
  const [finishButton, setFinishButton] = useState('hidden');
  const [submitButton, setSubmitButton] = useState('hidden');
  const [inputState, setInputState] = useState('visible');
  const [totalPoints, setTotalPoints] = useState(1000);
  const [currentValue, setCurrentValue] = useState(parseInt(100)); //bet ammount
  const [showResult, setShowResult] = useState('');
  const [result, setResult] = useState();
  const [name, setName] = useState('default')

  const Payout = () => {
    if(result == 0){
      setTotalPoints(totalPoints-currentValue);
      setCurrentValue(parseInt((totalPoints-currentValue)/10));
    }
    else if(result == 1){
      setTotalPoints(totalPoints+currentValue);
      setCurrentValue(parseInt((totalPoints+currentValue)/10));
    }
    else{
      setTotalPoints(totalPoints+currentValue*1.5);
      setCurrentValue(parseInt((totalPoints+currentValue*1.5)/10));
    }
  }

  const handleClick = () => {
    changeGameState();
  }

  const changePlayAgainState = () => {
    if(playAgainButton == 'hidden') {
      setplayAgainButton('visible');
    }
    else {
      setplayAgainButton('hidden');
    }
  }

  const changeFinishState = () => {
    if(finishButton == 'hidden') {
      setFinishButton('visible');
    }
    else {
      setFinishButton('hidden');
    }
  }

  const changeGameState = () => {
    if(gameState == 'hidden') {
      setGameState('visible');
      setDealButtonState('hidden');
    }
    else {
      setGameState('hidden');
      setDealButtonState('visible');
    }
  }

  const changeSubmitState = () => {
    if(submitButton == 'hidden') {
      setSubmitButton('visible');
    }
    else {
      setSubmitButton('hidden');
    }
  }

  const addValue = () => {
    db.collection('leaderboard').add({name: name, score: totalPoints});
    console.log("sent to database");
  };

  return (
    <div className="App">
      <div style={{visibility: inputState}}>
        <input id='name' type='text' maxLength={20} placeholder='Enter Your Name' />
        <button onClick={() => {
          setName(document.getElementById("name").value)
          setInputState('hidden')
        }}>Submit Name</button>
      </div>
        <p>Total Points: {totalPoints}</p>
        <p>Your wager is {currentValue}</p>
      <div id='bet' style={{visibility: dealButtonState}}>
        <ReactSlider 
          className="customSlider"
          trackClassName="customSlider-track"
          thumbClassName="customSlider-thumb"
          min={1}
          max={totalPoints}
          value={currentValue}
          onChange={(value) => setCurrentValue(value)}
        />
        <br />
        <button onClick={handleClick}>Deal</button>
        <br />
      </div>
      <div id='Game' style={{visibility: gameState}}>
        {dealerHand.map(card => {
          return <img src={card.img} alt={card.value} style={{width:120, height:150}}/>
        })}
        <p />
        <button disabled={hitButtonStatus} onClick={() => {
          var tempHand = dealerHand;
          setHitButtonStatus(true);
          while(getHandtotal(tempHand) <= 16) {
            tempHand.push(newCardObj())
          }
          setDealerHand(tempHand);
          if (getHandtotal(dealerHand) > 21) {
            setResult(1);//SEND SOMETHING TO THE BETTING APP SAYING WIN
            setShowResult("Won " + currentValue);
            changePlayAgainState();
            changeFinishState();
          } else {
            if (playerHand.length == 2 && getHandtotal(playerHand) == 21) {
              setResult(2);//SEND SOMETHING TO THE BETTING APP SAYING BLACKJACK
              setShowResult("Blackjack! Won " + currentValue*1.5);
              changePlayAgainState();
              changeFinishState();
            } else if (getHandtotal(playerHand) > getHandtotal(dealerHand)) {
              setResult(1);//SEND SOMETHING TO THE BETTING APP SAYING WIN
              setShowResult("Won " + currentValue);
              changePlayAgainState();
              changeFinishState();
            } else {
              if(currentValue == totalPoints) {
                setShowResult('You ran out of points. You lost the game.');
                changeFinishState();
              } else {
              setResult(0);//SEND SOMETHING TO THE BETTING APP SAYING LOSE
              setShowResult('Lost ' + currentValue);
              changePlayAgainState();
              changeFinishState();
              }            
            }
          }
        }}
        >Stay</button>

        <button disabled={hitButtonStatus} onClick={() => {
          let total = getHandtotal(playerHand);
          let newCard = newCardObj();
          setPlayerHand([...playerHand, newCard]);
          total += newCard.value
          if (total > 21) {
            setHitButtonStatus(true);
            if (currentValue == totalPoints) {
              setShowResult('You ran out of points. You lost the game.');
                changeFinishState();
            } else {
              setResult(0);//SEND SOMETHING TO THE BETTING APP SAYING LOSE
              setShowResult('Busted! Lost ' + currentValue);
              changePlayAgainState();
              changeFinishState();
            }
          }
        }}
        >Hit</button>
        <p />
        {playerHand.map(item => {
          return <img src={item.img} alt={item.value} style={{width:120, height:150}}/>
          })}
      </div>
        <div id='restart' >
          <p style={{visibility: 'visible'}}> {showResult} </p>
          <button style={{visibility: playAgainButton}} onClick={() => {
            changeGameState();
            changePlayAgainState();
            changeFinishState();
            setShowResult('');
            Payout();
            setDealerHand([newCardObj()]);
            setPlayerHand([newCardObj(), newCardObj()]);
            setHitButtonStatus(false);
          }}
          >Play Again</button> 
          <button style={{visibility: finishButton}} onClick={() => {
            Payout();
            changePlayAgainState();
            changeFinishState();
            changeSubmitState();
          }}>Finish</ button>
          <br />
          <Link to="/Leaderboard">
            <button style={{visibility: submitButton}}onClick = {() => {
              if (totalPoints <= 1000) {
                console.log('go to leaderboard')
              } else {
                console.log('send info to database and go to leaderboard')
                
                addValue();
              }
            }}>Submit Score</button>
          </Link>
        </div>
    </div>
  );
}

export default App;