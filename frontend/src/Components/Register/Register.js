import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("User Data:", { name, email, password, confirmpassword });
    
    axios.post('http://localhost:8070/user/register', {
      name,
      email,
      password,
      confirmpassword,
    })
    .then( res => {
      navigate("/login")
      console.log("Response:", res.data);
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
              <h1>Signup</h1>
            </div>

            <div className="form-group">
              <div className="mb-3">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUserName1"
                  aria-describedby="usernameHelp"
                  placeholder="User Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  placeholder="nimesh@gmail.com"
                  className="form-control"
                  id="exampleInputEmail1"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputConfirmPassword1"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="container text-center">
                <button type="submit" className="btn btn-primary">
                  Signup
                </button>
              </div>

              <div className="container text-center">
                <p>
                  Already have an account?{" "}
                  <a className="text-decoration-none" href="/login">
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;


// import React, { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmpassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!name || !email || !password || !confirmpassword) {
//       setError("All fields are required");
//       return;
//     }

//     if (password !== confirmpassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setError('');
//     setSuccess('');

//     axios.post('http://localhost:8070/user/register', { name, email, password })
//       .then(res => {
//         setSuccess("Registration successful!");
//         console.log(res.data);
//       })
//       .catch(err => {
//         setError("Registration failed. Please try again.");
//         console.log(err);
//       });
//   };

//   return (
//     <div className="container mt-5 p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
//       <div className="row justify-content-center">
//         <div className="col-md-6 col-lg-4">
//           <form onSubmit={handleSubmit}>
//             <div className="container text-center">
//               <h1>Signup</h1>
//             </div>

//             {error && <div className="alert alert-danger">{error}</div>}
//             {success && <div className="alert alert-success">{success}</div>}

//             <div className="form-group">
//               <div className="mb-3">
//                 <label className="form-label">User Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="User Name"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Email address</label>
//                 <input
//                   type="email"
//                   placeholder="nimesh@gmail.com"
//                   className="form-control"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <div className="form-text">
//                   We'll never share your email with anyone else.
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Confirm Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Confirm Password"
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//               </div>

//               <div className="container text-center">
//                 <button type="submit" className="btn btn-primary">
//                   Signup
//                 </button>
//               </div>

//               <div className="container text-center">
//                 <p>
//                   Already have an account?{" "}
//                   <a className="text-decoration-none" href="/login">
//                     Log in
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;