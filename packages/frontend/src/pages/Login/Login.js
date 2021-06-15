import React from 'react'
import './Login.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index'
import { useHistory } from 'react-router-dom'

function Login(props) {
  let history = useHistory();
  
  const login = (event) => {
    event.preventDefault();
    let token = "ddasflkd2o34ojewfj";
    let userInfo = {
      username: "phuongtt",
      email: "tuanphuongtran.14@gmail.com"
    };

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

    props.setLogin(userInfo, token)
    history.push("/quan-ly-xe/tiep-nhan-xe")
  }
    return (
        <div className="login__panel">
        <div className="login__box shadow rounded p-4">
          <h2 className="text-center">Đăng nhập</h2>
          <form>
            <div className="form-group">
              <label>Tên tài khoản</label>
              <input type="text" className="form-control" aria-describedby="helpId"  />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input type="password" className="form-control"  />
            </div>
            <button type="submit" className="btn btn-success w-100 my-3" onClick={login}>Đăng nhập</button>
          </form>
          <p className="text-center">Chưa có tài khoản? <a href="/">Đăng kí ngay</a></p>
          <p className="text-center"><a href="/">Quên mật khẩu</a></p>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    authorization: state.authorization
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setLogin: (userInfo, token) => {
      dispatch(actions.setLogin(userInfo, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);