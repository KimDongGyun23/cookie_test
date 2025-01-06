import axios from "axios";
import { api } from "./test";
import { useMutation, useQuery } from "@tanstack/react-query";

const baseURL = import.meta.env.VITE_PUBLIC_SERVER;

export const reissue = async () =>
  await axios.post(
    `${baseURL}/api/reissue`,
    null,
    {
      withCredentials: true,
    }.then((res) => api.setAccessToken(res.headers.get("Authorization")))
  );

export const useFetchData = () =>
  useQuery({
    queryKey: ["data"],
    queryFn: async () => await api.get(`${baseURL}/api/test/1`),
    enabled: false,
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: async () =>
      await axios.post(`${baseURL}/api/signup`, {
        username: "ididid",
        nickname: "고로케",
        password: "password1",
      }),
  });

export const useValidationId = () =>
  useMutation({
    mutationFn: async () =>
      await axios.post(`${baseURL}/api/validate-id`, {
        username: "ididid",
        nickname: "고로케",
        password: "password1",
      }),
  });

export const useReIssue = () =>
  useMutation({
    mutationFn: async () =>
      await axios
        .post(`${baseURL}/api/reissue`, null, {
          withCredentials: true,
        })
        .then((res) => api.setAccessToken(res.headers.get("Authorization"))),
  });

export const useLogin = () => {
  const formData = new FormData();
  formData.append("username", "ididid");
  formData.append("password", "password1");

  return useMutation({
    mutationFn: async () =>
      await axios
        .post(`${baseURL}/api/login`, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        })
        .then((res) => api.setAccessToken(res.headers.get("Authorization"))),
  });
};
