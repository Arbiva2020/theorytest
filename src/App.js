import Home from './home' 
import Questions from './questions'
import Card from './card'
import './App.css';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrouserRouter>
      <Route path="/" exact component={Home}/>
      <Switch>
        <Route path="/questions" exact component={Questions} />
        <Route path="/card" exact component={Card} />
      </Switch>
      </BrouserRouter>
    </div>
  );
}

export default App;
