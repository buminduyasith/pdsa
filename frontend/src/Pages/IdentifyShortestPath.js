import React, { useEffect, useRef, useState } from 'react';
import ShortestPathGraph from '../Components/ShortestPathGraph';
import Swal from 'sweetalert2'
import '../Assets/Styles/IdentifyShortestPath.css';
import shortestPathimage from "../Assets/Images/shortestPathCover.gif";
import axios from 'axios'
function IdentifyShortestPath() {

  const [isGameStart, setGameStart] = useState(false)
  const [userName, setUserName] = useState("")
  const [roundCount, setRoundCount] = useState(1)
  const [userDetail, setuserDetail] = useState({})

  const startGame = async () => {

    // const { value: name } = await Swal.fire({
    //   title: 'Identity shortest path',
    //   input: 'text',
    //   inputLabel: 'Please Enter Your Name',
    // })
    var userGameName = "";

    const { value: username } = await Swal.fire({
      title: 'Identify shortest path - Sign in',
      inputPlaceholder: 'Enter your Username',
      input: 'text'
      
    })
    
    if (username) {

      Swal.fire({
        title: 'Identify shortest - Sign in',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Start',
        showLoaderOnConfirm: true,
        inputPlaceholder: "Enter your Password",
  
  
        preConfirm: (password) => {
          return   axios.post(`Game/signin`, {
            "userName": username,
            "password": password
           })
            .then(response => {
              console.log(response)
              setUserName(username);
              setuserDetail(response.data);
              return response
            })
            .catch(error => {
              console.log(error)
              Swal.showValidationMessage(
                `Request failed: ${error.response.data?.Errors[0].ErrorMessage}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          setGameStart(true);
        }
      })
      
    }

  }

  const RegisterAndStatGame = async () => {

    var userGameName = "";

    const { value: username } = await Swal.fire({
      title: 'Identify shortest path - Sign up',
      inputPlaceholder: 'Enter your Username',
      input: 'text'
      
    })
    
    if (username) {

      Swal.fire({
        title: 'Identify shortest path - Sign up',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Start',
        showLoaderOnConfirm: true,
        inputPlaceholder: "Enter your Password",
  
  
        preConfirm: (password) => {
          return   axios.post(`Game/signup`, {
            "userName": username,
            "password": password
           })
            .then(response => {
              console.log(response)
              setUserName(username);
              setuserDetail(response.data);
              return response
            })
            .catch(error => {
              console.log(error)
              Swal.showValidationMessage(
                `Request failed: ${error.response.data?.Errors[0].ErrorMessage}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          setGameStart(true);
        }
      })
      
    }
  }

  const setRoundCountHandler = () =>{
    setRoundCount(roundCount + 1)
  }

  const getRoundCountHandler = () =>{
    console.log(roundCount)
    return roundCount;
  }

  return (
    <div className="App">


      {!isGameStart &&
        <div>
          <h2>Identify  Shortest Path</h2>
          <div>
            <img src={shortestPathimage} />
          </div>
         <div className='register'>
         <button className="btn btn-primary btn-round-2" onClick={RegisterAndStatGame}>Sign up</button>
         <button className="btn btn-primary btn-round-2" onClick={startGame}>Sign in</button>
           </div>
        </div>
      }



      {isGameStart &&
        <div>
          <h4><b>{userName && userName}</b> is logged in.</h4>
          <div>
            <h4>Round {roundCount}</h4>
          </div>

          <div>
          <ShortestPathGraph resetHandler = {setRoundCountHandler} getGameRound = {getRoundCountHandler} />
          </div>
        


        </div>
      }



    </div>
  );
}

export default IdentifyShortestPath;

{/* <button class="btn btn-primary btn-round-2">Primary</button>
<button class="btn btn-success btn-round-2">Success</button>
<button class="btn btn-warning btn-round-2">Warning</button>
<button class="btn btn-danger btn-round-2">Danger</button> */}