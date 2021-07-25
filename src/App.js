import Home from './home' 
import Questions from './questions'
import Card from './card'
import './App.css';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/questions" exact component={Questions} />
        <Route path="/card" exact component={Card} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
