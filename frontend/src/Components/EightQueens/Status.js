import React, { Component } from 'react';
import './Status.css';
import { deepEqual } from 'fast-equals';

const allSolutions = {
    "s1":{a8:"wQ", b2:"wQ",c4:"wQ",d1:"wQ",e7:"wQ",f5:"wQ",g3:"wQ",h6:"wQ"},
    "s2":{a8:"wQ", b2:"wQ",c5:"wQ",d3:"wQ",e1:"wQ",f7:"wQ",g4:"wQ",h6:"wQ"},
    "s3":{a3:"wQ", b8:"wQ",c4:"wQ",d7:"wQ",e1:"wQ",f6:"wQ",g2:"wQ",h5:"wQ"},
    "s4":{a5:"wQ", b8:"wQ",c4:"wQ",d1:"wQ",e7:"wQ",f2:"wQ",g6:"wQ",h3:"wQ"},
    "s5":{a4:"wQ", b8:"wQ",c1:"wQ",d5:"wQ",e7:"wQ",f2:"wQ",g6:"wQ",h3:"wQ"},
    "s6":{a6:"wQ", b8:"wQ",c2:"wQ",d4:"wQ",e1:"wQ",f9:"wQ",g5:"wQ",h3:"wQ"},
    "s7":{a4:"wQ", b8:"wQ",c5:"wQ",d3:"wQ",e1:"wQ",f6:"wQ",g2:"wQ",h6:"wQ"},
    "s8":{a2:"wQ", b8:"wQ",c6:"wQ",d1:"wQ",e3:"wQ",f5:"wQ",g7:"wQ",h4:"wQ"},
    "s9":{a4:"wQ", b8:"wQ",c1:"wQ",d3:"wQ",e6:"wQ",f2:"wQ",g7:"wQ",h5:"wQ"},
    "s10":{a4:"wQ", b2:"wQ",c8:"wQ",d5:"wQ",e7:"wQ",f1:"wQ",g3:"wQ",h6:"wQ"},
    "s11":{a3:"wQ", b6:"wQ",c8:"wQ",d1:"wQ",e5:"wQ",f7:"wQ",g2:"wQ",h4:"wQ"},
    "s12":{a4:"wQ", b6:"wQ",c8:"wQ",d2:"wQ",e7:"wQ",f1:"wQ",g3:"wQ",h5:"wQ"},
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

        let position = this.props.position;

        let ans = false;

        for (let x in allSolutions) {
            if (deepEqual(position,allSolutions[x]) === true) {
                ans = true;
            }
            // {deepEqual(position,allSolutions.s1)}
        }

        // if (Object.keys(position).length === 8) {
        //     return; // Max 8 queens on board
        // }

        return (
            <div className="EightQueens-status">
                <b>{this.props.queensOnBoard}</b> Queens on board
                <br />
                {console.log(ans)}
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
