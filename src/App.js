import { useState } from 'react';
import { uniq, bad_guesses, word_view, lives_left, bulls_cows, guesses_table, bc_table } from './game';
import './App.css';

function App() {
  const [secret, setSecret] = useState(randomGen());
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");


  let view = word_view(secret, guesses);
  let bads = bad_guesses(secret, guesses); //an array of bad guesses
  //recalculating bad guesses from guesses everytime
  let bc = bulls_cows(secret, guesses);
  let lives = lives_left(secret, guesses); //number of lives left

  function randomGen() {
    let set = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let randomNum = "";
    for (let i = 0; i < 4; i++) {
      //value located at a random position in set
      let index = Math.floor(Math.random() * set.size);
      let arr = Array.from(set);
      let digit = arr[index];
      set = new Set(arr);
      //add that value to the number
      randomNum += digit.toString();
      //remove that value
      set.delete(digit);
    }
    return randomNum;
  }

  function updateGuess(ev) {
    let text = ev.target.value;
    if (text.length > 4) {
      text = text.substring(0,4);
    }
    setGuess(text);
  }

  function makeGuess() {
    setGuesses(uniq(guesses.concat(guess)));
    setGuess("");
  }

  function keypress(ev) {
    if (ev.key == "Enter") {
      makeGuess();
    }
  }

  if (lives <= 0) {
    return (
      <div className="App">
        <h1>You Lost!</h1>
        <h2>The answer was {secret}</h2>
        <p>
          <button onClick={() => setGuesses([])}>
            Reset
          </button>
        </p>
      </div>
    );
  }

  for (let gg of guesses) {
    if (gg === secret) {
      return (
        <div className="App">
          <h1>You Won!</h1>
          <h2>The answer was {secret}</h2>
          <p>
            <button onClick={() => setGuesses([])}>
              Reset
          </button>
          </p>
        </div>
      );
    }
  }


  function Table() {
    let rows = [];
    for (let i = 0; i < 9; i++) {
      rows.push(
        <tr>
          <td>{guesses[i]}</td>
          <td>{bc[i]}</td>
        </tr>)
    }
    return rows;
  }



  return (
    <div className="App">
      <div className="App-header">
        <h1 id="gamename">Cows and Bulls Game!</h1>
        <div id="instructions">
          <h3>Discover the hidden code.</h3>
          <h3>Type in a four digit number with no repeating digits.</h3>
          <h3>Bulls = correct number, correct position</h3>
          <h3>Cows = correct code, wrong position</h3>
        </div>
        <h2>Answer: {secret}</h2>


        <h2>Lives: {lives}</h2>
        <p>
          <input type="text"
            value={guess}
            onChange={updateGuess}
            onKeyPress={keypress} />
          <button onClick={makeGuess}>
            Guess
        </button>
        </p>

        <table>
          <tr>
            <th id="guesses"><h2>Guesses:</h2></th>
            <th id="bcs"><h2>Bulls/Cows:</h2></th>
          </tr>


          <Table></Table>

        </table>


        <p>
          <button onClick={() => setGuesses([])}>
            Reset
        </button>
        </p>
      </div>
    </div>
  );
}

export default App;
