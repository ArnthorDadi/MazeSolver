import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends Component {

  render() {
    const {Title} = this.props;

    return (
      <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" align="left">
            <div style={{ marginRight: '50px' }}>
              {Title}
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}

export default Header;