"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import type { CreateMatchRequest } from "../store/matchesSlice"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
interface MatchFormProps {
  onSubmit: (data: CreateMatchRequest) => void
  loading?: boolean
}

export default function MatchForm({ onSubmit, loading }: MatchFormProps) {
  const [formData, setFormData] = useState<CreateMatchRequest>({
    teamA: "",
    teamB: "",
    date: "",
    location: "",
    playersPerTeam: 5,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isoDate = new Date(formData.date).toISOString()
    onSubmit({ ...formData, date: isoDate })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseInt(value) : value,
    }))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label htmlFor="teamA" className="text-base">
                Equipo A
              </Label>
              <Input
                id="teamA"
                name="teamA"
                value={formData.teamA}
                onChange={handleChange}
                placeholder="Nombre del equipo A"
                className="h-12"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label htmlFor="teamB" className="text-base">
                Equipo B
              </Label>
              <Input
                id="teamB"
                name="teamB"
                value={formData.teamB}
                onChange={handleChange}
                placeholder="Nombre del equipo B"
                className="h-12"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <Label htmlFor="date" className="text-base">
                Fecha y Hora
              </Label>
              <Input
                id="date"
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={handleChange}
                className="h-12"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <Label htmlFor="location" className="text-base">
                Ubicación
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Cancha o estadio"
                className="h-12"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2 md:col-span-2"
            >
              <Label htmlFor="playersPerTeam" className="text-base">
                Jugadores por Equipo
              </Label>
              <Input
                id="playersPerTeam"
                name="playersPerTeam"
                type="number"
                min="1"
                max="11"
                value={formData.playersPerTeam}
                onChange={handleChange}
                className="h-12"
                required
              />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
              {loading ? "Creando..." : "Crear Partido"}
            </Button>
          </motion.div>
        </form>
      </Card>
    </motion.div>
  )
}
