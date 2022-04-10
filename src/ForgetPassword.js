import { useState } from "react";

//Hooks and States

export function ForgetPassword() {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");

  //Forget Password methods

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("https://webscrpe.herokuapp.com/reset", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMsg(data.message);
      setErr(data.error);
    } catch (error) {
      setErr(error.error);
    }
  };

  return (
    <div className="forget-password">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onClick={() => {
              setMsg("");
              setErr("");
            }}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <br />
        <br />
        {msg && <div className="msg-div data-div">{msg}</div>}
        {err && <div className="error-div data-div">{err}</div>}
      </form>
    </div>
  );
}
