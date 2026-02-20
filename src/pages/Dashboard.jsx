import { useState } from "react";
import { storage, db } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function Dashboard({ user }) {
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    if (!image) return alert("Select image first");

    const imageRef = ref(storage, `houses/${Date.now()}-${image.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);

    await addDoc(collection(db, "houses"), {
      imageUrl: url,
      ownerEmail: user.email,
      wishlist: []
    });

    alert("House Uploaded Successfully");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Upload Your House</h3>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        style={{
          marginLeft: "10px",
          padding: "8px 15px",
          borderRadius: "20px",
          border: "none",
          background: "#ff385c",
          color: "white"
        }}
        onClick={uploadImage}
      >
        Upload
      </button>
    </div>
  );
}

export default Dashboard;