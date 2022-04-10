import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
export function DashPage() {
  //States and Hooks 
  
  const [name, SetName] = useState("");
  const [amazon, setAmazon] = useState("");
  const [flipkart, setFlipkart] = useState("");
  const history = useHistory();
//Get request details

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("https://webscrpe.herokuapp.com/dash", {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setAmazon(data.user.amazonScrape.length);
        setFlipkart(data.user.flipkartScrape.length);

        SetName(data.user.username);
      } catch (error) {
        if (error) {
          history.replace("/");
        }
      }
    };
    getUser();
  }, []); 

//Logout method

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) return history.replace("/");
  };

  return (
    <div>
      <header>
        <nav className="nav-bar">
          <h3>
            <span>
              {" "}
              <FaUserAlt />
            </span>{" "}
            <span> {name}</span>
          </h3>
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <h1>Select a brand to scrape the details</h1>
      </header>
      <main>
        <div className="brand-image">
          <img
            onClick={() => history.push("/amazon-dash")}
            src="https://vectorseek.com/wp-content/uploads/2021/01/Amazon-Logo-Vector-730x730.jpg"
            alt="amazon"
          />
          <div className="prod-count">No of Products: {amazon} </div>
          <img
            onClick={() => history.push("/flipkart-dash")}
            src="https://www.itvoice.in/wp-content/uploads/2021/06/Flipkart-Logo.png"
            alt="flipkart"
          />
          <div className="prod-count">No of Products: {flipkart} </div>
        </div>
      </main>
    </div>
  );
}
