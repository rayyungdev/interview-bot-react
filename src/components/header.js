import React from 'react'

class Header extends React.Component{
    render()
    {
        return(
            <div style = {{backgroundColor : 'skyblue', width: '100%', height : '4%'}}>
                <h2 style  = {{padding : '10px', margin : '20px', fontFamily: 'revert'}}> Raymond-Bot </h2>
            </div>
        )
    }
}

export default Header;
