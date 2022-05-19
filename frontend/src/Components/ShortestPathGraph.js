import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2'
import '../Assets/Styles/ShortestPathGraph.css';
const MIN_DISTANCE = 5;
const MAX_DISTANCE = 50;


function ShortestPathGraph() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false)
  const [userName, setUserName] = useState("")
  const [distanceInputs, setDistanceInputs] = useState([])
  const [startNode, setStartNode] = useState("")
  const [isAnswerCorrect, setAnswerCorrect] = useState(false)

  const [formFields, setFormFields] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [runagain, setRunagain] = useState(false);

  var nodes = "A B F E D C".split(" ");
  

  useEffect(() => {
    console.log("hi from useEffect")
    const canvas = canvasRef.current;
    canvas.width = "500" //window.innerWidth * 2;
    canvas.height = "320" //window.innerHeight * 2;
    canvas.style.width = "500px" //`${window.innerWidth}px`
    canvas.style.height = "320px" //`${window.innerHeight}px`

    const context = canvas.getContext("2d");
    //context.scale(2,2);
    // context.lineCap = "round"
    // context.strokeStyle = "white"
    context.lineWidth = 3
    contextRef.current = context;

    var coords = [[20, 85], [129, 33], [305, 40], [469, 176], [238, 160], [205, 290]];



    const tempStartNode = nodes[Math.floor((Math.random() * nodes.length))]
    setStartNode(tempStartNode)

    const allinputsData = [
      { startNode: tempStartNode, endNode: "A", shortestPath: (tempStartNode == "A" ? "-" : ""), distance: 0, disabled: (tempStartNode == "A") },
      { startNode: tempStartNode, endNode: "B", shortestPath: (tempStartNode == "B" ? "-" : ""), distance: 0, disabled: (tempStartNode == "B") },
      { startNode: tempStartNode, endNode: "C", shortestPath: (tempStartNode == "C" ? "-" : ""), distance: 0, disabled: (tempStartNode == "C") },
      { startNode: tempStartNode, endNode: "D", shortestPath: (tempStartNode == "D" ? "-" : ""), distance: 0, disabled: (tempStartNode == "D") },
      { startNode: tempStartNode, endNode: "E", shortestPath: (tempStartNode == "E" ? "-" : ""), distance: 0, disabled: (tempStartNode == "E") },
      { startNode: tempStartNode, endNode: "F", shortestPath: (tempStartNode == "F" ? "-" : ""), distance: 0, disabled: (tempStartNode == "F") }
    ]

    setFormFields(allinputsData)


    console.log(`startNode - ${startNode} - ${tempStartNode}`);
    setDistanceInputs(nodes.filter(function (value, index, arr) {
      return value != tempStartNode;
    }));

    var basicGraph = [
      { start: "A", finish: "B", distance: randomIntFromInterval(MIN_DISTANCE, MAX_DISTANCE) },
      { start: "A", finish: "C", distance: randomIntFromInterval(MIN_DISTANCE, MAX_DISTANCE) },
      { start: "B", finish: "F", distance: randomIntFromInterval(MIN_DISTANCE, MAX_DISTANCE) },
      { start: "B", finish: "D", distance: randomIntFromInterval(MIN_DISTANCE, MAX_DISTANCE) },
      { start: "C", finish: "E", distance: randomIntFromInterval(MIN_DISTANCE, MAX_DISTANCE) },
      { start: "F", finish: "E", distance: randomIntFromInterval(MIN_DISTANCE, MAX_DISTANCE) },
      { start: "D", finish: "F", distance: randomIntFromInterval(MIN_DISTANCE, MAX_DISTANCE) },
      { start: "D", finish: "E", distance: randomIntFromInterval(MIN_DISTANCE, MAX_DISTANCE) }
    ];

    setGraphData(basicGraph)

    //#region create circles with text
    contextRef.current.beginPath();
    for (var i = 0; i < coords.length; i++) {

      contextRef.current.beginPath();


      contextRef.current.moveTo(coords[i][0], coords[i][1]);
      contextRef.current.arc(coords[i][0], coords[i][1], 10, 0, Math.PI * 2, false);

      if (tempStartNode === nodes[i]) {
        contextRef.current.fillStyle = "green";
        contextRef.current.fill();
      }
      else {
        contextRef.current.fillStyle = "red";
        contextRef.current.fill();
      }



      contextRef.current.font = '8pt Calibri';
      contextRef.current.fillStyle = 'white';
      contextRef.current.textAlign = 'center';
      contextRef.current.fillText(nodes[i], coords[i][0], coords[i][1] + 3);

      contextRef.current.closePath();

    }
    //#endregion

    //#region lines with text
    //AB
    contextRef.current.beginPath();
    contextRef.current.moveTo(28, 80);
    contextRef.current.lineTo(120, 33);
    contextRef.current.stroke();
    contextRef.current.font = "18px Arial";
    contextRef.current.fillStyle = "red";
    contextRef.current.fillText(basicGraph[0].distance, 57, 41);

    //Bf
    contextRef.current.beginPath();
    contextRef.current.moveTo(138, 32);
    contextRef.current.lineTo(295, 38);
    contextRef.current.stroke();
    contextRef.current.font = "18px Arial";
    contextRef.current.fillStyle = "red";
    contextRef.current.fillText(basicGraph[2].distance, 219, 23);

    // contextRef.current.fillText(basicGraph[1].distance, 80, 187);

    //FE
    contextRef.current.beginPath();
    contextRef.current.moveTo(315, 41);
    contextRef.current.lineTo(463, 170);
    contextRef.current.stroke();
    contextRef.current.font = "18px Arial";
    contextRef.current.fillStyle = "red";
    contextRef.current.fillText(basicGraph[5].distance, 389, 92);

    //DE
    contextRef.current.beginPath();
    contextRef.current.moveTo(463, 170);
    contextRef.current.lineTo(247, 157);
    contextRef.current.stroke();
    contextRef.current.font = "18px Arial";
    contextRef.current.fillStyle = "red";
    contextRef.current.fillText(basicGraph[7].distance, 371, 151);


    //DF
    contextRef.current.beginPath();
    contextRef.current.moveTo(247, 157);
    contextRef.current.lineTo(298, 45);
    contextRef.current.stroke();
    contextRef.current.font = "18px Arial";
    contextRef.current.fillStyle = "red";
    contextRef.current.fillText(basicGraph[6].distance, 258, 99);


    //BD
    contextRef.current.beginPath();
    contextRef.current.moveTo(228, 158);
    contextRef.current.lineTo(131, 43);
    contextRef.current.stroke();
    contextRef.current.font = "18px Arial";
    contextRef.current.fillStyle = "red";
    contextRef.current.fillText(basicGraph[3].distance, 140, 95);

    //AC
    contextRef.current.beginPath();
    contextRef.current.moveTo(21, 93);
    contextRef.current.lineTo(195, 287);
    contextRef.current.stroke();
    contextRef.current.font = "18px Arial";
    contextRef.current.fillStyle = "red";
    contextRef.current.fillText(basicGraph[1].distance, 85, 190);

    //CE
    contextRef.current.beginPath();
    contextRef.current.moveTo(215, 289);
    contextRef.current.lineTo(461, 180);
    contextRef.current.stroke();
    contextRef.current.font = "18px Arial";
    contextRef.current.fillStyle = "red";
    contextRef.current.fillText(basicGraph[4].distance, 300, 234);

    //#endregion

  }, [runagain])

  const handleFormChange = (e, i) => {
    console.log("form submitted", i);
    var data = [...formFields]
    data[i][e.target.name] = e.target.value.toUpperCase();
    setFormFields(data)

  }

  const submit = (e) => {
    e.preventDefault();

    var graph = readyGraph(graphData);
    var start = startNode;
    var finish = "E";
  
    var shortestPath = solve(graph, start, finish);

    nodes.forEach(element => {
      var answerOfShortestPath =  shortestPath.results[element]
      var userinput = formFields.filter(item=> item.startNode===start && item.endNode === element);
      var userinputSPath = userinput[0].shortestPath

      console.log(JSON.stringify(userinputSPath))
     // console.log(JSON.stringify(answerOfShortestPath))
      if(JSON.stringify(answerOfShortestPath) === JSON.stringify(userinputSPath.split(","))){
        //setAnswerCorrect(true);
      }
      else{
        //setAnswerCorrect(false);
      }
      
      var result = false;
      if(result){
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The answer is not correct',
          showCancelButton: true,
          confirmButtonText: 'Try again',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            setRunagain(runagain == true ? false : true);
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })

      }

    });
  }

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log(offsetX, offsetY)
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  const finishDrawing = ({ nativeEvent }) => {
    //  contextRef.current.closePath();
    setIsDrawing(false);
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  function solve(graph, s, f) {
    // debugger;
    var solutions = {};
    solutions[s] = [];
    solutions[s].dist = 0;
    while (true) {
      var parent = null;
      var nearest = null;
      var dist = Infinity;
      for (var n in solutions) {
        if (!solutions[n])
          continue
        var ndist = solutions[n].dist;
        var adj = graph[n];
        for (var a in adj) {
          if (solutions[a])
            continue;
          var d = adj[a] + ndist;
          if (d < dist) {
            parent = solutions[n];
            nearest = a;
            dist = d;
          }
        }
      }
      if (dist === Infinity) {
        break;
      }
      solutions[nearest] = parent.concat(nearest);
      solutions[nearest].dist = dist;
    }
    var finish = solutions[f];
    return { results: solutions, path: finish, distance: finish.dist };
  }

  function readyGraph(paths) {
    // debugger;
    var graph = {};
    for (var i in paths) {
      var path = paths[i];
      var start = path["start"];
      var finish = path["finish"];
      var distance = path["distance"];
      if (typeof graph[start] == "undefined") {
        graph[start] = {};
        graph[start][finish] = distance;
      } else {
        graph[start][finish] = distance;
      }
      if (typeof graph[finish] == "undefined") {
        graph[finish] = {};
        graph[finish][start] = distance;
      } else {
        graph[finish][start] = distance;
      }
    }
    return graph;
  }

  const find = () => {

    var graph = readyGraph(graphData);
    var start = "B" //startNode;
    var finish = "E";
   // console.log("start", start, "fi", finish)
    var shortestPath = solve(graph, start, finish);
   // console.log(shortestPath);

    const ans = [{ "startNode": "B", "endNode": "A", "shortestPath": "A,V", "distance": "10", "disabled": false }, { "startNode": "B", "endNode": "B", "shortestPath": "-", "distance": 0, "disabled": true }, { "startNode": "B", "endNode": "C", "shortestPath": "F,E,C", "distance": "20", "disabled": false }, { "startNode": "B", "endNode": "D", "shortestPath": "A,K", "distance": "30", "disabled": false }, { "startNode": "B", "endNode": "E", "shortestPath": "", "distance": 0, "disabled": false }, { "startNode": "B", "endNode": "F", "shortestPath": "", "distance": 0, "disabled": false }]
  //  console.log(ans)
  //  console.log(shortestPath.results);
  console.log(JSON.stringify(shortestPath))
    console.log("------");
    nodes.forEach(element => {
      console.log(JSON.stringify(shortestPath))
      var answerOfShortestPath =  shortestPath.results[element]
      var userinput = ans.filter(item=> item.startNode==="B" && item.endNode === element);
      var userinputSPath = userinput[0].shortestPath

      var answerOfShortestPathToArray = JSON.stringify(answerOfShortestPath)
     // console.log(answerOfShortestPathToArray,userinputSPath.split(","))
      if(JSON.stringify(answerOfShortestPathToArray) === JSON.stringify(userinputSPath.split(","))){
       
      }

    });



   
    
  }

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  const divStyle = {
    display: "flex",
    alignContent: "center",
    justifyContent: "center"
  };

  return (
    <div>

      <div style={divStyle}>
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef} />

      </div>

      <div className='formWrapper'>

        {/* <button onClick={find}>qqqqqqqqqqqqqq</button> */}
        <form onSubmit={submit}>
          {formFields?.map((form, index) => {
            // console.log(item);
            return (

              <div key={index} className="answerinput">
                <input name='startNode' placeholder='Start Node' value={form.startNode}
                  onChange={(e) => handleFormChange(e, index)} />

                <input name='endNode' placeholder='End Node' value={form.endNode}
                  onChange={(e) => handleFormChange(e, index)} />

                <input name='shortestPath' placeholder='Shortest Path' value={form.shortestPath}
                  onChange={(e) => handleFormChange(e, index)} disabled={form.disabled} />

                <input name='distance' placeholder='Distance' value={form.distance} type="number"
                  onChange={(e) => handleFormChange(e, index)} disabled={form.disabled} />
              </div>

            )
          })}
          <button type='submit' className="btn btn-primary btn-round-2">Submit</button>
        </form>
      </div>



    </div>
  );
}

export default ShortestPathGraph;
