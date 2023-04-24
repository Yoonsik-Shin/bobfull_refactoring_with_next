import { accessTokenState } from "@/commons/store";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import RestaurantsUI from "./restaurants.presenter";
import { fetchRestaurant } from "./restaurants.queries";

export default function Restaurants() {
  const accessToken = useRecoilValue(accessTokenState);
  const [restaurants, setRestaurants] = useState<object[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchRestaurant({ accessToken, setRestaurants, page, limit });
    console.log(page);
  }, [page]);

  return (
    <RestaurantsUI restaurants={restaurants} page={page} setPage={setPage} />
  );
}
