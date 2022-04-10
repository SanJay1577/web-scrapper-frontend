import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function PasswordReset() {
  //Hooks and states

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const param = useParams();

  //Get the details of the id and token to request a reset form

  useEffect(() => {
    const getReset = async () => {
      try {
        const response = await fetch(
          `https://webscrpe.herokuapp.com/reset/${param.id}/${param.token}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setMsg(data.message);
        setErr(data.error);
      } catch (error) {
        console.log(error);
        setErr(error.error);
      }
    };
    getReset();
  }, [param]);

//submit the new password 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://webscrpe.herokuapp.com/reset/${param.id}/${param.token}`,
        {
          method: "POST",
          body: JSON.stringify({ password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setError(data.error);
      setSucess(data.message);
    } catch (error) {
      setError(error.error);
    }
  };
  return (
    <div className="forget-password">
      {msg && <div className="msg-div data-div">{msg}</div>}
      {err && <div className="error-div data-div">{err}</div>}
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onClick={() => {
              setMsg("");
              setSucess("");
            }}
          />
        </div>
        <br />
        {sucess && <div className="msg-div data-div">{sucess}</div>}
        {error && <div className="error-div data-div">{error}</div>}
        <br />
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
    </div>
  );
}
