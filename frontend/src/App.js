import Box from '@mui/material/Box';
import Login from './pages/login/index'
import Signup from './pages/signup/index'
import './App.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Box className="App">
      <Switch>

        <Route exact path='/login'>
          <Login  AccountName='Client'/>  
        </Route>

        <Route exact path='/signup'>
          <Signup  AccountName='Client'/>
        </Route>

      </Switch>

    </Box>
  );
}

export default App;
