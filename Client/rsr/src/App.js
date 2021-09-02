import './App.css';
import Navbar from './Components/Navbar'
import Symptoms from './Components/Symptoms';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './Components/Home'
import Footer from './Components/Footer';
import Register from './Components/Register';
import appointment from './Components/appointment';
import Clinic_Recommends from './Components/Clinic_recommends';
import BookSlot from './Components/BookSlot';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Route exact path='/' component={Home}/>
      <Route exact path='/symptoms' component={Symptoms}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/appointment' component={appointment}/>
      <Route exact path='/Clinic_Recommends' component={Clinic_Recommends}/>
      <Route exact path='/BookSlot' component={BookSlot}/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
