import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function Navbar({ user }) {
  return (
    <div style={styles.nav}>
      <h2 style={{ color: "#ff385c" }}>StayFinder</h2>

      <div>
        <span style={{ marginRight: "15px" }}>{user.email}</span>
        <button style={styles.btn} onClick={() => signOut(auth)}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  btn: {
    background: "#ff385c",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "20px",
    cursor: "pointer"
  }
};

export default Navbar;