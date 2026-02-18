import PropertyCard from "../components/PropertyCard";

function Wishlist({ wishlist, toggleWishlist }) {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No properties saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
              toggleWishlist={toggleWishlist}
              isLiked={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;