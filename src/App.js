import React, { Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './components/pages/Home';
import InitialPage from './components/pages/InitialPage';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import ResetPassword from './components/pages/ResetPassword';
import Curiosidades from './components/pages/Curiosidades';
import Sobre from './components/pages/Sobre';
import Perfil from './components/pages/Perfil';
import AuthState from './context/AuthState';
import PokemonApiState from './context/pokemonapi/PokemonapiState';
import PrivateRoute from '../src/components/private/PrivateRoute';
import Navbar from './components/layout/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './utils/ScrollToTop';
toast.configure();

const App = () => {
  return (
    <Fragment>
      <PokemonApiState>
        <AuthState>
          <Router>
            <Navbar />
            <ScrollToTop />
            <Switch>
              <Route exact path='/'>
                <Redirect to='/initialpage' />
              </Route>
              <Route exact path='/initialpage' component={InitialPage} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/resetpassword' component={ResetPassword} />
              <PrivateRoute exact path='/perfil' component={Perfil} />
              <PrivateRoute exact path='/sobre' component={Sobre} />
              <PrivateRoute
                exact
                path='/curiosidades'
                component={Curiosidades}
              />
              <PrivateRoute exact path='/home' component={Home} />
            </Switch>
          </Router>
        </AuthState>
      </PokemonApiState>
    </Fragment>
  );
};

export default App;
