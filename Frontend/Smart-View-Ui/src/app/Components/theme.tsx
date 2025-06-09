"use client"

import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f97316", // orange-500
      dark: "#ea580c", // orange-600
      light: "#fb923c", // orange-400
    },
    secondary: {
      main: "#ef4444", // red-500
      dark: "#dc2626", // red-600
      light: "#f87171", // red-400
    },
    background: {
      default: "#030712", // gray-950
      paper: "#111827", // gray-900
    },
    text: {
      primary: "#ffffff",
      secondary: "#9ca3af", // gray-400
    },
    divider: "#374151", // gray-700
    error: {
      main: "#ef4444",
    },
    success: {
      main: "#10b981",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "3rem",
      "@media (min-width:768px)": {
        fontSize: "4rem",
      },
      "@media (min-width:1024px)": {
        fontSize: "4.5rem",
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      "@media (min-width:768px)": {
        fontSize: "2.5rem",
      },
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.5rem",
      "@media (min-width:768px)": {
        fontSize: "2rem",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 600,
        },
        contained: {
          background: "linear-gradient(to right, #f97316, #ef4444)",
          "&:hover": {
            background: "linear-gradient(to right, #ea580c, #dc2626)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#1f2937", // gray-800
            "& fieldset": {
              borderColor: "#374151", // gray-700
            },
            "&:hover fieldset": {
              borderColor: "#f97316", // orange-500
            },
            "&.Mui-focused fieldset": {
              borderColor: "#f97316", // orange-500
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#111827", // gray-900
          borderRadius: "12px",
          border: "1px solid #374151", // gray-700
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(3, 7, 18, 0.95)", // gray-950 with opacity
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #374151", // gray-700
        },
      },
    },
  },
})
