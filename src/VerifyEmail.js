import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function VerifyEmail() {
  //Hooks and States

  const param = useParams();
  const [valid, setValid] = useState("");
  const [err, setErr] = useState("");

  //Get Method using Useeffect to verify the user email Id
  
  useEffect(() => {
    const getVerifed = async () => {
      try {
        const res = await fetch(
          `https://webscrpe.herokuapp.com/signup/users/${param.id}/verify/${param.token}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        console.log(data);
        setValid(data.message);
        setErr(data.error);
      } catch (error) {}
    };
    getVerifed();
  }, [param]);

  return (
    <div>
      {valid && <h2 className="msg-div data-div">{valid}</h2>}
      {err && <h2 className="error-div data-div">{err}</h2>}
    </div>
  );
}
