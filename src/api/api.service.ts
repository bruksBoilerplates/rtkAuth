import JwtService from "./jwt.service";
import axios, { AxiosRequestConfig } from "axios";

import {API_ROOT} from "../Constants/constants";

export const axiosClient = axios.create({
  baseURL: API_ROOT
});

const ApiService = {
  setHeader() {
    axiosClient.defaults.headers[
        "Authorization"
        ] = `Bearer ${JwtService.getToken()}`;
  },

  query(resource: string, params: AxiosRequestConfig | undefined) {
    return axiosClient.get(resource, params).catch((error) => {
      // throw new Error(error);
      throw new Error(`[NETWORK]  ${error} Please try again`);
    });
  },

  get(resource, slug = "") {
    return axiosClient.get(slug ? `${resource}/${slug}` :`${resource}`).catch((error) => {

      throw new Error(`[NETWORK] Service ${error} Please try again`);
    });
  },

  post(resource, params?: any) {
    return axiosClient.post(`${resource}`, params).catch((error) => {

      throw new Error(`[NETWORK]  ${error} Please try again`);
    });
  },

  update(resource, slug, params) {
    return axiosClient.patch(`${resource}/${slug}`, params).catch((error) => {
      throw new Error(`[NETWORK]  ${error} Please try again`);
    });
  },

  put(resource, params) {
    return axiosClient.put(`${resource}`, params).catch((error) => {
      throw new Error(`[NETWORK] Service ${error} Please try again`);
    });
  },

  delete(resource) {
    return axiosClient.delete(resource).catch((error) => {
      throw new Error(`[NETWORK] Service ${error} Please try again`);
    });
  }
};

export default ApiService;

export const TagsService = {
  get:()=> ApiService.get("tags") };

export const AuthService={
  login: info=>ApiService.post('auth/login', info),
  signup: info=>ApiService.post('auth/register', info),
}

const users = {
  delete: id => ApiService.delete(`/users/${id}`),
  get: id => ApiService.get(id ? `/users/${id}` : '/users'),
  update: (id, updates) => ApiService.put(`/users/${id}`, updates),
  create: user => ApiService.post('/users', user),
}

