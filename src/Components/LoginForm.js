import React from 'react';





export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    render() {
     
        
        return (
  
            <form>
      
      
          


          
            <form onSubmit={this.handleSubmit} class="Login"><div class="container">
                
                <div style = {this.props.style}>
                    <p>Login</p>
                    <div>
                        
                            <input type = "text" placeholder="Username" value = {this.state.Username} onChange = {this.handleUsernameChange} />
                       
                    </div>
                    <div>
                       
                           
                            <input type = "password"placeholder="Password" value = {this.state.Password} onChange = {this.handlePasswordChange}/>
                       
                    </div>
                    <input type="button" value="Sign in" onSubmit = {this.onSubmit}/>
                </div>
                
                </div>
    
        
            </form >
            <body class="Nav">
    <nav class="navMenu">
      <a href="#">Home</a>
      <a href="#">Back</a>
      <a href="#">Sprint</a>
      <a href="#">My Evaluation</a>
      <a href="#">My performance</a>
      <a href="#">Evaluation</a>
      <a href="#">sign Out</a>
      <div class="dot"></div>
    </nav>
  </body>

             
                       </form>
        ) 
     
    }  
    

    async handleSubmit(e) {
        e.preventDefault();
        let isCorrect = false;
        let tempName = "";
        let tempRoles = null;
        let tempUserID = 0;
        if(this.state.Username !== "" && this.state.Password !== "") {
            const response = await fetch(`/API/checkLogin/${this.state.Username}-${this.state.Password}`);
            if(response) {
                const body = await response.json();
                if(body) {
                    isCorrect = body.Correct;
                    tempName = body.Name;
                    tempUserID = body.UserID;
                    if(body.Roles){
                        tempRoles = body.Roles;   
                    }
                }
            }
        }
        if((isCorrect + "") !== "true") {
            this.setState({
                Username: "",
                Password: ""
            });
        }
        this.props.onSubmit(isCorrect, tempName, tempRoles, tempUserID);
    }

    handleUsernameChange(event) {
        this.setState({Username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({Password: event.target.value});
    }
   
}
