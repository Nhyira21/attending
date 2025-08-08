"use client"

import * as React from "react"
import { BarChart3, Calendar, DollarSign, Home, MessageCircle, PieChart, School, Shuffle, Star, Users, Wallet, ExternalLink, ArrowRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const navigationItems = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Squad", icon: Users, active: false },
  { label: "Messenger", icon: MessageCircle, active: false },
  { label: "Statistic", icon: BarChart3, active: false },
  { label: "Calendar", icon: Calendar, active: false },
  { label: "Finance", icon: DollarSign, active: false },
  { label: "Transfers", icon: Shuffle, active: false },
  { label: "Youth academy", icon: School, active: false },
]

const standingsData = [
  { position: 1, name: "Juventus", MP: 8, W: 6, D: 1, L: 1, PTS: 19 },
  { position: 2, name: "Atalanta", MP: 8, W: 5, D: 1, L: 2, PTS: 16 },
  { position: 3, name: "Inter", MP: 8, W: 5, D: 0, L: 3, PTS: 15 },
  { position: 4, name: "Napoli", MP: 8, W: 4, D: 1, L: 3, PTS: 13 },
  { position: 5, name: "Milan", MP: 8, W: 4, D: 1, L: 3, PTS: 13 },
  { position: 6, name: "Roma", MP: 8, W: 4, D: 0, L: 4, PTS: 12 },
]

const metricsData = [
  { title: "Possession", value: "65%", icon: PieChart },
  { title: "Overall Price", value: "$690.2m", icon: DollarSign },
  { title: "Transfer Budget", value: "$240.6m", icon: Wallet },
  { title: "Average Score", value: "7.2", icon: Star },
]

function AppSidebar() {
  return (
    <Sidebar className="border-r-0">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.active}
                    className={`w-full justify-start rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      item.active
                        ? "bg-[#245F57] text-white shadow-lg"
                        : "text-gray-600 hover:bg-[#F3F7FA] hover:text-[#245F57]"
                    }`}
                  >
                    <a href="#" className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export function CoachProDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DEEDEE] to-[#EAF1F9]">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, Andrea👋</h1>
              </div>
              <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
                <AvatarImage src="/andrea-pirlo-profile.png" alt="Andrea Pirlo" />
                <AvatarFallback className="bg-[#245F57] text-white">AP</AvatarFallback>
              </Avatar>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Next Game */}
              <Card className="lg:col-span-2 rounded-2xl border-0 bg-white shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Next game</CardTitle>
                      <p className="text-sm text-gray-600">Serie A, 21:00, 11 November, 2020</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#245F57] hover:bg-[#F3F7FA]">
                      View Calendar <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                          <span className="text-white font-bold text-sm">JUV</span>
                        </div>
                        <span className="font-semibold text-gray-900">Juventus</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-400">VS</div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-gray-900">Sassuolo</span>
                        <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">SAS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Game Statistics */}
              <Card className="rounded-2xl border-0 bg-white shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">Games statistic</CardTitle>
                    <Button variant="ghost" size="sm" className="text-[#245F57] hover:bg-[#F3F7FA]">
                      View All <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">6</div>
                      <div className="text-xs text-gray-600">Wins</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">1</div>
                      <div className="text-xs text-gray-600">Draws</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">1</div>
                      <div className="text-xs text-gray-600">Losses</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex h-3 overflow-hidden rounded-full bg-gray-200">
                      <div className="bg-[#58C48C] w-[75%]"></div>
                      <div className="bg-[#FFD166] w-[12.5%]"></div>
                      <div className="bg-[#EF476F] w-[12.5%]"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>8 games played</span>
                      <span>75% win rate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Standings */}
              <Card className="lg:col-span-2 rounded-2xl border-0 bg-white shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">Standings</CardTitle>
                    <Button variant="ghost" size="sm" className="text-[#245F57] hover:bg-[#F3F7FA]">
                      View All <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200">
                        <TableHead className="text-xs font-semibold text-gray-600">TEAM</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600 text-center">MP</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600 text-center">W</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600 text-center">D</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600 text-center">L</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600 text-center">PTS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {standingsData.map((team) => (
                        <TableRow key={team.position} className="border-gray-100">
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                                team.position === 1 ? 'bg-[#245F57] text-white' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {team.position}
                              </span>
                              <span className="text-gray-900">{team.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-gray-600">{team.MP}</TableCell>
                          <TableCell className="text-center text-gray-600">{team.W}</TableCell>
                          <TableCell className="text-center text-gray-600">{team.D}</TableCell>
                          <TableCell className="text-center text-gray-600">{team.L}</TableCell>
                          <TableCell className="text-center font-semibold text-gray-900">{team.PTS}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Metrics Cards */}
              <div className="space-y-4">
                {metricsData.map((metric, index) => (
                  <Card key={index} className="rounded-2xl border-0 bg-white shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{metric.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                        </div>
                        <div className="rounded-full bg-[#9FD9D9] p-3">
                          <metric.icon className="h-6 w-6 text-[#245F57]" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Reminder Banner */}
            <Card className="rounded-2xl border-0 bg-gradient-to-r from-[#245F57] to-[#2d6b62] text-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Setup training for next week</h3>
                    <p className="text-sm text-white/80">Plan and organize your team's training sessions</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="hidden md:flex space-x-2">
                      <div className="h-8 w-8 rounded-full bg-white/20"></div>
                      <div className="h-6 w-6 rounded-full bg-white/30"></div>
                      <div className="h-4 w-4 rounded-full bg-white/40"></div>
                    </div>
                    <Button className="bg-white text-[#245F57] hover:bg-white/90">
                      Go to training center
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
