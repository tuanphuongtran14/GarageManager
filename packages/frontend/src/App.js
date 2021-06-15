import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { connect } from 'react-redux';

function App(props) {
  const display = () => {
    if(props.authorization.isLogin) {
      return (
        <Home/>
      )
    } else {
      return (
        <Login/>
      )
    }
  }
  
  return (
    <div className="App">
      {display()}
      {/* <Login/> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authorization: state.authorization
  }
};

export default connect(mapStateToProps, null)(App);
