"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Trash2, Eye, Users } from "lucide-react"
import type { Match } from "../store/matchesSlice"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"

interface MatchCardProps {
  match: Match
  onDelete?: (id: string) => void
  onView?: (id: string) => void
  index: number
}

export default function MatchCard({ match, onDelete, onView, index }: MatchCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const hasResult = match.teamAGoals !== undefined && match.teamBGoals !== undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full border bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
              {hasResult ? "Finalizado" : "Programado"}
            </span>
            <div className="flex gap-1">
              {onView && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                  onClick={() => onView(match.id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(match.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <h3 className="font-bold text-lg mb-2 text-balance">{match.teamA}</h3>
              {hasResult && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl font-bold text-primary">
                  {match.teamAGoals}
                </motion.span>
              )}
            </div>

            <div className="px-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">VS</span>
              </div>
            </div>

            <div className="flex-1 text-center">
              <h3 className="font-bold text-lg mb-2 text-balance">{match.teamB}</h3>
              {hasResult && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl font-bold text-primary">
                  {match.teamBGoals}
                </motion.span>
              )}
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <span>{formatDate(match.date)}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <span>{match.location}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span>{match.playersPerTeam} jugadores por equipo</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
