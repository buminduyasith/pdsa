import React, { useEffect, useRef, useState } from 'react';
import ShortestPathGraph from '../Components/ShortestPathGraph';
import Swal from 'sweetalert2'
import '../Assets/Styles/IdentifyShortestPath.css';
import shortestPathimage from "../Assets/Images/shortestPathCover.gif";
function IdentifyShortestPath() {

  const [isGameStart, setGameStart] = useState(false)
  const [userName, setUserName] = useState("")
  const [roundCount, setRoundCount] = useState(1)

  const startGame = async () => {

    // const { value: name } = await Swal.fire({
    //   title: 'Identity shortest path',
    //   input: 'text',
    //   inputLabel: 'Please Enter Your Name',
    // })
    var userGameName = "";

    Swal.fire({
      title: 'Identify shortest path',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Start',
      showLoaderOnConfirm: true,
      inputPlaceholder: "Please Enter Your Name",

      preConfirm: (name) => {
        return fetch(`//api.github.com/users/${name}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            setUserName(name);
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        setGameStart(true);
      }
    })





    // Swal.fire({
    //   title: 'Error!',
    //   text: 'Do you want to continue',
    //   icon: 'error',
    //   confirmButtonText: 'Cool'
    // })
  }

  return (
    <div className="App">


      {!isGameStart &&
        <div>
          <h2>Identify  Shortest Path</h2>
          <div>
            <img src={shortestPathimage} />
          </div>
          <button className="btn btn-primary btn-round-2" onClick={startGame}>Start Game</button>
        </div>
      }



      {isGameStart &&
        <div>
          <h4> The user <b>{userName && userName}</b> is logged in.</h4>
          <div>
            <h4>Round {roundCount}</h4>
          </div>

          <div>
          <ShortestPathGraph />
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