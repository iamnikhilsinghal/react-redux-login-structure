import React, { Component } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import "./login.scss";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import BackdropLoader from "../../services/loader";
import swal from "sweetalert";
import logo from "../../assets/signin.svg";
import responsiveLogo from "../../assets/logo.svg";
import { connect } from "react-redux";
import { loginStart } from "../../redux/auth/login";
import { getAuthToken } from "../../services/authService";
import history from "../../history";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      show: false,
      loader: false,
      errors: { email: "", password: "" },
      checkedA: false,
    };
  }

  componentDidMount() {
    if (getAuthToken()) {
      history.push("/dashboard");
    }
  }

  handleChange = (e) => {
    if (e.target.id === "email") {
      this.setState({ email: e.target.value });
    }

    if (e.target.id === "password") {
      this.setState({ password: e.target.value });
    }
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  validateForm = (email, password) => {
    const { errors } = this.state;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    errors.email = validEmailRegex.test(email.trim())
      ? ""
      : "Email is not valid!";
    errors.password =
      password.trim().length > 6
        ? ""
        : "Password should be greater than 6 characters";
    this.setState({ errors });
    return this.state.errors.email === "Email is not valid!" ||
      this.state.errors.password ===
        "Password should be greater than 6 characters"
      ? false
      : true;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.email === "" || this.state.password === "") {
      swal({
        icon: "warning",
        title: "Please enter Email-ID and Password",
      });
      return;
    } else if (this.validateForm(this.state.email, this.state.password)) {
      const { email, password, checkedA } = this.state;
      this.props.handleLogin({
        email,
        password,
        isRememberMe: checkedA,
        history: this.props.history,
      });
    }
  };

  render() {
    return (
      <div className="signMain">
        <BackdropLoader open={this.props.auth.loading} />
        <div className="subsignSection">
          <div className="logoPart">
            <img
              src={responsiveLogo}
              className="responsiveLogo"
              alt="responsiveLogo"
            ></img>
            <img src={logo} alt="logo"></img>
          </div>

          <div className="signForm">
            <h2 className="title">Welcome Back</h2>
            <p className="description">
              To keep connected with us please sign in with your email address
              and password.
            </p>
            <form noValidate onSubmit={this.onSubmit}>
              <TextField
                value={this.state.email}
                className="emailField"
                margin="normal"
                id="email"
                name="email"
                placeholder="Email Address"
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">@</InputAdornment>
                  ),
                }}
                helperText={
                  this.state.errors.email ? this.state.errors.email : ""
                }
              />
              <TextField
                className="loginPassword"
                margin="normal"
                id="password"
                name="password"
                placeholder="Password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={
                  this.state.errors.password ? this.state.errors.password : ""
                }
              />

              <div className="rememberForgPassSection">
                <div className="forgotpassLink">
                  <Link to="/forgotPassword" variant="body2">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="signBtn"
              >
                Sign In
              </Button>
              <div className="signupLink">
                Create an account?
                <Link to="/signup" variant="body2">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.login,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (data) => dispatch(loginStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
