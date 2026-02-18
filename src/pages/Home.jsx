import PropertyCard from "../components/PropertyCard";

function Home({ properties, toggleWishlist, wishlist }) {
  return (
    <div className="max-w-7xl mx-auto p-8">
      {properties.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No properties found 😢
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
            toggleWishlist={toggleWishlist}
            isLiked={wishlist.some((item) => item.id === property.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;