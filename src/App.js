import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import './css/pure-min.css';
import './css/side-menu.css';
import './css/side-menu-old-ie.css';
import AuthorBox from './Author';
import Home from './Home'
import LivroBox from './Livro';


class App extends Component {
  render() {
    return (
      <Router>
        <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link"><span></span></a>
          <div id="menu">
            <div className="pure-menu">
              <Link className="pure-menu-heading" to="/">CDC Admin</Link>
              <ul className="pure-menu-list">
                <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Author</Link></li>
                <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Books</Link></li>
              </ul>
            </div>
          </div>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/autor" component={AuthorBox} />
            <Route path="/livro" component={LivroBox} />
            <Route component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;