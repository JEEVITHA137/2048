import React,{Component} from 'react';
import './App.css';
import * as icons from "react-icons/fc";

const shuffleArray =(array) =>  array.sort(() => Math.random() - 0.5);

class App extends Component{

  state = {
  initialX : null,
  initialY : null,
   values : [
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
    {value: null},
    {value: null}
  ],
  tempValues : [
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
    {value: null},
    {value: null}
  ],
  score:0,
  gameLost : false
}

componentDidMount() {
  window.addEventListener('keydown', this.keypress, true);
  this.valuechange();
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
  
    if (diffX > 0) {
      this.swipeleft();
    } else {
      this.swiperight();
    }  
  } else {
    if (diffY > 0) {
      this.swipeup();
    } else {
      this.swipedown();
    }  
  }

  this.setState(
    {
      initialX : null,
      initialY : null
    }
  ) 


  this.valuechange();

}

toadd(filter_array)
{
   let {score} = this.state;
    for(var j=0;j<filter_array.length-1;j++)
    {
     if((filter_array[j] === filter_array[j+1]))
     {
        filter_array[j] += filter_array[j+1];
        filter_array[j+1] = null;
        filter_array =  filter_array.filter(val => val != null);
        
        score += filter_array[j];

        if(filter_array[j] === 2048)
        {
          console.log("You Win");
        }

        this.setState({
          score
        })
     }
    }
    return filter_array;
}

_check(){
    const {values} = this.state;

    for(let i=0;i<16;i=+4)
    {
       if(values[i].value === values[i+1].value || values[i+1].value === values[i+2].value || values[i+2].value === values[i+3].value)
       {
         console.log("true");
          return 0;
       }
    }
    for(let i=0;i<4;i++)
    {
       if(values[i].value === values[i+4].value || values[i+4].value === values[i+8].value || values[i+8].value === values[i+12].value)
       {
        console.log("true");
          return 0;
       }
    }
    console.log("jee");
    return 1;
}

isfull(temp_length)
{
    if(temp_length === 0)
      return 1;
    else
      return 0;
}



swipeleft(){
  let {values} = this.state;
  let {tempValues} = this.state;
  let count = 0;

  for (var i=0; i < 16; i+=4) {
    let row = [values[i].value,values[i+1].value,values[i+2].value,values[i+3].value];
    tempValues[i].value = values[i].value;
    tempValues[i+1].value = values[i+1].value;
    tempValues[i+2].value = values[i+2].value;
    tempValues[i+3].value = values[i+3].value;
    
    let filter_array =  row.filter(val => val != null);

    if(filter_array.length > 0)
    {
      filter_array = this.toadd(filter_array);
    }
  
    let temp_length = row.length - filter_array.length;

    count += this.isfull(temp_length);

    if(count===4)
    {
      console.log("je");
      this._check();
      this.setState({
        gameLost : true
      })
      console.log("YOU LOSE")
    }
    
    row = filter_array.concat(Array(temp_length).fill(null));
    values[i].value = row[0];
    values[i+1].value = row[1];
    values[i+2].value = row[2];
    values[i+3].value = row[3];
  }

  this.setState({
    values,
    tempValues
  })
}

swiperight(){
  let {values} = this.state;
  let {tempValues} = this.state; 
  let count = 0;

  for (var i=0; i < 16; i+=4) {
    let row = [values[i].value,values[i+1].value,values[i+2].value,values[i+3].value];
    tempValues[i].value = values[i].value;
    tempValues[i+1].value = values[i+1].value;
    tempValues[i+2].value = values[i+2].value;
    tempValues[i+3].value = values[i+3].value;

    let filter_array =  row.filter(val => val != null);
  
    if(filter_array.length > 0)
    {
      filter_array = this.toadd(filter_array);
    }

    let temp_length = row.length - filter_array.length;

    count += this.isfull(temp_length);

    if(count === 4)
    {
      console.log("je");
      this._check();
      this.setState({
        gameLost : true
      })
      console.log("YOU LOSE")
    }

    row = Array(temp_length).fill(null).concat(filter_array);

    values[i].value = row[0];
    values[i+1].value = row[1];
    values[i+2].value = row[2];
    values[i+3].value = row[3];

  }

  this.setState({
    values,
    tempValues
  })
}

swipeup(){
  let {values} = this.state;
  let {tempValues} = this.state;
  let count = 0;

  for (var i=0; i < 4; i++) {
    let row = [values[i].value,values[i+4].value,values[i+8].value,values[i+12].value];
    tempValues[i].value = values[i].value;
    tempValues[i+4].value = values[i+4].value;
    tempValues[i+8].value = values[i+8].value;
    tempValues[i+12].value = values[i+12].value;

    let filter_array =  row.filter(val => val != null);

    if(filter_array.length > 0)
    {
      filter_array = this.toadd(filter_array);
    }
  
    let temp_length = row.length - filter_array.length;

    count += this.isfull(temp_length);

    if(count===4)
    {
      console.log("je");
      this._check();
      this.setState({
        gameLost : true
      })
      console.log("YOU LOSE")
    }

    row = filter_array.concat(Array(temp_length).fill(null));

    values[i].value = row[0];
    values[i+4].value = row[1];
    values[i+8].value = row[2];
    values[i+12].value = row[3];
  }

  this.setState({
    values,
    tempValues
  })
}

swipedown(){
  let {values} = this.state;
  let {tempValues} = this.state;
  let count = 0;

  for (var i=0; i < 4; i++) {
    let row = [values[i].value,values[i+4].value,values[i+8].value,values[i+12].value];
    tempValues[i].value = values[i].value;
    tempValues[i+4].value = values[i+4].value;
    tempValues[i+8].value = values[i+8].value;
    tempValues[i+12].value = values[i+12].value;

    let filter_array =  row.filter(val => val != null);
  
    if(filter_array.length > 0)
    {
      filter_array = this.toadd(filter_array);
    }

    let temp_length = row.length - filter_array.length;

    count += this.isfull(temp_length);
  
    if(count===4)
    {
      console.log("je");
      this._check();
      this.setState({
        gameLost : true
      })
      console.log("YOU LOSE")
    }

    row = Array(temp_length).fill(null).concat(filter_array);

    values[i].value = row[0];
    values[i+4].value = row[1];
    values[i+8].value = row[2];
    values[i+12].value = row[3];
  }

  this.setState({
    values,
    tempValues
  })
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
      values[rand].value = shuffleArray(arr)[temp];
    }
  }
  
  this.setState({
    values
  })
}

undoGame = () => {
  const {tempValues,values} = this.state;
  for (var i=0; i < 16; i++) {
     values[i].value = tempValues[i].value
  }
  this.setState({
    values 
  })
}

keypress = (e) =>{
  if(e.keyCode === 37)
  {
    this.swipeleft();
  }
  else if(e.keyCode === 38)
  {
    this.swipeup();
  }
  else if(e.keyCode === 39)
  {
    this.swiperight();
  }
  else if(e.keyCode === 40)
  {
    this.swipedown();
  }

  this.valuechange();
}

render(){
  
  return(
    <div className="container" onKeyDown = {this.keypress}>
    <header>
      <h1 className="row justify-content-center">2048</h1>
      <h1>Score : {this.state.score}</h1>
       <div className="button" onClick={() => this.undoGame()}><icons.FcRedo/></div>
    </header>
    <div className="all">
    <div className="row justify-content-center">
    <div className="box row" onTouchStart={(e)=>this._onTouchStart(e)}
    onTouchMove={(e)=>this._onTouchMove(e)}>
    {
       this.state.values.map((box,i) =>
       {
         return(
         <div key={i} className="col-3 grids">{box.value}</div>
       )})
    }
    </div>
    </div>
    </div>
    </div>
  );
}
}

export default App;