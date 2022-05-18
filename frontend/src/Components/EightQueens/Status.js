import React, { Component } from 'react';
import './Status.css';

const allSolutions = {
    "s1":{},
    "s2":{},
    "s3":{},
    "s4":{},
    "s5":{},
    "s6":{},
    "s7":{},
    "s8":{},
    "s9":{},
    "s10":{},
    "s11":{},
    "s12":{},
}

class Status extends Component {
    render() {
        const numberQueensNeeded = 8 - this.props.queensOnBoard;
        let gameStatus = numberQueensNeeded + ' Queen';
        if (numberQueensNeeded > 1) {
            gameStatus += 's';
        }
        gameStatus += ' needed';

        let statusClass = 'EightQueens-playing';

        if (!numberQueensNeeded) {
            gameStatus = 'Not Solved';
            statusClass = 'EightQueens-not';
        }

        if (this.props.queensOnBoard === 8 && this.props.queensUnderAttack === 0) {
            gameStatus = 'SOLVED! YOU WIN';
            statusClass = 'EightQueens-win';
        }

        return (
            <div className="EightQueens-status">
                <b>{this.props.queensOnBoard}</b> Queens on board
                <br />
                <b>{this.props.queensUnderAttack}</b> Queens attacked
                <br />
                <div className={statusClass}>{gameStatus}</div>
                {gameStatus === 'SOLVED! YOU WIN' ? 
                <input type='text' placeholder='Enter Your Name'/> : ''}
                {gameStatus === 'SOLVED! YOU WIN' ? 
                <button type='button' className='primary-btn'>Submit Your Answer</button> : ''}
            </div>
        );
    }
}

export default Status;
