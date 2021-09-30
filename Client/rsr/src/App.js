import './App.css';
import React,{createContext,useReducer} from 'react'
import Navbar from './Components/Navbar'
import Symptoms from './Components/Symptoms';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Components/Home'
import Footer from './Components/Footer';
import Register from './Components/Register';
import appointment from './Components/appointment';
import Clinic_Recommends from './Components/Clinic_recommends';
import BookSlot from './Components/BookSlot';
import Clinic_login  from './Components/Clinic_login';
import PageNotFound from './Components/PageNotFound';
import Logout from './Components/Logout';
import {initialState,reducer} from './reducer/UseReducer'
import Analysis from './Components/Clinic_Analysis';

export const UserContext = createContext();

const App = ()=>{
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    
    <UserContext.Provider value={{state,dispatch}}>
    <div className="App">
      
    <BrowserRouter>
      
        <Route component={Navbar}/>
        <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/symptoms' component={Symptoms}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/appointment' component={appointment}/>
        <Route exact path='/Clinic_Recommends' component={Clinic_Recommends}/>
        <Route exact path='/BookSlot' component={BookSlot}/>
        <Route exact path='/Clinic_login' component={Clinic_login}/>
        <Route exact path='/Clinic_Analysis' component={Analysis}/>
        <Route exact path='/logout' component={Logout}/>
        <Route component={PageNotFound} />
        </Switch>
        <Route component={Footer}/>
      
    </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
}

export default App;
