import type React from "react"
import { Navigation } from "./Components/Navigation"
import { Footer } from "./Components/Footer"
import { ThemeProvider } from "@mui/system"
import { CssBaseline } from "@mui/material"
import { theme } from "./Components/theme"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div className="min-h-screen flex flex-col">
            <ThemeProvider theme={theme}>
                <CssBaseline />
          <Navigation />
                  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>{children}</div>
          <Footer />
          </ThemeProvider>
        </div>

       
  )
}



// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import { ThemeProvider } from "@mui/material/styles"
// import { CssBaseline } from "@mui/material"
// import { theme } from "./theme"
// import "./globals.css"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "InterviewAce - Smart Interview Practice Platform",
//   description: "Master your interviews with AI-powered practice sessions",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>{children}</div>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
