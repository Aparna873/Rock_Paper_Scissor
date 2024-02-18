import { useEffect, useState } from 'react';
import './App.css';
import { Paper } from './components/Paper';
import { Rock } from './components/Rock';
import { Scissor } from './components/Scissor';

const choices=[
  {id:1 , name:'rock' , component:Rock ,loosesTo:2},
  {id:2 , name:'paper' , component:Paper , loosesTo:3},
  {id:3 , name:'scissor' , component:Scissor , loosesTo:1}
];
// 1. Handles wins+losses
// 2. determine the winner based on choices
// 3. reset the game

function App() {
  const [wins,setWins]=useState(0);
  const [losses,setLosses]=useState(0);
  const [userChoice,setuserChoice]=useState(null);
  const [computerChoice,setcomputerChoice]=useState(null);
  const [gameState,setgameState]=useState(null);//  win,lose,draw

  useEffect(()=>{
    const randomChoice=choices[Math.floor(Math.random()*choices.length)];

    setcomputerChoice(randomChoice);
  },[])
   
  function restartGame()
  {
    setgameState(null);
    const randomChoice=choices[Math.floor(Math.random()*choices.length)];
    setcomputerChoice(randomChoice);
  }
  function startNewGame()
  {
    setLosses(0);
    setWins(0);
    setgameState(null);
    const randomChoice=choices[Math.floor(Math.random()*choices.length)];
    setcomputerChoice(randomChoice);
  }
  function handleUserChoice(choice)
  {
      const chosenChoice=choices.find(c=>c.id===choice);
      setuserChoice(chosenChoice);

      // determine the winner
       if(chosenChoice.loosesTo===computerChoice.id )
       {
      //lose
      setLosses(losses=>losses+1);
      setgameState('lose');
       }
       
      else if(computerChoice.loosesTo===chosenChoice.id )
       {
      //win
      setWins(wins=>wins+1);
      setgameState('win');
       }
       
      else if(chosenChoice.id===computerChoice.id )
       {
      //draw
      setgameState('draw');
       }
  }

  function renderComponent(choice)
  {
     const Component=choice.component;
     return <Component/>
  }
  return (
    <div className="App">
      <div className='info'>
          <h2>Rock. Paper. Scissors</h2>
          <div className='wins-losses'>
            <div className="wins">
               <span className="number">{wins}</span>
               <span className="text">{wins === 1 ? 'win' : 'wins'}</span>
            </div>
            <div className="losses">
               <span className="number">{losses}</span>
               <span className="text">{losses === 1 ? 'lose' : 'losses'}</span>
            </div>
          </div>
      </div>
      {/* the popup to show win/lose/draw */}
      {gameState &&
      <div className={`game-state ${gameState}`}>
      <div>
        <div className='game-state-content'>
          <p>{renderComponent(userChoice)}</p>
       {/* <p>You {gameState}!</p> */}
       {gameState==='win' && <p>Congrats! You Won!</p>}
       {gameState==='lose' && <p>Sorry! You lost!</p> }
       {gameState==='draw' && <p>Ooops! You Drew!</p> }
       <p>{renderComponent(computerChoice)}</p>
        </div>
        <div className='buttons'>
        <button onClick={()=>restartGame()}>Play Again</button>
        <button onClick={()=>startNewGame()}>New Game</button>
        </div>
      </div>
    </div>
    }
      <div className="choices">
        <div className="choice-1">You</div>
      <div className="choice-2">Computer</div>
      </div>
      {/* buttons for my choice */}
      <div className='result'>
      <div className='btn'>
        <button className="rock" onClick={()=>{
          handleUserChoice(1)
        }}>
          <Rock/>
        </button>
        <button className="paper"  onClick={()=>{
          handleUserChoice(2)
        }}>
          <Paper/>
        </button>
        <button className="scissor"  onClick={()=>{
          handleUserChoice(3)
        }}>
          <Scissor/>
        </button>
      </div>
      <div className="vs">VS</div>
      <div className="computer-choice">
        <button className='question'>?</button>
      </div>
      </div>
    </div>
  );
}

export default App;
