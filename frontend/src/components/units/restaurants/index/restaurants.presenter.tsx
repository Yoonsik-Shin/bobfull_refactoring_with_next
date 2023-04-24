import Restaurant from "./restaurants.restaurant";

export default function RestaurantsUI({ restaurants, page, setPage }) {
  return (
    <>
      {restaurants.map((el, index) => (
        <Restaurant
          key={index}
          images={el.restaurantImage}
          id={el.id}
          name={el.name}
          address={el.address}
          isLast={index === restaurants.length - 2}
          newLimit={() => setPage(page + 1)}
        />
      ))}
    </>
  );
}
