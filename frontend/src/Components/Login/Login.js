import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials =true



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("User Data:", { email, password });




    axios
      .post("http://localhost:8070/user/login", {
        email,
        password,
      })
      .then((res) => {
console.log(res)
        if(res.data.Login){
          navigate("/dashboard");
        }else{
          navigate("/")
        }
      
       // console.log("Response:", res.data);
       //   navigate("/home");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <div className="container mt-5 p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <form onSubmit={handleSubmit}>
            <div className="container text-center">
              <h1>Login</h1>
            </div>

            <div className="form-group">
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  placeholder="nimesh@gmail.com"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label">Check me out</label>
            </div> */}

              <div className="container text-center p-2">
                <a href="/frogot" className=" text-decoration-none">
                  Frogot password?
                </a>
              </div>

              <div className="container text-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>

            <div className="container text-center">
              <p>
                Don't have an account?{" "}
                <a href="/register" className="text-decoration-none">
                  Signup
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
