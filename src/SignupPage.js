import { useState } from "react";

//Hooks and States

export function SignupPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Post Method to submit the user Informations 
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("https://webscrpe.herokuapp.com/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMessage(data.message);
      setError(data.error);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>User name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <br />
        {message && <div className="msg-div data-div">{message}</div>}
        {error && <div className="error-div data-div">{error}</div>}
        <br />
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="text-right">
          Already registered <a href="https://web-scrapper.netlify.app/login">sign in?</a>
        </p>
      </form>
    </div>
  );
}
