"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, BookOpen, Play } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onNavigate?: (item: string) => void
  activeItem?: string
}

export function Sidebar({ className, onNavigate, activeItem = "bienvenido" }: SidebarProps) {
  return (
    <div className={cn("pb-12 bg-gradient-to-b from-purple-950 to-purple-900 h-full", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold text-white">Menú principal</h2>
          <p className="px-4 text-sm text-purple-200">Estudiantes</p>
          <div className="space-y-1 mt-4">
            <Button
              variant={activeItem === "bienvenido" ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-white hover:bg-purple-800",
                activeItem === "bienvenido" && "bg-purple-800 border-l-4 border-purple-400",
              )}
              onClick={() => onNavigate?.("bienvenido")}
            >
              <Home className="mr-2 h-4 w-4" />
              Bienvenido
            </Button>
            <Button
              variant={activeItem === "guia" ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-white hover:bg-purple-800",
                activeItem === "guia" && "bg-purple-800 border-l-4 border-purple-400",
              )}
              onClick={() => onNavigate?.("guia")}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Guía
            </Button>
            <Button
              variant={activeItem === "iniciar-prueba" ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-white hover:bg-purple-800",
                activeItem === "iniciar-prueba" && "bg-purple-800 border-l-4 border-purple-400",
              )}
              onClick={() => onNavigate?.("iniciar-prueba")}
            >
              <Play className="mr-2 h-4 w-4" />
              Iniciar prueba
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MobileSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  onNavigate?: (item: string) => void
  activeItem?: string
}

export function MobileSidebar({ children, className, onNavigate, activeItem }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] p-0">
        <ScrollArea className="h-full">
          <Sidebar className={className} onNavigate={onNavigate} activeItem={activeItem}>
            {children}
          </Sidebar>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
