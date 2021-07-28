import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/auth'

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email:'', password:''
    })

    const {email, password}=formData

    const onChange = e => {
        const {name, value}=e.target
        setFormData({
            ...formData, [name] : value
        })
    }

    const onSubmit = async e =>{
      e.preventDefault()
      login(email, password)
    }

    if(isAuthenticated){
      return <Redirect to='/dashboard'/>
    }

    return (
    <>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Sign Into Your Account
        </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
            <input 
                type="email" 
                placeholder="Email Address" 
                name="email" 
                value={email}
                onChange={onChange}
            />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </>
    )
}

Login.propTypes ={
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps =state=>({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps, {login}
)(Login)
