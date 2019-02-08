import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser} from './../../ducks/reducer'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.login = this.login.bind(this);
    }

    componentDidMount(){
        const {id} = this.props
        if(id) {
            //boot them out
            this.props.history.push('/private');
        }else {
            //double check sessions
            axios.get('/api/user')
            .then(res => {
                // boot to other page
                this.props.updateUser(res.data)
                this.props.history.push('/private')
            })
            .catch(error => {
                //dont move
            })
        }
    }

    handleChange(prop, val){
        this.setState({
            [prop]: val
        })
    }

    register = () => {
        const {username, password} = this.state
        axios.post('/auth/register', {username, password})
        .then(res => {
            // console.log("register worked", res.data)
            this.props.updateUser(res.data)
            this.props.history.push('/private')
        })
        .catch(error => {
            console.log(error, 'sorry cant register loser')
        })
    }

    login(){
        const {username, password} = this.state
        axios.post('/auth/login', {username, password})
        .then(res => {
            // console.log(res)
            this.props.updateUser(res.data)
            this.props.history.push('/private')
        })
        .catch(error => {
            console.log(error, 'sorry cant login... loser')
        })
    }


    render(){
        // console.log(this.state)
        // console.log(this.props)
        const {username, password} = this.state;
        return(
            <div className='Login'>
                <input 
                    type="text"
                    value={username} 
                    onChange={(e) => {this.handleChange('username', e.target.value)} } 
                    /> 
                    {/* username is passed in for prop and e.target.value is passed in for val */}
                <input
                    type="password" 
                    value={password}
                    onChange={(e) => {this.handleChange('password', e.target.value)} } 
                    />
                    <button onClick={this.login}> Login </button> 
                    <button onClick={this.register}> Register </button> 
            </div> 
        )
    }
}

//state aka data
const mapStateToProps = reduxState => {
    return {
        id: reduxState.id
    }
}
//methods aka actions
const dispatchToProps = {
    updateUser: updateUser
}
export default connect(mapStateToProps, dispatchToProps)(Login)