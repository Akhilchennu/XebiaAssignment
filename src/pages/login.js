import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { service } from '../services/service';
import { connect } from 'react-redux';
import '../App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            loginError: '',
            showPassword: false,
            disableButton: false
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if (this.state.loginError) {
            this.setState({ loginError: '' });
        }
    }
    loginClick = (event) => {
        const { userName, password } = this.state;
        this.setState({ disableButton: true });
        if (userName && password) {
            const dataValue = service.loginMethod(userName);
            dataValue.then((response) => {
                const { results, count } = response;
                let checkCredentials = false;
                if (results.length > 0 && count > 0) {
                    for (let index = 0; index < results.length; index++) {
                        if (results[index].name.toLowerCase() === userName.toLowerCase() && response.results[index].birth_year === password) {
                            checkCredentials = true;
                        }
                    }
                    if (checkCredentials) {
                        this.props.loginStatus(true, userName);
                        this.props.history.push("/Search");
                    } else {
                        this.setState({ loginError: 'Please enter valid credentials', disableButton: false });
                    }
                } else {
                    this.setState({ loginError: 'Please enter valid credentials', disableButton: false });
                }

            })
        } else if (!userName && password) {
            this.setState({ loginError: 'Please enter username', disableButton: false });
        } else if (userName && !password) {
            this.setState({ loginError: 'Please enter password', disableButton: false });
        } else {
            this.setState({ loginError: 'Please enter username and password', disableButton: false });
        }
    }
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    componentDidMount() {
        if (this.props.loginSession) {
            this.props.history.push("/Search");
        }
    }
    handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            this.loginClick(event);
        }
    }
    render() {
        return (
            <div style={{ height: '100%' }}>
                <div className="App-header">
                    <Paper className="paperWidth">
                        <div style={{ padding: '4%', paddingBottom: '10%', textAlign: 'center' }}>
                            <div test-header="header" className="header">Login to search planets</div>
                            <div className="horizantalLine"></div>
                            <TextField
                                id="userName"
                                name="userName"
                                label="Username"
                                type="text"
                                autoComplete="off"
                                value={this.state.userName}
                                className="marginTop24"
                                onChange={(event) => this.handleChange(event)}
                                onKeyDown={(event) => this.handleKeyPress(event)}
                                variant="outlined"
                                fullWidth
                                required
                                autoFocus
                            />
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                className="marginTop24"
                                onChange={(event) => this.handleChange(event)}
                                onKeyDown={(event) => this.handleKeyPress(event)}
                                variant="outlined"
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {this.state.disableButton ? <CircularProgress className="marginTop24" /> : <Button
                                variant="contained" color="primary"
                                className="loginButton marginTop24"
                                test-button="button"
                                onClick={(event) => this.loginClick(event)}>
                                LogIn
                             </Button>}
                            {this.state.loginError ? <div className="errorText">{this.state.loginError}</div> : null}
                        </div>
                    </Paper></div></div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        loginSession: state.loginSession
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loginStatus: (login, userName) => {
            dispatch({
                type: "AUTHENTICATE",
                login,
                userName
            })
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
