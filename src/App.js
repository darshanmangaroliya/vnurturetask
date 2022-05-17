import React, { useState, useEffect } from "react";
import { View } from "./components/View";

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("books");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const App = () => {
  // main array of objects state || books state || books array of objects
  const [contacts, setContacts] = useState(getDatafromLS());

  // input field states
  const [name, setName] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [error, setError] = useState("");

  // form submit event
  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    // creating an object

    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.contactnumber === contactnumber ? contact : null
    );

    if (!zipcode || !name || !contactnumber) {
      return setError("Please fill in all fields!!");
    }

    if (checkContactPhoneExists.length > 0) {
      return setError("This phone number already exists!!");
    }

    let id = Date.now() + "" + Math.random();
    let Contact = {
      id,
      name,
      contactnumber,
      zipcode,
    };
    console.log(Contact);
    setContacts([...contacts, Contact]);
    setZipCode("");
    setName("");
    setContactnumber("");
    setError("");
  };

  // delete book from LS
  const deleteContact = (id) => {
    const newContactList = contacts.filter((element, index) => {
      return element.id !== id;
    });
    setContacts(newContactList);
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="wrapper">
      <h1>ContactList App</h1>
      <p>Add Contact</p>
      <div className="main">
        <div className="form-container">
          {error && <div className="text-danger">{error}</div>}
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleAddBookSubmit}
          >
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
            <br></br>
            <label>Contact number</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setContactnumber(e.target.value)}
              value={contactnumber}
            ></input>
            <br></br>
            <label>zipcode</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setZipCode(e.target.value)}
              value={zipcode}
            ></input>
            <br></br>
            <button type="submit" className="btn btn-success btn-md">
              ADD
            </button>
          </form>
        </div>

        <div className="view-container">
          {contacts.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>zipcode</th>
                      <th>Name</th>
                      <th>Contactnumber</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View contacts={contacts} deleteContact={deleteContact} />
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-danger btn-md"
                onClick={() => setContacts([])}
              >
                Remove All
              </button>
            </>
          )}
          {contacts.length < 1 && <div>No contacts are added yet</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
