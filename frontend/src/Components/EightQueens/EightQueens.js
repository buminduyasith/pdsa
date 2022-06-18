import './EightQueens.css';
import * as attack from './UnderAttack.js';
import * as helpers from './helpers.js';
import Chessboard from 'chessboardjsx';
import queenUnderAttackSvg from './shield.svg';
import React, { Component } from 'react';
import Status from './Status.js';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const gameName    = 'Eight Queens';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

class EightQueens extends Component {
    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            attacked: [], // Array of queens under attack
            position: {}, // Object of current board position
            gameStatus: 'playing',
            queensOnBoard: 0,
            queensUnderAttack: 0,
            showAttackPaths: false,
            attackedSquares: 0,
        };
        this.onSquareClick = this.onSquareClick.bind(this);
        this.toggleAttackPaths = this.toggleAttackPaths.bind(this);
    }

    /**
     * Player clicked on the chessboard
     *
     * @param square
     */
    onSquareClick = square => {
        let position = this.state.position; // Get the current board position
        if (position[[square]]) {
            delete position[[square]]; // Clicked on a Queen, delete it
        } else {
            if (Object.keys(position).length === 8) {
                return; // Max 8 queens on board
            }
            position[[square]] = 'wQ'; // Clicked on an empty square, add a Queen
        }

        // console.log(position);

        const attacked = attack.underAttack(position); // get array of Queens under attack

        Object.keys(position).forEach(function(square) { // For each queen on board
           if (attacked.includes(square) && square !== 'bQ') {   // if Queen is under attack
               position[square] = 'bQ';
           } else if (square !== 'wQ') { // If Queen is no longer under attack
               position[square] = 'wQ';
           }
        });

        let queensOnBoard = Object.keys(position).length;
        let queensUnderAttack = 0;
        if (attacked) {
            queensUnderAttack = attacked.length;
        }
        let gameStatus = 'playing';
        if (queensOnBoard === 8 && queensUnderAttack === 0) {
            gameStatus = 'solved';
        }

        this.setState({
            attacked: attacked,
            position: position,
            queensOnBoard: queensOnBoard,
            queensUnderAttack: queensUnderAttack,
            attackedSquares: attack.attackedSquares(position),
            gameStatus: gameStatus,
        });
    };

    /**
     * Play clicked the Attack Paths button
     */
    toggleAttackPaths() {
        const showAttackPaths = !this.state.showAttackPaths;
        let attackedSquares = this.state.attackedSquares;
        if (!showAttackPaths) {
            attackedSquares = attack.attackedSquares(this.state.position);
        }
        this.setState({
            showAttackPaths: showAttackPaths,
            attackedSquares: attackedSquares,
        });
    }

    /**
     * @returns {*}
     */
    render() {
        // force board refresh by using FEN string in _position_ and _key_ Chessboard props
        const fenPosition = helpers.objToFen(this.state.position);

        // Highlight squares under attack
        let squareStyles = {};
        let showAttackPathsText = 'Show';
        if (this.state.showAttackPaths) {
            showAttackPathsText = 'Hide';
            if (this.state.attackedSquares.length) {
                this.state.attackedSquares.forEach(function(square) {
                    squareStyles[square]= {
                        background: "radial-gradient(circle, orange, transparent 50%)",
                    };
                });
            }
        }

        return (
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                <Item>
                    <Status
                        queensOnBoard={this.state.queensOnBoard}
                        queensUnderAttack={this.state.queensUnderAttack}
                        position={this.state.position}
                        gameName={gameName}
                    />
                <div className="EightQueens-instructions" style={{"paddingBottom" : "50px"}}>
                    - Place <b>Eight Queens</b> Without paths being crossed!
                    <br />
                    - Click a square to place a Queen. Click a Queen to remove it.
                </div>
                    <Button variant="contained"  onClick={this.toggleAttackPaths} style={{"marginRight" : "15px"}}> {showAttackPathsText} attack paths</Button>
                    <Button variant="contained"  onClick={this.toggleAttackPaths} > <a href="./eight_queens" >Restart</a></Button>
                </Item>
                </Grid>
                <Grid item xs={8}>
                <Item>
                <Chessboard
                    id="EightQueens"
                    position={fenPosition}
                    key={fenPosition}
                    sparePieces={false}
                    draggable={false}
                    showNotation={true}
                    calcWidth={({screenWidth}) => (screenWidth < 500 ? 350 : 725)}
                    onSquareClick={this.onSquareClick}
                    squareStyles={squareStyles}
                    pieces={{
                        bQ: ({ squareWidth, isDragging }) => (
                            <img
                                style={{
                                    width: isDragging ? squareWidth * 1.75 : squareWidth,
                                    height: isDragging ? squareWidth * 1.75 : squareWidth
                                }}
                                src={queenUnderAttackSvg}
                                alt={"Under Attack"}
                            />
                        )
                    }}
                />
                </Item>
                </Grid>
            </Grid>
            </Box> 
        );
    }
}

export default EightQueens;
