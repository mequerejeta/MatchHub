import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import {
  fetchMatches,
  createMatch,
  deleteMatch as deleteMatchAPI,
  fetchMatchById,
  registerResult as registerResultAPI,
} from "../utils/api"

export interface Match {
  id: string
  date: string
  location: string
  playersPerTeam: number
  teamA: string
  teamB: string
  teamAGoals?: number
  teamBGoals?: number
  status?: "scheduled" | "completed" | "cancelled"
}

export interface CreateMatchRequest {
  date: string
  location: string
  playersPerTeam: number
  teamA: string
  teamB: string
}

export interface RegisterResultRequest {
  matchId: string
  teamAGoals: number
  teamBGoals: number
}

type ViewType = "list" | "create" | "detail"

interface MatchesState {
  matches: Match[]
  currentMatch: Match | null
  loading: boolean
  error: string | null
  currentView: ViewType
  selectedMatchId: string | null
}

const initialState: MatchesState = {
  matches: [],
  currentMatch: null,
  loading: false,
  error: null,
  currentView: "list",
  selectedMatchId: null,
}

export const getMatches = createAsyncThunk("matches/getMatches", async () => {
  const response = await fetchMatches()
  return response
})

export const getMatchById = createAsyncThunk("matches/getMatchById", async (id: string) => {
  const response = await fetchMatchById(id)
  return response
})

export const addMatch = createAsyncThunk("matches/addMatch", async (match: CreateMatchRequest) => {
  const response = await createMatch(match)
  return response
})

export const removeMatch = createAsyncThunk("matches/removeMatch", async (id: string) => {
  await deleteMatchAPI(id)
  return id
})

export const registerResult = createAsyncThunk("matches/registerResult", async (request: RegisterResultRequest) => {
  const response = await registerResultAPI(request)
  return response
})

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentMatch: (state) => {
      state.currentMatch = null
    },
    setView: (state, action: PayloadAction<ViewType>) => {
      state.currentView = action.payload
      if (action.payload === "list") {
        state.currentMatch = null
        state.selectedMatchId = null
      }
    },
    setSelectedMatch: (state, action: PayloadAction<string>) => {
      state.selectedMatchId = action.payload
      state.currentView = "detail"
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMatches.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMatches.fulfilled, (state, action: PayloadAction<Match[]>) => {
        state.loading = false
        state.matches = action.payload
      })
      .addCase(getMatches.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error al cargar partidos"
      })
      .addCase(getMatchById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMatchById.fulfilled, (state, action: PayloadAction<Match>) => {
        state.loading = false
        state.currentMatch = action.payload
      })
      .addCase(getMatchById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error al cargar partido"
      })
      .addCase(addMatch.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addMatch.fulfilled, (state, action: PayloadAction<Match>) => {
        state.loading = false
        state.matches.unshift(action.payload)
        state.currentView = "list"
      })
      .addCase(addMatch.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error al crear partido"
      })
      .addCase(removeMatch.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeMatch.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.matches = state.matches.filter((match) => match.id !== action.payload)
        state.currentView = "list"
        state.currentMatch = null
      })
      .addCase(removeMatch.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error al eliminar partido"
      })
      .addCase(registerResult.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerResult.fulfilled, (state, action: PayloadAction<Match>) => {
        state.loading = false
        const index = state.matches.findIndex((m) => m.id === action.payload.id)
        if (index !== -1) {
          state.matches[index] = action.payload
        }
        if (state.currentMatch?.id === action.payload.id) {
          state.currentMatch = action.payload
        }
      })
      .addCase(registerResult.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error al registrar resultado"
      })
  },
})

export const { clearError, clearCurrentMatch, setView, setSelectedMatch } = matchesSlice.actions
export default matchesSlice.reducer
