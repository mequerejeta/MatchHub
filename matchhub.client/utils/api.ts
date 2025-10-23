import axios from "axios"
import type { Match, CreateMatchRequest, RegisterResultRequest } from "@/store/matchesSlice"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:44301"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const fetchMatches = async (): Promise<Match[]> => {
  const { data } = await api.get("/api/v1/matches")
  return data
}

export const fetchMatchById = async (id: string): Promise<Match> => {
  const { data } = await api.get(`/api/v1/matches/${id}`)
  return data
}

export const createMatch = async (match: CreateMatchRequest): Promise<Match> => {
  const { data } = await api.post("/api/v1/matches", match)
  return data
}

export const registerResult = async (request: RegisterResultRequest): Promise<Match> => {
  const { data } = await api.patch(`/api/v1/matches/${request.matchId}/result`, request)
  return data
}

export const deleteMatch = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/matches/${id}`)
}

export default api
