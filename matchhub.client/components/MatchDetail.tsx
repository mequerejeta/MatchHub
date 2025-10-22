"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Trash2, Trophy, Users, Edit } from "lucide-react"
import type { Match, RegisterResultRequest } from "../store/matchesSlice"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"

interface MatchDetailProps {
  match: Match
  onDelete: (id: string) => void
  onRegisterResult: (request: RegisterResultRequest) => void
}

export default function MatchDetail({ match, onDelete, onRegisterResult }: MatchDetailProps) {
  const [isEditingResult, setIsEditingResult] = useState(false)
  const [teamAGoals, setTeamAGoals] = useState(match.teamAGoals?.toString() || "0")
  const [teamBGoals, setTeamBGoals] = useState(match.teamBGoals?.toString() || "0")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const hasResult = match.teamAGoals !== undefined && match.teamBGoals !== undefined

  const handleSubmitResult = () => {
    onRegisterResult({
      matchId: match.id,
      teamAGoals: Number.parseInt(teamAGoals),
      teamBGoals: Number.parseInt(teamBGoals),
    })
    setIsEditingResult(false)
  }

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de eliminar este partido?")) {
      onDelete(match.id)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border-b">
          <div className="flex items-start justify-between mb-6">
            <span className="text-sm font-semibold px-4 py-2 rounded-full border bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
              {hasResult ? "Finalizado" : "Programado"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-destructive hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              Eliminar
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-1 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{match.teamA}</h2>
              {hasResult && !isEditingResult && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-6xl md:text-7xl font-bold text-primary"
                >
                  {match.teamAGoals}
                </motion.div>
              )}
            </motion.div>

            <div className="px-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                <span className="text-2xl font-bold text-primary">VS</span>
              </div>
            </div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-1 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{match.teamB}</h2>
              {hasResult && !isEditingResult && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-6xl md:text-7xl font-bold text-primary"
                >
                  {match.teamBGoals}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Fecha y hora</p>
              <p className="font-semibold text-lg capitalize">{formatDate(match.date)}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Ubicación</p>
              <p className="font-semibold text-lg">{match.location}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Jugadores por equipo</p>
              <p className="font-semibold text-lg">{match.playersPerTeam}</p>
            </div>
          </motion.div>

          {!hasResult && !isEditingResult && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Button onClick={() => setIsEditingResult(true)} className="w-full gap-2">
                <Trophy className="h-4 w-4" />
                Registrar Resultado
              </Button>
            </motion.div>
          )}

          {hasResult && !isEditingResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Resultado final</p>
                <p className="font-bold text-2xl text-primary">
                  {match.teamAGoals} - {match.teamBGoals}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsEditingResult(true)}>
                <Edit className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {isEditingResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-6 rounded-lg bg-primary/5 border border-primary/10 space-y-4"
            >
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                {hasResult ? "Editar Resultado" : "Registrar Resultado"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="teamAGoals">{match.teamA}</Label>
                  <Input
                    id="teamAGoals"
                    type="number"
                    min="0"
                    value={teamAGoals}
                    onChange={(e) => setTeamAGoals(e.target.value)}
                    className="h-12 text-center text-2xl font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamBGoals">{match.teamB}</Label>
                  <Input
                    id="teamBGoals"
                    type="number"
                    min="0"
                    value={teamBGoals}
                    onChange={(e) => setTeamBGoals(e.target.value)}
                    className="h-12 text-center text-2xl font-bold"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSubmitResult} className="flex-1">
                  Guardar
                </Button>
                <Button variant="primary" onClick={() => setIsEditingResult(false)} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
