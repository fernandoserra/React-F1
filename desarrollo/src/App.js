import React, { Component } from 'react';
import axios from 'axios'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey900, pink500 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { Card, CardHeader } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Morevert from 'material-ui/svg-icons/navigation/more-vert';
import ActionAndroid from 'material-ui/svg-icons/action/code';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

injectTapEventPlugin();

const contentStyle = {
  width: '80%',
  margin: '0 auto',
  paddingTop: '20px'

};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey900,
    accent1Color: pink500
  }
})
class App extends Component {

  constructor() {
    super()
    this.state = {
      posts: [],
      inff: [],
      _drive: [],
      _constructors: [],
      open: false,
      open2: false
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };


  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen2 = (detalles) => {
    this.setState({
      open2: true,
      inff: detalles,
      _drive: detalles.Driver,
      _constructors: detalles.Constructors['0']
    });
  };
  handleClose2 = () => {
    this.setState({ open2: false });
  };

  componentDidMount() {
    axios.get('http://ergast.com/api/f1/2017/driverStandings.json')
      .then(res => {
        console.log(res.data)
        this.setState({
          posts: res.data.MRData.StandingsTable.StandingsLists['0'].DriverStandings
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {

    const actions = [
      <FlatButton
        label="Aceptar"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    const actions2 = [
      <FlatButton
        label="Aceptar"
        primary={true}
        onClick={this.handleClose2}
      />
    ];

    const posts = this.state.posts.map((post, i) => {
      return (
        <div key={i}>
          <ListItem leftAvatar={<Avatar size={45} src={'pilotos/' + post.Driver.driverId + '.jpg'} />} primaryText={post.Driver.givenName + ' ' + post.Driver.familyName}
            secondaryText={' Pts:' + post.points + '.  Escuderia: ' + post.Constructors[0].name} rightIcon={<Morevert onClick={this.handleOpen2.bind(this, post)} />} >   </ListItem>
          <Divider />
        </div >
      )
    });


    return (
      <MuiThemeProvider muiTheme={muiTheme} >
        <div>
          <AppBar title={<img className='logo' src='https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg' />}
            showMenuIconButton={false} iconElementRight={<FlatButton label="Info" icon={<ActionAndroid />} onClick={this.handleOpen} />} />
          <div style={contentStyle}>
            <Card>
              <CardHeader title="Clasificación de pilotos" subtitle="Temporada 2017" />
              <List>
                {posts}
              </List>
            </Card>
          </div>

          <div>
            <Dialog title="Información"
              actions={actions}
              modal={true}
              open={this.state.open}>
              <List>
                <ListItem
                  primaryText="React.Js"
                  secondaryText={<a href='https://reactjs.org/' target='_blank'>https://reactjs.org/</a>}
                  leftAvatar={<Avatar src="tecnologias/react.jpg" size={45} />}
                />
                <Divider />
                <ListItem
                  primaryText="Material-UI "
                  secondaryText={<a href='http://www.material-ui.com' target='_blank'>http://www.material-ui.com</a>}
                  leftAvatar={<Avatar src="tecnologias/material-ui.jpg" size={45} />}
                />
                <Divider />
                <ListItem
                  primaryText="Ergast API"
                  secondaryText={<a href='http://ergast.com/mrd/' target='_blank'>http://ergast.com/mrd/</a>}
                  leftAvatar={<Avatar src="tecnologias/ergast.jpg" size={45} />}
                />
                <Divider />
                <ListItem
                  primaryText="F1"
                  secondaryText={<a href='https://www.formula1.com/' target='_blank'>https://www.formula1.com/</a>}
                  leftAvatar={<Avatar src="tecnologias/f1.jpg" size={45} />}
                />
                <Divider />
                <ListItem
                  primaryText="@fernando_serra"
                  secondaryText={<a href='https://fernandoserra.github.io/' target='_blank'>https://fernandoserra.github.io/</a>}
                  leftAvatar={<Avatar src="https://pbs.twimg.com/profile_images/776791781870596096/gpRPRPBz_400x400.jpg" size={45} />}
                />
                <Divider />
              </List>
            </Dialog>
          </div>

          <div>
            <Dialog title="Detalles" actions={actions2} modal={true}
              open={this.state.open2}>
              <center>
                {<Avatar src={'pilotos/' + this.state._drive.driverId + '.jpg'} size={150} />}
                <br />
                <strong>{this.state.inff.position} ) {this.state._drive.givenName + ' ' + this.state._drive.familyName} Nº{this.state._drive.permanentNumber}</strong>
                <br />
                <strong>{this.state._drive.nationality + ' (' + this.state._drive.dateOfBirth + ')'}</strong>
              </center>
              <br /><br />
              <div>
                <div className='rc'>
                  <strong> Nº de Victorias:</strong> {this.state.inff.wins}
                </div>
                <div className='rc'>
                  <strong> Nº de puntos: </strong>{this.state.inff.points}
                </div>
              </div>

              <div>
                <div className='rc'>
                  <strong>Escuderia:</strong>  {this.state._constructors.name}
                </div>
                <div className='rc'>
                  <strong>Nacionalidad:</strong> {this.state._constructors.nationality}
                </div>
              </div>

            </Dialog>
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
