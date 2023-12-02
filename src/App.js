
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Die from './component/Die';
import './styles/App.css';
import Confetti from "react-confetti";

function App() {

  const [dice, setDice] = useState(randomDice()); 
  const [tanzia , setTanzia] = useState(false)


  useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const samValue = dice.every(die => die.value === firstValue)
    if(allHeld && samValue){setTanzia(true)}
  }, [dice])

  function newDice(){
    return {
       id: nanoid(), 
       value: Math.floor(Math.random() * 6) +1, 
       isHeld: false
    }
  }

  function randomDice(){
    const arrayDice = []
    for (let i = 0 ; i < 10 ; i ++){
      arrayDice.push(newDice())
    }
    return arrayDice
  }

  const renderDice = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} handleClick={()=> held(die.id)}/>
  ))

  function rollDice(){
    if(!tanzia){
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? {...die} :  newDice() 
      }))
    } else { 
      setTanzia(false)
      setDice(randomDice())
    }
    
  }

  function held(id){
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? 
      {...die, isHeld:!die.isHeld} : {...die}
    })
    )
  }

  return (

    <div className="App">
      {tanzia && <Confetti/>}
      <div className="title"><h1>TENZIES</h1></div>
      <div className="rules"><h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3></div>
      <div className="dice-container"> 
      {renderDice}
     </div>
     <button className="button" onClick={rollDice}>{tanzia ? "New Game" : "Roll"}</button>

    </div>
  );
}

export default App;
