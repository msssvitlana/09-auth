// lib/api/api.ts
import axios from "axios"

 const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
})

export default nextServer;