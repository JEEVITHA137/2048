import React,{Component} from 'react';
import './App.css';

const shuffleArray =(array) =>  array.sort(() => Math.random() - 0.5);

class App extends Component{

  state = {
  initialX = null,
  initialY = null,
   values : [
    {value: null} ,
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null}
  ]
}


 

_onTouchStart(e) {
  this.setState(
    {
      initialX : e.touches[0].clientX,
      initialY : e.touches[0].clientY
    }
  )
  
}

_onTouchMove(e) {
  if (this.state.initialX === null) {
    return;
  }
 
  if (this.state.initialY === null) {
    return;
  }
 
  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;
 
  var diffX = this.state.initialX - currentX;
  var diffY = this.state.initialY - currentY;
 
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
      console.log("swiped left");
    } else {
      // swiped right
      console.log("swiped right");
    }  
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      console.log("swiped up");
    } else {
      // swiped down
      console.log("swiped down");
    }  
  }
 
  this.initialX = null;
  this.initialY = null;
   
  e.preventDefault();
 
}


valuechange = () =>{
  let {values} = this.state;
  let then = false;
  let arr = [2,4,8,16];
  while(!then){
    const min = 0;
    const max = 15;
    const rand = Math.round(min + Math.random() * (max - min));
    
    if(values[rand].value === null)
    {
      then = true;
      let temp = Math.round(Math.random() * 1000 ) % (arr.length);
      console.log(temp);
      values[rand].value = shuffleArray(arr)[temp];
    }
  }
  
  this.setState({
    values
  })
}

render(){
  
  return(
    <body className="container ">
    <div className="row justify-content-center">
    <div className="all"><h1 className="row justify-content-center">2048</h1>
    <div className="box row" onTouchStart={this._onTouchStart}
        onTouchMove={this._onTouchMove}
        onTouchEnd={this._onTouchEnd}>
    {
       this.state.values.map((box,i) =>
       {
         return(
         <div key={i} className="col-3 grids">{box.value}</div>
       )})
    }
    </div>
    <button onClick={() => this.valuechange()}></button>
    </div>
    </div>
    </body>
  );
}
}

export default App;