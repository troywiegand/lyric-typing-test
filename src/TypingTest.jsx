import React, { Component } from 'react';
import './TypingTest.css'
import UserInputScoreboard from './UserSubmitScore';

var divStyle = {
  overflow: 'none',
  height: '0px',
  background: 'transparent',
}


class TypingTest extends Component {

  constructor() {
    super()
    this.state = {
      currentString: "",
      nextString: "",
      typingString: "",
      victoryMessage: "Enter Your Name Below to Earn Your Place on the Leaderboard!",
      classOfText: "good",
      stringArray: [],
      showVictory: false,
      showLines: true,
      milliseconds: 0,
      startTyping: false,
      userInputScoreboardVisible: false,
      songUUID: "fakeUUID",
      songCharLength: 0,
    }

  }

  componentDidMount() {
    let songLines = this.props.songArray
    let newCurrent = songLines.shift()
    let newNext = songLines.shift()
    this.setState({
      currentString: newCurrent,
      nextString: newNext,
      stringArray: songLines,
      songLineLength: this.props.songArray.length
    })
  }

  checkRenderBad = () => {
    if (this.state.typingString !== this.state.currentString.substring(0, this.state.typingString.length))
      this.setState({ classOfText: "bad" })
    else this.setState({ classOfText: "good" })
  }

  goodLine = (ev) => {
    let newCurrentLine = ""
    let newNextLine = ""
    let currentStuff = ""
    if (this.state.nextString !== "") {
      newCurrentLine = this.state.nextString
      if (this.state.stringArray.length > 0) {
        currentStuff = this.state.stringArray
        newNextLine = currentStuff.shift()
        ev.preventDefault()
        this.setState({
          currentString: newCurrentLine,
          nextString: newNextLine,
          stringArray: currentStuff,
          typingString: "",
          classOfText: "good"
        })
      } else {
        ev.preventDefault()
        this.setState({
          currentString: newCurrentLine,
          nextString: "", typingString: "", classOfText: "good"
        })
      }
    } else {
      ev.preventDefault()
      clearInterval(this.timer)
      this.setState({ currentString: "", typingString: "", showLines: false, showVictory: true, userInputScoreboardVisible: true })
    }
  }

  checkLine = (ev) => {
    if (this.state.nextString === "" && this.state.currentString.substring(0, this.state.currentString.length - 1) === this.state.typingString) {
      this.goodLine(ev)
    }
    else if (this.state.currentString === this.state.typingString || (this.state.typingString.charAt(this.state.typingString.length - 1) === " " && this.state.currentString === this.state.typingString.substring(0, this.state.typingString.length - 2))) {
      this.goodLine(ev)
    }
  }


  handleChangeTypingString = (ev) => {
    if (this.state.startTyping)
      this.setState({ typingString: ev.target.value }, this.checkRenderBad)
    else {
      this.timer = setInterval(() => { this.setState({ milliseconds: (this.state.milliseconds + 1) }) }, 10)
      this.setState({ typingString: ev.target.value, startTyping: true }, this.checkRenderBad)
    }
  }

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ' || ev.key === this.state.currentString.charAt(this.state.currentString.length - 1)) {
      this.checkLine(ev)
    }
  }

  createUserInputScoreboard = () => {
    if (this.state.userInputScoreboardVisible)
      return (<UserInputScoreboard scoreTime={this.state.milliseconds} songUUID={this.state.songUUID} />)
    else return (<div />)
  }

  render() {
    return (
      <div className="TypingTest">
        <br />
        <div style={divStyle}>
          <input autoComplete="off" id="typingField" className={this.state.classOfText} type="text" name="typing"
            autoFocus placeholder="Type Here... "
            value={this.state.typingString}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChangeTypingString}

          />
          <br />
          <div hidden={!this.state.showVictory} className="victoryText">
            {this.state.victoryMessage}
          </div>
          <div hidden={!this.state.showLines}>
            <div className="displayText">
              {this.state.currentString}
            </div>
            <br />
            <div className="displayText">
              {this.state.nextString}
            </div>

          </div>
          <br />
          <div>
          {this.createUserInputScoreboard()}
            {Math.round(this.state.milliseconds / 10) / 10} seconds
          </div>
         
        </div>
      </div>

    );
  }
}

export default TypingTest;

