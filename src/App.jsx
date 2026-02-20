import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Home from "./Home";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if (!user) return <Login />;

  return (
    <>
      <Navbar user={user} />
      <Home user={user} />
      <Dashboard user={user} />
    </>
  );
}

export default App;