import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from './words.js';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    maxGuesses:6
  };

  constructor(props) {
    super(props);
  
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleReset=this.handleReset.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
   
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
     
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    console.log(ltr)
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
   
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
      key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  handleReset(){
    this.setState({
      nWrong: 0,
       guessed: new Set(), 
       answer: randomWord()
    })
  }

  /** render: render game */
  render() {
    const altText= `${this.state.nWrong}/${this.props.maxWrong} guesssed`;
   const loser = this.state.nWrong >= this.props.maxWrong;
 const winner = this.guessedWord().join("")===this.state.answer;
let buttonGenerator = this.generateButtons();
if(loser) buttonGenerator="YOU LoSe THe GaMe";
if(winner) buttonGenerator="YOU Won THe GaMe";
    return (
      <div>
      <div className='Hangman'>
      <h3>Hangman</h3>
         <img src={this.props.images[this.state.nWrong]} alt={altText}/>
         <p>Number of Wrong Guesses:{this.state.nWrong}</p>
   
         <p className='Hangman-word'>{ this.props.maxWrong > this.state.nWrong ? this.guessedWord() : this.state.answer}</p>
         <p className='Hangman-btns'>{buttonGenerator}</p>
         </div>
         <button className="reset" onClick={this.handleReset}>Reset</button>
         </div>
     
     
        

    );
  }
}

export default Hangman;
