"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Box, Typography, Button, Container, Paper } from "@mui/material"
import { Error as ErrorIcon } from "@mui/icons-material"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo)
    this.setState({ errorInfo })
  }

  private handleReload = (): void => {
    window.location.reload()
  }

  private handleGoHome = (): void => {
    window.location.href = "/"
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Container maxWidth="md" className="py-16">
          <Paper className="p-8 bg-gray-900 border border-gray-800">
            <Box className="flex flex-col items-center text-center">
              <ErrorIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h4" className="mb-4 text-white">
                Something went wrong
              </Typography>
              <Typography variant="body1" className="mb-6 text-gray-400">
                We're sorry, but an unexpected error occurred. Our team has been notified and is working to fix the
                issue.
              </Typography>
              <Box className="flex gap-4">
                <Button variant="contained" color="primary" onClick={this.handleReload}>
                  Reload Page
                </Button>
                <Button variant="outlined" onClick={this.handleGoHome}>
                  Go to Home
                </Button>
              </Box>

              {process.env.NODE_ENV === "development" && (
                <Box className="mt-8 p-4 bg-gray-800 rounded-md text-left w-full overflow-auto">
                  <Typography variant="subtitle2" className="mb-2 text-red-400">
                    Error Details (Development Only):
                  </Typography>
                  <Typography variant="body2" className="text-gray-300 font-mono">
                    {this.state.error?.toString()}
                  </Typography>
                  {this.state.errorInfo && (
                    <Typography variant="body2" className="mt-2 text-gray-400 font-mono text-xs">
                      {this.state.errorInfo.componentStack}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
