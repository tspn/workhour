import React, { Component } from 'react'
import config from '../config/appConfig'
import 'whatwg-fetch'
import sha1 from 'sha1'

class Login extends Component {

    constructor(props) {
        super(props)
        this.cookie = props.cookies
        this.state = { email: "", password: "", token: undefined }
    }

    doLogin(event) {
        event.preventDefault()
        let email = this.state.email
        let password = this.state.password
        let data = new FormData()
        data.append("pre-token", sha1(email + password))
        
        fetch(`${config.api}/api/auth`,
            {
                method: "POST",
                body: data
            }).then((response) => response.json())
            .then((json) => {
                this.props.onLogin(json.token)
                if (json.cookie !== undefined)
                    this.restoreSession(json.cookie)
            })
            .catch((err) => alert(err))
    }

    restoreSession(c) {
        Object.keys(c).forEach((key) => {
            this.cookie.set(key, c[key])
        })
    }

    render() {
        return (
            <div className="container">
                <form id="loginForm" className="form-control">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" onClick={this.doLogin.bind(this)} className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}

export default Login