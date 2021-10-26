import Nav from "./NavLink";
import "./styles3.css";
import { useState } from "react";
// import { Plugins } from "@capacitor/core";
// const { Contacts } = Plugins;

import { Contacts } from "@capacitor-community/contacts";

const Friends = () => {
  const [contacts, setContacts] = useState([]);
  const getContacts = () => {
    Contacts.getContacts().then((result) => {
      console.log(result, "from get contacts");
      localStorage.setItem("contacts", JSON.stringify(result.contacts));
      setContacts(result.contacts);
    });
  };
  const getPermissions = () => {
    Contacts.getPermissions().then((result) =>
      console.log(result, "from permission")
    );
  };
  return (
    <div>
      <div className="container">
        <section className="vsfriend phone-book">
          <div className="vsfriend__add">
            <button className="vsfriend__add-phonebook phonebook-active">
              Add from Phonebook
            </button>
            <button className="vsfriend__add-search phonebook-search">
              Search
            </button>
            <button onClick={getPermissions}>Get permissions</button>
            <button onClick={getContacts}>Fetch Contacts</button>
          </div>

          <div className="vsfriend__searchBar">
            <div className="vsfriend__searchBar-img">
              <img src="../img/search-icon.svg" alt="search-icon" />
            </div>
            <input type="search" placeholder="search contacts" />
            <div className="vsfriend__searchBar-close">
              <a href="#">&times; </a>
            </div>
          </div>

          <p className="phone-book__heading">Contact List</p>
          {contacts.map((c) => (
            <div className="vsfriend__friends">
              <div className="vsfriend__friends-image">
                <img
                  src="../img/admin1.jpg"
                  alt="friend-pix"
                  className="vsfriend__friends-image--pix"
                />
              </div>
              <p className="vsfriend__friends-name phone-book__name">
                {c.displayName}
              </p>
              <p className="vsfriend__friends-name phone-book__name">
                {c.phoneNumbers[0]}
              </p>
              <a href="../html/playfree.html">
                <button className="vsfriend__friends-play">Add</button>{" "}
              </a>
            </div>
          ))}
        </section>
      </div>

      <Nav />
    </div>
  );
};

export default Friends;

{
  /* <div className="vsfriend__friends">
            <div className="vsfriend__friends-image">
              <img
                src="../img/admin1.jpg"
                alt="friend-pix"
                className="vsfriend__friends-image--pix"
              />
            </div>
            <p className="vsfriend__friends-name phone-book__name">Philip</p>
            <a href="../html/playfree.html">
              <button className="vsfriend__friends-play">Add</button>{" "}
            </a>
          </div>

          <div className="vsfriend__friends">
            <div className="vsfriend__friends-image">
              <img
                src="../img/admin1.jpg"
                alt="friend-pix"
                className="vsfriend__friends-image--pix"
              />
            </div>
            <p className="vsfriend__friends-name phone-book__name">Philip</p>
            <a href="../html/playfree.html">
              <button className="vsfriend__friends-play">Add</button>{" "}
            </a>
          </div>

          <div className="vsfriend__friends">
            <div className="vsfriend__friends-image">
              <img
                src="../img/admin1.jpg"
                alt="friend-pix"
                className="vsfriend__friends-image--pix"
              />
            </div>
            <p className="vsfriend__friends-name phone-book__name">Philip</p>
            <a href="../html/playfree.html">
              <button className="vsfriend__friends-play">Add</button>{" "}
            </a>
          </div>

          <div className="vsfriend__friends">
            <div className="vsfriend__friends-image">
              <img
                src="../img/Vector.svg"
                alt="friend-pix"
                className="vsfriend__friends-image--pix"
              />
            </div>
            <p className="vsfriend__friends-name phone-book__name">Cesna</p>
            <a href="../html/playfree.html">
              <button className="vsfriend__friends-play invite">invite</button>{" "}
            </a>
          </div>

          <div className="vsfriend__friends">
            <div className="vsfriend__friends-image">
              <img
                src="../img/Vector.svg"
                alt="friend-pix"
                className="vsfriend__friends-image--pix"
              />
            </div>
            <p className="vsfriend__friends-name phone-book__name">Purity</p>
            <a href="../html/playfree.html">
              <button className="vsfriend__friends-play invite">invite</button>{" "}
            </a>
          </div> */
}
