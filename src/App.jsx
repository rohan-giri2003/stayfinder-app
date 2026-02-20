import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <Login />;

  return (
    <div style={{ fontFamily: "Arial", background: "#f7f7f7" }}>
      <Navbar user={user} />
      <Home user={user} />
      <Dashboard user={user} />
    </div>
  );
}

export default App;