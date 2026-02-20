import { useState } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={{ color: "#ff385c" }}>StayFinder</h2>

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>

        <button style={styles.button} onClick={signup}>
          Signup
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f7f7"
  },
  box: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  input: {
    display: "block",
    width: "250px",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },
  button: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "20px",
    border: "none",
    background: "#ff385c",
    color: "white",
    cursor: "pointer"
  }
};

export default Login;