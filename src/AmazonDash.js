import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export function AmazonDash() {
  //states and hooks

  const history = useHistory();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState("");
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  //Get details from the api.
  //Check price every eight hours.
setInterval(()=>{
  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await fetch("https://webscrpe.herokuapp.com/amazon", {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        setName(data.user);
        setProducts(data.data); //setting the product details in the product hook
        if (!data) return console.log("I'm not available");
      } catch (error) {
        setErr(error.error);
      }
    };
    getDetails();
    
  }, []);
},28800000)

  //Create a new ProductList

  const handlePost = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("https://webscrpe.herokuapp.com/amazon",{
        method: "POST",
        body: JSON.stringify({
          url,
          price,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      const newProducts = await data.data;
      //error handlings
      //Incase we couldn't get the data
      if (!newProducts) {
        data.error
          ? setErr(data.error)
          : setErr("Sorry couldn't scrape your data");
        setUrl("");
        setPrice("");
      }
      //If we have the data..
      else {
        setProducts([...products, newProducts]); //spead and add a new product to the list
        setMes(data.message);
        setErr(data.error);
        setUrl("");
        setPrice("");
      }
    } catch (error) {
      setErr(error.error);
    }
  };

  //Edit function to get userId

  const handleEdit = async (item) => {
    const id = await item._id;
    setId(id);
    setShow(true);
  };

  //Price editing feature
  const editPrice = async () => {
    try {
      const response = await fetch(`https://webscrpe.herokuapp.com/amazon/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          buyPrice: price,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      const result = await data.data;
      //find the index of the product to be deleted
      const index = await products.findIndex((product) => product._id === id);
      let editedProducts = [...products];
      editedProducts[index] = result;
      setProducts(editedProducts);
      setMes(data.message);
      setErr(data.error);
    } catch (error) {
      setErr(error.error);
    }
  };

  //Delete a product
  const handleDelete = async (item) => {
    try {
      const idx = await item._id;
      const res = await fetch(`https://webscrpe.herokuapp.com/amazon/${idx}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      console.log(data);
      //method to cut the selected product
      const newProducts = await products.filter(
        (product) => product._id !== idx
      );
      setProducts(newProducts);
    } catch (error) {
      console.log(error);
    }
  };

  //logout method

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) return history.replace("/");
  };

  return (
    <div className="product-page">
      <header>
        <nav className="nav-bar">
          <h3>
            <span>
              {" "}
              <FaUserAlt />
            </span>{" "}
            <span>{name}</span>
          </h3>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <h1>Enter details to scrape Amazon product</h1>
      <main>
        <div className="post-product">
          <form onSubmit={handlePost} onClick={() => setMes("")}>
            <div className="form-group">
              <label>Product Url</label>
              <input
                type="url"
                className="form-control"
                placeholder="Enter product url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Buy Price </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Buy Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <br />
            {mes && <div className="msg-div data-div">{mes}</div>}
            {err && <div className="error-div data-div">{err}</div>}
            <br />
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
        <div className="all-products">
          {products &&
            products?.map((item, id) => (
              <div key={id} className="indi-product">
                <h6 className="long-name">{item?.productName}</h6>
                <img src={item?.productImage} alt="productImage" />
                <p>Current Price :₹{item?.productPrice}</p>
                <p>Buy Price :₹{item?.buyPrice}</p>
                <a href={item?.productUrl} target="_blank" rel="noreferrer">
                  Vist website
                </a>

                <div className="product-button">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </main>
      <footer>
        <div>
          <Modal
            show={show}
            onHide={() => {
              setShow(false);
              setMes("");
              setPrice("");
            }}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Your Buy Price</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Buy Price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
                <br />
                <Button variant="success" onClick={editPrice}>
                  Change
                </Button>{" "}
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShow(false);
                    setMes("");
                    setPrice("");
                  }}
                >
                  Close
                </Button>
              </div>
            </Modal.Body>
            <br />
            {mes && <div className="msg-div data-div">{mes}</div>}
            {err && <div className="error-div data-div">{err}</div>}
            <br />
          </Modal>
        </div>
      </footer>
    </div>
  );
}
