import React, { useEffect, useRef, useState } from 'react';


function ShortestPathGraph() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false)
  useEffect(() => {

    const canvas = canvasRef.current;
    canvas.width = "500" //window.innerWidth * 2;
    canvas.height = "500" //window.innerHeight * 2;
    canvas.style.width = "500px" //`${window.innerWidth}px`
    canvas.style.height = "500px" //`${window.innerHeight}px`

    const context = canvas.getContext("2d");
    //context.scale(2,2);


    // context.lineCap = "round"
    // context.strokeStyle = "white"
    context.lineWidth = 3
    contextRef.current = context;

    var coords = [[20, 85], [129, 33], [305, 40], [469, 176], [238, 160], [205, 290]];
    var nodes = "A B C D E F ".split(" ");
    var startNode = nodes[ Math.floor((Math.random() * nodes.length))]


    contextRef.current.beginPath();
    for (var i = 0; i < coords.length; i++) {

      contextRef.current.beginPath();


      contextRef.current.moveTo(coords[i][0], coords[i][1]);
      contextRef.current.arc(coords[i][0], coords[i][1], 10, 0, Math.PI * 2, false);

      if (startNode === nodes[i]) {
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
      // contextRef.current.restore();
      //  if(i < coords.length - 1){
      //   contextRef.current.beginPath();
      //   console.table(i,coords[i][0],coords[i][1]);
      //   contextRef.current.moveTo(coords[i][0],coords[i][1]);
      //   var temp = i;
      //   var xcord = coords[++i][0]
      //   i = temp;
      //   var ycord = coords[++i][1]
      //   console.table(i,xcord, ycord);
      //   console.log("------------")
      //   contextRef.current.lineTo(xcord, ycord);
      //   i = temp ;
      //   contextRef.current.stroke();
      //   contextRef.current.closePath();
      //  }
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(28, 80);
    contextRef.current.lineTo(120, 33);
    contextRef.current.stroke();

    contextRef.current.beginPath();
    contextRef.current.moveTo(138 ,32);
    contextRef.current.lineTo(295, 38);
    contextRef.current.stroke();

    contextRef.current.beginPath();
    contextRef.current.moveTo(315 , 41);
    contextRef.current.lineTo(463, 170);
    contextRef.current.stroke();

    contextRef.current.beginPath();
    contextRef.current.moveTo(463, 170);
    contextRef.current.lineTo(247 ,157);
    contextRef.current.stroke();

    contextRef.current.beginPath();
    contextRef.current.moveTo(228 , 158);
    contextRef.current.lineTo(131  ,43);
    contextRef.current.stroke();

    contextRef.current.beginPath();
    contextRef.current.moveTo(21  , 93);
    contextRef.current.lineTo(195 ,287);
    contextRef.current.stroke();

    contextRef.current.beginPath();
    contextRef.current.moveTo(215, 289);
    contextRef.current.lineTo(461 ,180);
    contextRef.current.stroke();

  }, [])

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

  const divStyle = {
    backgroundColor: 'Lightblue',
    width: "500px"
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

    </div>
  );
}

export default ShortestPathGraph;
