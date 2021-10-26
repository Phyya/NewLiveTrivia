import { NavLink } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";
import { IoGameController } from "react-icons/io5";
import { LiveTv, PeopleAlt, Add, Person } from "@material-ui/icons";

const Nav = () => {
  return (
    <footer className="menu">
      <NavLink
        role="div"
        to="/homepage"
        activeClassName="active-text"
        inactiveClassName="white"
        className="menu__property"
      >
        <IoGameController style={{ fontSize: "2.6rem" }} />
        <span className="menu-text menu__property--bottom  ">Games</span>
      </NavLink>

      <NavLink
        role="div"
        to="/shop"
        activeClassName="active-text"
        className="menu__property"
      >
        <BiShoppingBag style={{ fontSize: "2.6rem" }} />
        <span className="menu-text menu__property--bottom">Shop</span>
      </NavLink>
      <NavLink
        role="div"
        to="/rankingpage"
        activeClassName="active-text"
        className="menu__property"
      >
        <FaCrown style={{ fontSize: "2.3rem" }} />
        <span className="menu-text menu__property--bottom">Ranking</span>
      </NavLink>

      <NavLink
        role="div"
        to="/profile"
        activeClassName="active-text"
        className="menu__property"
      >
        <Person style={{ fontSize: "2.6rem" }} />
        <span className="menu-text menu__property--bottom profile-name">
          Profile
        </span>
      </NavLink>
    </footer>
  );
};

export default Nav;
