import { useState } from "react";
import { useHistory } from "react-router-dom";

export function DemoLogin() {

  //Hooks and States

  const history = useHistory();
  const email = "sanjayprashanth1997@gmail.com";
  const password = "Password@123";
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");

  //Post the user Details method to login
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("https://webscrpe.herokuapp.com/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setMes(data.message);
      setErr(data.error);
      if (data.token) return history.push("/dash-page");
    } catch (error) {
      setErr(error.error);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            readOnly={true}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            readOnly={true}
          />
        </div>
        <br />
        {mes && <div className="msg-div data-div">{mes}</div>}
        {err && <div className="error-div data-div">{err}</div>}
        <br />
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="forgot-password text-right">
          Forgot{" "}
          <a
            href="http://localhost:3000/forget-password"
            target="_blank"
            rel="noreferrer"
          >
            password?
          </a>
        </p>
        <p className="forgot-password text-right">
          New user? <a href="http://localhost:3000/signup">sign up</a>
        </p>
      </form>
    </div>
  );
}
