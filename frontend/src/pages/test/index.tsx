import { authorizedAxios } from "@/commons/lib/AuthorizedAxios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../commons/store";

export default function PaginationTestPage() {
  const [startPage, setStartPage] = useState(1);
  const [page, setPage] = useState(1);
  const [restaurants, setRestaurants] = useState<object[]>([]);
  const [lastPage, setLastPage] = useState<number>(0);
  const limit = 10;
  const accessToken = useRecoilValue(accessTokenState);
  const fetchRestaurantCount = async () => {
    const result = await authorizedAxios({
      method: "get",
      url: `/restaurant/countAll`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setLastPage(Math.ceil(result.data / limit));
  };

  const onClickPage = (e) => {
    setPage(Number(e.currentTarget.id));
  };

  const fetchRestaurant = async () => {
    const result = await authorizedAxios({
      method: "get",
      url: `/restaurant?page=${page}&limit=${limit}`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setRestaurants(result.data);
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage((prev) => prev - 10);
    setPage(startPage - 10);
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage((prev) => prev + 10);
      setPage(startPage + 10);
    }
  };

  useEffect(() => {
    fetchRestaurant();
    fetchRestaurantCount();
  }, [page]);

  return (
    <>
      {restaurants &&
        restaurants.map((el) => (
          <>
            <div>{el.name}</div>
          </>
        ))}
      <span onClick={onClickPrevPage}>이전</span>
      {new Array(10).fill(1).map((_, index) => {
        return (
          index + startPage <= lastPage && (
            <span id={String(index + startPage)} onClick={onClickPage}>
              {index + startPage}
            </span>
          )
        );
      })}
      <span onClick={onClickNextPage}>이후</span>
    </>
  );
}
