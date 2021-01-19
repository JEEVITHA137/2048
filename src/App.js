import React,{Component} from 'react';
import {Howl, Howler} from 'howler';
import './App.css';
import * as FcIcons from "react-icons/fc";

const shuffleArray =(array) =>  array.sort(() => Math.random() - 0.5);
const findValue =(num) =>
{
  let i=0;
  while(num > 0)
  {
    num = Math.floor(num / 2);
    i = i+1;
  }
  
  return i-1;
}

const ValueBox = ({value,change,temp,swipe}) => { 
  if(value === null)
  return null;
    const arr = ["#81D8D0","#93ede4","#aef1f5","#7EF9FF","#008ECC","#81D8D0","#57A0D3","#73C2FB","#89CFF0","#9db0d1","lightblue"];
    let tran ;
    if(change)
    {
      tran = "grow 0.4s"
    }
    else if(value!==temp)
    {
       if(swipe === "left")
       {
          tran="right 0.1s"
       }
       else if(swipe === "right")
       {
          tran="left 0.1s"
       }
       else if(swipe === "up")
       {
          tran="down 0.1s"
       }
       else if(swipe === "down")
       {
          tran="up 0.1s"
       }
    }
    let index = findValue(value)
    return (
    <div className="cellvalues" style={{backgroundColor:arr[index-1],animation:tran}}>{value}</div>
    )
}
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
  tempscore:0,
  gameLost : false,
  gameWin : false,
  change : null,
  swipe: "none"
}

componentDidMount() {
  window.addEventListener('keydown', this.keypress, true);
  this.valuechange();
}

restart()
{
  const {tempValues,values} = this.state;
  for (var i=0; i < 16; i++) {
     values[i].value = null;
     tempValues[i].value = null;
  }
  this.setState({
    values,
    tempValues,
    score:0,
    gameLost:false,
    gameWin:false
  })
   
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

  if(this.state.gameLost)
  {
    return;
  }

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
      initialY : null,
      change : null
    }
  ) 

}

SoundPlay = (src) => {
  const soundclip = new Howl({
    src : ['./sound.wav']
  })
  soundclip.play();
}

toadd(filter_array,res)
{
   let {score,tempscore} = this.state;
    for(var j=0;j<filter_array.length-1;j=j+1)
    {
      if(filter_array[j] === filter_array[j+1] && (j+2 <filter_array.length-1 && filter_array[j+1] === filter_array[j+2]) && filter_array[j+2] !== filter_array[j+3] && res ===1)
      {
        this.setState({
          change:"left"
        })
        filter_array[j+2] += filter_array[j+1];
        this.SoundPlay();
        filter_array[j+1] = filter_array[j];
        this.SoundPlay();
        filter_array[j] = null;

        tempscore = score
        score += filter_array[j+2]; 

        if(filter_array[j+2] === 2048)
        {
          this.setState({
            gameWin:true,
            gameLost:true
          })
        }
        break;
     }
     else if((filter_array[j] === filter_array[j+1]))
     {
        filter_array[j] += filter_array[j+1];
        this.SoundPlay();
        filter_array[j+1] = null;
        filter_array =  filter_array.filter(val => val != null);

        tempscore = score;
        score += filter_array[j];

        if(filter_array[j] === 2048)
        {
          this.setState({
            gameWin:true,
            gameLost:true
          })
        }

        this.setState({
          score,
          tempscore
        })
     }
    }
    return filter_array;
}

_check(){
    const {values} = this.state;
    for(let i=0;i<16;i=i+4)
    {
       if(values[i].value === values[i+1].value || values[i+1].value === values[i+2].value || values[i+2].value === values[i+3].value)
       {
         return false;
       }
    }
    for(let i=0;i<4;i=i+1)
    {
      if(values[i].value === values[i+4].value || values[i+4].value === values[i+8].value || values[i+8].value === values[i+12].value)
      {
        return false;
      }
    }
    return true;
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

  this.setState({
    swipe:"left"
  })

  for (var i=0; i < 16; i+=4) {
    let row = [values[i].value,values[i+1].value,values[i+2].value,values[i+3].value];
    tempValues[i].value = values[i].value;
    tempValues[i+1].value = values[i+1].value;
    tempValues[i+2].value = values[i+2].value;
    tempValues[i+3].value = values[i+3].value;
    
    let filter_array =  row.filter(val => val != null);

    if(filter_array.length > 0)
    {
      filter_array = this.toadd(filter_array,0);
    }
  
    let temp_length = row.length - filter_array.length;

    count += this.isfull(temp_length);

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

  if(count===4 && this._check())
  {
    this.setState({
      gameLost : true
    })
    return;
  }

  if(count!==4)
  {
    this.valuechange();
  }
}

swiperight(){
  let {values} = this.state;
  let {tempValues} = this.state; 
  let count = 0;

  this.setState({
    swipe:"right"
  })

  for (var i=0; i < 16; i+=4) {
    let row = [values[i].value,values[i+1].value,values[i+2].value,values[i+3].value];
    tempValues[i].value = values[i].value;
    tempValues[i+1].value = values[i+1].value;
    tempValues[i+2].value = values[i+2].value;
    tempValues[i+3].value = values[i+3].value;

    let filter_array =  row.filter(val => val != null);
  
    if(filter_array.length > 0)
    {
      filter_array = this.toadd(filter_array,1);
    }

    let temp_length = row.length - filter_array.length;

    count += this.isfull(temp_length);

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

  if(count===4 && this._check())
  {
    this.setState({
      gameLost : true
    })
    return;
  }

  if(count!==4)
  {
    this.valuechange();
  }
}

swipeup(){
  let {values} = this.state;
  let {tempValues} = this.state;
  let count = 0;

  this.setState({
    swipe:"up"
  })

  for (var i=0; i < 4; i++) {
    let row = [values[i].value,values[i+4].value,values[i+8].value,values[i+12].value];
    tempValues[i].value = values[i].value;
    tempValues[i+4].value = values[i+4].value;
    tempValues[i+8].value = values[i+8].value;
    tempValues[i+12].value = values[i+12].value;

    let filter_array =  row.filter(val => val != null);

    if(filter_array.length > 0)
    {
      filter_array = this.toadd(filter_array,0);
    }
  
    let temp_length = row.length - filter_array.length;

    count += this.isfull(temp_length);

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

  if(count===4 && this._check())
  {
    this.setState({
      gameLost : true
    })
    return;
  }

  if(count!==4)
  {
    this.valuechange();
  }
}

swipedown(){
  let {values} = this.state;
  let {tempValues} = this.state;
  let count = 0;

  this.setState({
    swipe:"down"
  })

  for (var i=0; i < 4; i++) {
    let row = [values[i].value,values[i+4].value,values[i+8].value,values[i+12].value];
    tempValues[i].value = values[i].value;
    tempValues[i+4].value = values[i+4].value;
    tempValues[i+8].value = values[i+8].value;
    tempValues[i+12].value = values[i+12].value;

    let filter_array =  row.filter(val => val != null);
  
    if(filter_array.length > 0)
    {
      filter_array = this.toadd(filter_array,1);
    }

    let temp_length = row.length - filter_array.length;

    count += this.isfull(temp_length);
  
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

  if(count===4 && this._check())
  {
    this.setState({
      gameLost : true
    })
    return;
  }

  if(count!==4)
  {
    this.valuechange();
  }
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
      this.setState({
        change:rand
      })
    }
  }
  
  this.setState({
    values
  })
}

undoGame = () => {
  let {tempValues,values,score,tempscore} = this.state;
  for (var i=0; i < 16; i++) {
     values[i].value = tempValues[i].value
  }
  score = tempscore;
  this.setState({
    values,
    gameLost:false,
    score
  })
}

keypress = (e) =>{
  if(this.state.gameLost)
  {
    return;
  }

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

}

render(){
  let styles = {};
  if(this.state.change === "left")
  {
    styles = {color:"white",display:"none",}
  }
  Howler.volume(1.0)
  return(
    <div className="container" onKeyDown = {this.keypress}>
    <header>
      <div className="row justify-content-center">2048</div>
    </header>
      <div className="score">Score : {this.state.score}</div>
      <div className="row d-flex resets">
      <div className="button icons" onClick={() => this.undoGame()}><FcIcons.FcRedo/></div>
      <div className="button" onClick={() => this.restart()}><FcIcons.FcRefresh/></div>
    </div>
    
    <div className="all">
    <div className="row justify-content-center">
    <div className={this.state.gameLost===true?"board":"boardnone"}><div className="d-flex titletext justify-content-center"> <li>Y</li><li>o</li><li>u</li>{this.state.gameWin===true?
                                                                                     <div className="pl-5 d-flex titlextra"><li>W</li><li>i</li><li>n</li><li>!</li></div>:
                                                                                     <div className="pl-5 d-flex titlextra"><li>L</li><li>o</li><li>s</li><li>t</li><li>!</li></div>}</div>
                                                                                     <div className="tryagain" onClick={() => this.restart()}>{this.state.gameWin===true?"New Game":"Try Again"}</div>
    </div>
    <div className="box row" onTouchStart={(e)=>this._onTouchStart(e)}
    
    onTouchMove={(e)=>this._onTouchMove(e)}>
    {
       this.state.values.map((box,i) =>
       {
         let change=false;
         if(i === this.state.change)
         {
              change=true;
         }
         return(
         <div key={i} className="col-3 grids" style={styles}><div className="row d-flex justify-content-center"><ValueBox value={box.value} change={change} temp={this.state.tempValues[i].value} swipe={this.state.swipe}/></div></div>
         )
        })
    }
    </div>
    </div>
    </div>
    <div className="d-flex footer" >
    <div className="col-sm-6">
    <h6 className="pt-1">Designed by <a href="https://www.linkedin.com/in/jeevithavenkatesan137" target="_blank" rel="noopener noreferrer">Jeevitha Venkatesan</a></h6>
    </div>
    <div className="col-sm-6">
    <h6 className="pt-1"><a href="https://jeevitha137.github.io/" target="_blank" rel="noopener noreferrer">Know About Me</a></h6>
    </div>
    </div>
    </div>
  );
}
}

export default App;