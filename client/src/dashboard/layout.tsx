"use client"

import React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-white px-4">
          <h1 className="text-lg font-medium">Plataforma Estudiantes</h1>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
