"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import type { AppDispatch, RootState } from "../store"
import {
  getMatches,
  addMatch,
  removeMatch,
  getMatchById,
  setView,
  setSelectedMatch,
  registerResult,
  type CreateMatchRequest,
  type RegisterResultRequest,
  Match,
} from "../store/matchesSlice"
import Navbar from "../components/Navbar"
import MatchCard from "../components/MatchCard"
import MatchForm from "../components/MatchForm"
import MatchDetail from "../components/MatchDetail"
import Loader from "../components/Loader"
import { Button } from "../components/ui/Button"
import { Plus, ArrowLeft } from "lucide-react"

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { matches, currentMatch, loading, error, currentView, selectedMatchId } = useSelector(
    (state: RootState) => state.matches,
  )

  useEffect(() => {
    dispatch(getMatches())
  }, [dispatch])

  useEffect(() => {
    if (selectedMatchId && currentView === "detail") {
      dispatch(getMatchById(selectedMatchId))
    }
  }, [selectedMatchId, currentView, dispatch])

  const handleCreateMatch = async (data: CreateMatchRequest) => {
    await dispatch(addMatch(data))
  }

  const handleDeleteMatch = async (id: string) => {
    await dispatch(removeMatch(id))
  }

  const handleViewMatch = (id: string) => {
    dispatch(setSelectedMatch(id))
  }

  const handleRegisterResult = async (request: RegisterResultRequest) => {
    await dispatch(registerResult(request))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentView === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Partidos de Fútbol
                  </h1>
                  <p className="text-muted-foreground text-lg">Gestiona todos tus partidos amateur</p>
                </div>
                <Button size="lg" className="gap-2 shadow-lg" onClick={() => dispatch(setView("create"))}>
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">Nuevo Partido</span>
                </Button>
              </div>

              {loading && <Loader />}

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-4 rounded-lg mb-6"
                >
                  {error}
                </motion.div>
              )}

              {!loading && matches.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Plus className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">No hay partidos registrados</h3>
                  <p className="text-muted-foreground mb-6">Comienza creando tu primer partido</p>
                  <Button size="lg" onClick={() => dispatch(setView("create"))}>
                    Crear primer partido
                  </Button>
                </motion.div>
              )}

              {!loading && matches.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matches.map((match: Match, index: number) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      index={index}
                      onDelete={handleDeleteMatch}
                      onView={handleViewMatch}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {currentView === "create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="ghost" className="mb-6 gap-2" onClick={() => dispatch(setView("list"))}>
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>

              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Crear Nuevo Partido</h1>
                <p className="text-muted-foreground text-lg">Completa los datos del partido</p>
              </div>

              <div className="max-w-3xl">
                <MatchForm onSubmit={handleCreateMatch} loading={loading} />
              </div>
            </motion.div>
          )}

          {currentView === "detail" && currentMatch && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="ghost" className="mb-6 gap-2" onClick={() => dispatch(setView("list"))}>
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>

              <MatchDetail match={currentMatch} onDelete={handleDeleteMatch} onRegisterResult={handleRegisterResult} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
