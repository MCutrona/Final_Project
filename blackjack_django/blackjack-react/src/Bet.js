import logo from './logo.svg';
import './App.css';
import React, { useState,useEffect } from 'react';
import ReactSlider from "react-slider";

//total global variable?
const Slider = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [showPayout, setShowPayout] = useState(false);
  const handleClick = event => {
    setShowPayout(current => !current);
  }
  return (
    <div>
      <p>Your wager is ${currentValue}</p>
      <ReactSlider 
      className="customSlider"
      trackClassName="customSlider-track"
      thumbClassName="customSlider-thumb"
      defaultValue={0}
      min={0}
      max={100}
      value={currentValue}
      onChange={(value) => setCurrentValue(value)}
      />
      <br></br>
      <button onClick={handleClick}>Deal</button>
      <br></br>
      <br></br>
      {showPayout && <Payout bet={currentValue}/>}

    </div>
  );
};
function Profit(props) {
  let s = props.bet
  return (
    {s}
  )
}
function Payout(props) {
  let bet = props.bet;
  var result = 1;
  var str = "Busted! Lost $"
  if(result == 0){
    bet=bet;
  }
  else if(result == 1){
    str = "Won $"
  }
  else{
    bet = bet*1.5;
    str = "Blackjack! Won $"
  }

  return (
    <div>
      {str}{bet}
    </div>
  )
}
function App () {
  return (
    <div className="App">
      <Slider />
    </div>
  );
}

export default App;
