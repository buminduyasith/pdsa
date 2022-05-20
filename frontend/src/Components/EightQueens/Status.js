import React, { Component } from 'react';
import './Status.css';
import { deepEqual } from 'fast-equals';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

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
    constructor() {
        super();
        this.state = 
        {value: '',
        crrposition: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
            this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        if(this.state.value === '' || this.state.value === ' '){
            alert('The Name Cannot be Empty!');
            event.preventDefault();
        }else {
            alert('A name was submitted: ' + this.state.value);
            event.preventDefault();
        }
      }
    
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

        this.state.crrposition = this.props.position;

        let position = this.props.position;

        let ans = false;

        for (let x in allSolutions) {
            if (deepEqual(position,allSolutions[x]) === true) {
                ans = true;
            }
        }


        return (
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                     {this.props.gameName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Queens on board - {this.props.queensOnBoard}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Queens on attack - {this.props.queensUnderAttack}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{"paddingBottom": "10px"}}>
                        <div className={statusClass}>{gameStatus}</div>  
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                    <Typography variant="body2" color="text.secondary" style={{"paddingBottom": "50px"}}>
                        {gameStatus === 'SOLVED! YOU WIN' ? 
                        <TextField id="outlined-basic" label="Enter Your Name" variant="outlined" style={{"paddingRight": "10px"}} value={this.state.value} onChange={this.handleChange} /> : ''}
                        {gameStatus === 'SOLVED! YOU WIN' ? 
                        <Button type="submit" variant="contained">Submit Your Answer</Button> : ''}
                    </Typography>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
        );
    }
}

export default Status;
