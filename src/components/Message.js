import React from 'react'
import axios from 'axios'
import 'typeface-roboto'

// const{REACT_APP_API_LOCATION, REACT_APP_PORT} = process.env;
const{REACT_APP_API_LOCATION} = process.env;

class Message extends React.Component
{
    state = {
        chat : [], 
        msg : ''
    }
    
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({msg: e.target.value})
    }
    handleSend = () =>{
        // axios.post(`https://${REACT_APP_API_LOCATION}:${REACT_APP_PORT}/user`, {'msg': this.state.msg})
        axios.post(`https://${REACT_APP_API_LOCATION}.repl.co/user`, {'msg': this.state.msg})
        .then(res => {
            let ch = this.state.chat;
            if (this.state.msg !== ""){
                ch.push({from: 'You', msag: this.state.msg});
                ch.push({from: 'Raymond-Bot', msag: res.data});
                this.setState({chat: ch, msg: ''});
                console.log(this.state);
                let interval = window.setInterval(function(){
                    var elem = document.getElementById('chatt');
                    elem.scrollTop = elem.scrollHeight;
                    window.clearInterval(interval);
                }, 500);
                this.forceUpdate();
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    onKeyDownHandler = e => {
        if (e.keyCode === 13) {
          this.handleSend();
        }
      };

    render()
    {
        return(
            <div className='container' style= {{width: '85%'}}>
                <div id = 'chatt' style = {{overflow: 'scroll', overflowX:'hidden', height: '75vh'}} >
                    {
                        this.state.chat.map((msg) => {
                            if(msg.from === 'Raymond-Bot'){
                                return <div
                                > 
                                <div
                                style={{
                                    float: 'left',
                                    marginLeft:'300px'
                                }}
                                > {msg.from} </div>
                                <div  style={{
                                flexWrap:'wrap',
                                marginRight:'600px',
                                marginBottom: '10px', 
                                padding: '20px 30px',
                                borderRadius: '100px', 
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                width: '85%', 
                                backgroundColor:'lightpink', 
                                float: 'left', 
                                display:'block'}}> {msg.msag} </div>
                                
                                </div>
                            }
                            else{
                                return <div> 
                                <div
                                style={{
                                    float: 'right',
                                    marginRight:'300px'
                                }}
                                > {msg.from} </div>
                                <div style = {{marginBottom: '10px', 
                                flexWrap:'wrap',
                                marginLeft:'600px',
                                fontFamily: 'Roboto',
                                borderRadius: '100px', 
                                fontSize: '14px',
                                width: '85%', 
                                padding: '20px 30px',
                                backgroundColor: 'lightcyan', 
                                float: 'right', 
                                display: 'block'}}>{msg.msag} </div> 
                                </div>
                            }
                        })
                    }
                </div>
                <div style = {{height: '20vh'}}> 
                    <input 
                        type = 'text' 
                        name = 'msg' 
                        onChange = {(e) => this.handleChange(e)}
                        className = 'form-control'
                        value = {this.state.msg}
                        style = {{width: '90%', float: 'left', display: 'flex'}}
                        onKeyDown = {this.onKeyDownHandler}
                    />
                    <button  onClick={() => this.handleSend()} className = "btn btn-primary" style = {{paddingLeft: '25px', paddingRight: '25px'}}> Send </button>
                </div>
            </div>
        )
    }
}

export default Message