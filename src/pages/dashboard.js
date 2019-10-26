import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { service } from '../services/service';
import Chip from '@material-ui/core/Chip';
import { ScaleLoader } from 'react-spinners';
import Paper from '@material-ui/core/Paper';
import DisplayData from './displayData';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import '../App.css';



class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            searchResult: [],
            message: 'Search planets for showing results',
            loading: false,
            higherPopulation: 0,
            lowerPopulation: 0,
            planetInfo: {},
            showSnackbar: false
        };
        this.abortController = new window.AbortController();
        this.searchCount = 0;
        this.timer = '';
    }
    logOutClick = () => {
        this.props.loginStatus(false,"");
        this.props.history.push("/Login");
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.searchCount = 0;
        }, 60000);
    }
    componentWillUnmount() {
        clearInterval(this.searchCount);
      }
    calculatevalues = (results) => {
        let highValue = results[0].population, lowValue = results[0].population;
        results.forEach((value) => {
            if (parseInt(value.population) > parseInt(highValue)) {
                highValue = value.population;
            }
            if (parseInt(value.population) < parseInt(lowValue)) {
                lowValue = value.population;
            }
        });
        return highValue === lowValue ? [highValue] : [highValue, lowValue];
    }
    handleChange = (event) => {
        if(this.searchCount <= 15){
        const value = event.target.value;
        this.abortController.abort();
        this.abortController = new window.AbortController();
        this.setState({ searchValue: value, loading: true });
        if (value) {
            const dataValue = service.searchService(value, this.abortController.signal);
            dataValue.then((response) => {
                const { results } = response;
                if (results.length > 0) {
                    if (results.length > 1) {
                        let populationValues = new Promise((resolve, reject) => {
                            resolve(this.calculatevalues(results));
                        });
                        populationValues.then((response) => {
                            this.setState({
                                searchResult: results, loading: false,
                                higherPopulation: response[0], lowerPopulation: response[1]
                            });
                        })
                    } else if (results.length === 1) {
                        this.setState({
                            searchResult: results, loading: false,
                            higherPopulation: results[0].population, lowerPopulation: 0
                        });
                    }

                } else {
                    this.setState({
                        searchResult: results, message: 'No records Found',
                        loading: false, planetInfo: {}
                    });
                }
            })
                .catch(() => {
                    console.log("error");
                })
        } else {
            this.setState({
                searchResult: [], message: 'Search planets for showing results',
                loading: false, planetInfo: {}
            });
        }
    }else{
       this.setState({showSnackbar:true})
    }
    }
    planetClick = (planet) => {
        this.setState({ planetInfo: planet });
    }
    onBackspacePress = (event) => {
        if (event.keyCode === 8 && this.state.searchValue && this.props.userName && this.props.userName !== 'Luke Skywalker') {
            this.searchCount++;
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ showSnackbar: false });
    }

    render() {
        const { planetInfo } = this.state;
        return (
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar className="toolbarStyle">
                        <Button color="inherit" test-button='logout' onClick={() => { this.logOutClick() }}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <div className="marginTop24 searchInputStyle">
                    <TextField
                        id="searchInput"
                        name="searchInput"
                        label="Search Planets"
                        type="text"
                        value={this.state.searchValue}
                        className="searchInput"
                        autoComplete="off"
                        onChange={(event) => this.handleChange(event)}
                        onKeyDown={(event) => this.onBackspacePress(event)}
                        autoFocus
                    />
                    <div className={this.state.searchResult.length > 0 ? "marginTop48" : "container marginTop48"}>
                        {this.state.loading ?
                            <ScaleLoader
                                sizeUnit={"px"}
                                size={15}
                                color={'#123abc'}
                                loading={this.state.loading}
                            /> :
                            this.state.searchResult.length > 0 ? <div className="chipDiv"> {this.state.searchResult.map((value) => {
                                return <Chip key={value.created} label={value.name} className="chipStyle"
                                    color={this.state.higherPopulation === value.population ? 'primary' :
                                        this.state.lowerPopulation === value.population ? 'secondary' : 'default'}
                                    style={this.state.higherPopulation === value.population ? { fontSize: '30px' } :
                                        this.state.lowerPopulation === value.population ? { fontSize: '13px' } : { fontSize: '18px' }
                                    } onClick={() => { this.planetClick(value) }}
                                />
                            })}</div> : <div className="noResults">{this.state.message}</div>}
                    </div>
                    {planetInfo && Object.keys(planetInfo).length > 0 &&
                        <Paper className="marginTop48 showInfo">
                            <DisplayData data={planetInfo} />
                        </Paper>}
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.showSnackbar}
                    autoHideDuration={3000}
                    onClose={() => this.handleClose()}
                >
                    <SnackbarContent
                        aria-describedby="client-snackbar"
                        style={{ backgroundColor: '#d32f2f' }}
                        message={
                            <span id="client-snackbar" style={{ display: 'flex', alignItems: 'center' }}>
                                <WarningIcon style={{ marginRight: '8px' }} />
                                More than 15 searches per minute are not allowed.
                            </span>
                        }
                        action={[
                            <IconButton key="close" aria-label="close" color="inherit" onClick={() => this.handleClose()}>
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            </React.Fragment>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        userName: state.userName
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
