import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";

function Home({ user }) {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "houses"), (snapshot) => {
      setHouses(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const toggleWishlist = async (house) => {
    const houseRef = doc(db, "houses", house.id);

    if (house.wishlist?.includes(user.uid)) {
      await updateDoc(houseRef, {
        wishlist: arrayRemove(user.uid)
      });
    } else {
      await updateDoc(houseRef, {
        wishlist: arrayUnion(user.uid)
      });
    }
  };

  return (
    <div style={styles.grid}>
      {houses.map((house) => (
        <div key={house.id} style={styles.card}>
          <img src={house.imageUrl} alt="house" style={styles.image} />

          <div style={{ padding: "10px" }}>
            <p><b>Owner:</b> {house.ownerEmail}</p>

            <button
              style={{
                ...styles.wishlist,
                background:
                  house.wishlist?.includes(user.uid)
                    ? "#ff385c"
                    : "#ddd"
              }}
              onClick={() => toggleWishlist(house)}
            >
              ❤️ Wishlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
    gap: "20px",
    padding: "20px"
  },
  card: {
    background: "white",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover"
  },
  wishlist: {
    padding: "8px 15px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer"
  }
};

export default Home;