import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../store";
import { authorizedAxios } from "./AuthorizedAxios";
import { refreshAccessToken } from "./getRefreshAccessToken";

export default function CustomAxios(props) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();

  // const axiosReq = () =>
  //   authorizedAxios.interceptors.request.use((config) => {
  //     config.headers.Authorization = `Bearer ${accessToken}`;
  //     return config;
  //   });

  const axiosRes = async () =>
    authorizedAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const {
          config,
          response: { status },
        } = error;
        if (status === 401) {
          return refreshAccessToken({ accessToken })
            .then(async (token) => {
              config.headers.Authorization = `Bearer ${token}`;
              setAccessToken(token);
              return authorizedAxios(config);
            })
            .catch((error) => {
              alert("로그인 기간이 만료되었습니다. 다시 로그인 해주세요");
              router.push("/login");
              Promise.reject(error);
            });
        }
        return Promise.reject(error);
      }
    );

  useEffect(() => {
    axiosRes();
  }, []);

  return <>{props.children}</>;
}
