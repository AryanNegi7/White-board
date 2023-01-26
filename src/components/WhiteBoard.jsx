import React from 'react'
import { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import { HiPencil } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsFillEraserFill } from "react-icons/bs";
import { BsFillCircleFill } from "react-icons/bs";
import { BiRectangle } from "react-icons/bi";
import { BsCircle } from "react-icons/bs";
import "./WhiteBoard.css";
function WhiteBoard() {
  
  const [brushColor, setBrushColor] = useState("#333333");
  const [brushWidth, setBrushWidth] = useState(3);
  const [eraserWidth, setEraserWidth] = useState(3);
  const [shape, setShape] = useState("line");
  const [startPoint, setStartPoint] = useState(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      isDrawingMode: true,
    });
    canvasRef.current = canvas;
    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);
    canvas.freeDrawingBrush.width = 3;
    canvas.freeDrawingBrush.color = brushColor;
    canvasRef.current.freeDrawingBrush.color = brushColor;
    canvasRef.current.renderAll();
  }, []);
  
  useEffect(() => {
      const canvas=canvasRef.current;
      if(shape=='line')
      {
        setStartPoint(null);
        canvasRef.current.isDrawingMode=true;
      }
      else
      {
        canvas.on('mouse:down', handleCanvasMouseDown);
        canvas.on('mouse:move', handleCanvasMouseMove);
        canvas.on('mouse:up', handleCanvasMouseUp);
        canvas.on('selected', function (options) {
          let rect = options.target;
          let newWidth = rect.width * rect.scaleX;
          let newHeight = rect.height * rect.scaleY; 
          rect.scaleToWidth(newWidth);
          rect.scaleToHeight(newHeight);
          canvas.renderAll();
        });
        canvasRef.current.isDrawingMode=false;
      }
    }, [shape, setShape, startPoint])
    
  
    const handleColorChange = (color) => {
      setBrushColor(color);
      canvasRef.current.freeDrawingBrush.color = color;
      canvasRef.current.freeDrawingBrush.width = brushWidth;
      canvasRef.current.renderAll();
    };
  
    const handleEraser = (color) => {
      setBrushColor(color);
      canvasRef.current.freeDrawingBrush.color = color;
      canvasRef.current.freeDrawingBrush.width = eraserWidth;
      canvasRef.current.renderAll();
    };
  
    const handleBrushWidthChange = (event) => {
      setBrushWidth(event.target.value);
      canvasRef.current.freeDrawingBrush.width = event.target.value;
      canvasRef.current.renderAll();
    };
  
    const handleEraserWidthChange = (event) => {
      setEraserWidth(event.target.value);
      canvasRef.current.freeDrawingBrush.width = event.target.value;
      canvasRef.current.freeDrawingBrush.color = "white";
      canvasRef.current.renderAll();
    };
    
    const handleShapeSelection = (shapeType) => {
      // console.log(shape);
      setShape(shapeType);
    };
    
    const handleCanvasMouseDown = (options) => { 
      if(shape!='line')
      {
        setStartPoint(options.pointer);
      }
    };
    
    const handleCanvasMouseMove = (options) => {
    };
    
    const handleCanvasMouseUp = (options) => {
      if (shape == "rect" && startPoint) {
        // console.log("handleCanvasMouseMove"+"__"+startPoint.x+" "+startPoint.y);
        let a=startPoint.x;
        let b=startPoint.y;
        // console.log("handleCanvasMouseUp "+"__"+a+" "+b);
        
        const { x, y } = options.pointer;
        // console.log("handleCanvasMouseMove_Inside"+"__"+x+" "+y);
        const h = y - b;
        const w = x - a;
        const newRect = new fabric.Rect({
          left: a,
          top: b,
          height: h,  
          width: w,
          fill: (brushColor=="#ffffff"?"#000000":brushColor),
          selectable: true
        });
        let active = canvasRef.current.getActiveObject()
        if (active) {
          canvasRef.current.remove(active);
        }
        canvasRef.current.add(newRect).setActiveObject(newRect);
      }
      else if (shape == "circle" && startPoint) {
        const { x, y } = options.pointer;
        const radius =  (Math.sqrt(Math.pow((x-startPoint.x),2) + Math.pow((y-startPoint.y),2)))/2;
        const circle = new fabric.Circle({
          left: startPoint.x,
          top: startPoint.y,
          radius: radius,
          fill: (brushColor=="#ffffff"?"#000000":brushColor)
        });
        let active = canvasRef.current.getActiveObject()
        if (active) {
          canvasRef.current.remove(active);
        }
        canvasRef.current.add(circle).setActiveObject(circle);
      }
      else{
        let active = canvasRef.current.getActiveObject()
        if (active) {
          canvasRef.current.remove(active);
        }
      }
      setStartPoint(null);
    };
    
    return (
      <div>
        <nav className="nav">
          <div className="nav-left">
            <button className="pencil-icon icon" style={{backgroundColor:(brushColor=="#ffffff"?"#000000":brushColor)  }} onClick={() => handleShapeSelection("line")}>
              <HiPencil border-radius="15px" font-size="20px" color="white"/>
            </button>
            <input
              type="range"
              min="10"
              max="30"
              className="slider"
              value={brushWidth}
              onChange={handleBrushWidthChange}
            />
            {brushColor=="#333333" ? (
                  <AiFillCheckCircle color="#333333" size="30px" onClick={() => handleColorChange("#333333")} />
                  ) : (
                  <BsFillCircleFill color="#333333" size="22px" onClick={() => handleColorChange("#333333")} />
            )}
            {brushColor=="#219653" ? (
                  <AiFillCheckCircle color="#219653" size="30px" onClick={() => handleColorChange("#219653")} />
                  ) : (
                  <BsFillCircleFill color="#219653" size="22px" onClick={() => handleColorChange("#219653")} />
            )}
            {brushColor=="#f2c94c" ? (
                  <AiFillCheckCircle color="#f2c94c" size="30px" onClick={() => handleColorChange("#f2c94c")} />
                  ) : (
                  <BsFillCircleFill color="#f2c94c" size="22px" onClick={() => handleColorChange("#f2c94c")} />
            )}
            {brushColor=="#2f80ed" ? (
                  <AiFillCheckCircle color="#2f80ed" size="30px" onClick={() => handleColorChange("#2f80ed")} />
                  ) : (
                  <BsFillCircleFill color="#2f80ed" size="22px" onClick={() => handleColorChange("#2f80ed")} />
            )}
            {brushColor=="#da0610" ? (
                  <AiFillCheckCircle className='round-button' color="#da0610" size="30px" onClick={() => handleColorChange("#da0610")} />
                  ) : (
                  <BsFillCircleFill className='round-button' color="#da0610" size="22px" onClick={() => handleColorChange("#da0610")} />
            )}
            <button className="pencil-icon icon" onClick={() => handleShapeSelection("rect")}>
              <BiRectangle/>
            </button>
            <button className="pencil-icon icon" onClick={() => handleShapeSelection("circle")}>
              <BsCircle/>
            </button>
          </div>
          <div className="nav-right">
            <button className="pencil-icon icon" onClick={() =>{
              handleShapeSelection("line");
              handleEraser("#ffffff")}
            }>
              <BsFillEraserFill/>
            </button>
            <input
            type="range"
            min="10"
            max="30"
            className="slider"
            value={eraserWidth}
            onChange={handleEraserWidthChange}
            />
          </div>
        </nav>
      <canvas id="canvas" ref={canvasRef} />
    </div>
  )
}

export default WhiteBoard