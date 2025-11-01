import './globals.css'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <header className="p-4 border-b">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <a href="/" className="font-semibold">AI少儿启蒙</a>
            <nav className="flex gap-4 text-sm">
              <a href="/parents/home">家长</a>
              <a href="/teacher/dashboard">教师</a>
              <a href="/dev/dashboard">开发者</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}
