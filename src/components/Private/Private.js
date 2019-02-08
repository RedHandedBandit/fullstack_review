import React, {Component} from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import {updateUser} from './../../ducks/reducer'

class Private extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount (){
        const {id} = this.props;
        if(!id) {
            // double check sessions
            axios.get('/api/user')
            .then(res => {
                //dont move
                // add to redux
                this.props.updateUser(res.data)
            })
            .catch(error => {
                //boot to the other page
                this.props.history.push('/')
            })
        } else {
            // dont move
        }
    }

    logout = () => {
        axios.post('/auth/logout')
        .then(res => {
            this.props.updateUser({})
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        console.log(this.props)
        const {id, username, profile_pic, balance} = this.props
        return(
            <div className='Private'>
              <button onClick={this.logout}> Logout </button> 
                <h1> <img src={profile_pic} alt="profile" /> </h1>
                <h1> Welcome, {username} </h1>
                <p> Account Number {id} </p>
                <p> Current Balance {balance} </p>
            </div> 
        )
    }
}

const maptoProps = reduxState => {
    const {id, username, profile_pic, balance} = reduxState
    return {
        id,
        username,
        profile_pic,
        balance
    }
}
const dispatchToProps = {
    updateUser
}

export default connect(maptoProps, dispatchToProps)(Private);