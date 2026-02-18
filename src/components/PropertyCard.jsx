function PropertyCard({
  id,
  title,
  location,
  price,
  image,
  rating,
  toggleWishlist,
  isLiked
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 duration-300 relative">
      
      <button
        onClick={() =>
          toggleWishlist({ id, title, location, price, image, rating })
        }
        className="absolute top-3 right-3 text-2xl"
      >
        {isLiked ? "❤️" : "🤍"}
      </button>

      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">{title}</h2>
          <span className="text-sm font-medium">⭐ {rating}</span>
        </div>

        <p className="text-gray-500 text-sm">{location}</p>
        <p className="mt-2 font-bold">{price} / night</p>
      </div>
    </div>
  );
}

export default PropertyCard;