import './App.css';
import React, { useState } from 'react';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { upload } from '@testing-library/user-event/dist/upload';

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
  const [dealerHand, setDealerHand] = useState([newCardObj(), newCardObj()]);
  const [playerHand, setPlayerHand] = useState([newCardObj(), newCardObj()]);
  const [hitButtonStatus, setHitButtonStatus] = useState(false);
  const [endGameButtonStatus, setEndGameButtonStatus] = useState('hidden');

  return (
    <div className="App">
      {dealerHand.map(card => {
        return <img src={card.img} alt={card.value} style={{width:120, height:150}}/>
      })}
      <p />
      <button onClick={() => {
        var tempHand = dealerHand;
        while(getHandtotal(tempHand) <= 16) {
          tempHand.push(newCardObj())
        }
        setDealerHand(tempHand);
        console.log(dealerHand);
        if (getHandtotal(dealerHand) > 21) {
          //SEND SOMETHING TO THE BETTING APP SAYING WIN
          console.log('WIN: 1');
        } else {
          if (playerHand.length == 2 && getHandtotal(playerHand) == 21) {
            //SEND SOMETHING TO THE BETTING APP SAYING BLACKJACK
            console.log('BLACKJACK: 2');
          } else if (getHandtotal(playerHand) > getHandtotal(dealerHand)) {
            //SEND SOMETHING TO THE BETTING APP SAYING WIN
            console.log('WIN: 1');
          } else {
            //SEND SOMETHING TO THE BETTING APP SAYING LOSE
            console.log('LOSE: 0');
          }
        }
      }}
      >Stay</button>

      <button disabled={hitButtonStatus} onClick={() => {
        if (getHandtotal(playerHand) > 21) {
          //SEND SOMETHING TO THE BETTING APP SAYING LOSE
          console.log('LOSE: 0');
          setHitButtonStatus(true);
          setEndGameButtonStatus('visable');
        }
        setPlayerHand([...playerHand, newCardObj()]);
        console.log(getHandtotal(playerHand))
      }}
      >Hit</button>
      <p />
      {playerHand.map(item => {
        return <img src={item.img} alt={item.value} style={{width:120, height:150}}/>
        })}
        <p />
        <button style={{visibility:{endGameButtonStatus}}}>Play Again</button> 
        <button style={{visibility:{endGameButtonStatus}}}>Finish</button>
    </div>
  );
}

//use a state variable to decide wether the Play Again and Finish buttons are hidden
//need to ask how to send information to another react app -- maybe do this when the play again or finish buttons are pressed
//need to see how we would restart the game -- This would mean looking into adding play again and finish playing buttons when result is complete
//make it to where you can only see one of the dealers cards at the begining of the hand
export default App;