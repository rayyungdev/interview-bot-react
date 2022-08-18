import React from 'react'
import axios from 'axios'

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
        if (this.state.msg !=='')
        {
            axios.post(`https://${REACT_APP_API_LOCATION}.rayyungdev.repl.co/user`, {'msg': this.state.msg})
            .then(res => {
                let ch = this.state.chat;
                ch.push({from: 'user', msag: this.state.msg});
                ch.push({from: 'cb', msag: res.data});

                this.setState({chat: ch, msg: ''});
                console.log(this.state);
                let interval = window.setInterval(function(){
                    var elem = document.getElementById('chatt');
                    elem.scrollTop = elem.scrollHeight;
                    window.clearInterval(interval);
                }, 500);
                this.forceUpdate();
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    render()
    {
        return(
            <div className='container'>
                <div id = 'chatt' style = {{overflow: 'scroll', overflowX:'hidden', height: '75vh'}}>
                    {
                        this.state.chat.map((msg) => {
                            if(msg.from === 'cb'){
                                return <div  style={{
                                flexWrap:'wrap',
                                marginLeft:'500px',
                                marginBottom: '10px', 
                                padding: '20px 50px',
                                borderRadius: '100px', 
                                fontFamily: 'cursive',
                                fontSize: '16px',
                                width: '50%', 
                                backgroundColor:'lightpink', 
                                float: 'right', 
                                display:'block'}}> {msg.msag} </div>
                            }
                            else{
                                return <div style = {{marginBottom: '10px', 
                                flexWrap:'wrap',
                                marginRight:'500px',
                                fontFamily: 'cursive',
                                borderRadius: '100px', 
                                fontSize: '16px',
                                width: '50%', 
                                padding: '20px 50px',
                                backgroundColor: 'lightcyan', 
                                float: 'left', 
                                display: 'block'}}>{msg.msag} </div>
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
                    />
                    <button  onClick={() => this.handleSend()} className = "btn btn-primary" style = {{paddingLeft: '25px', paddingRight: '25px'}}> Send </button>
                </div>
            </div>
        )
    }
}

export default Message