import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

/**
 * RTK Query error handling middleware
 * Shows toast notifications for API errors
 */
export const errorMiddleware: Middleware = () => (next) => (action) => {
  // Check if the action is a rejected API call
  if (isRejectedWithValue(action)) {
    // Extract error details    
    const { status, data } = action.payload || {}
    let errorMessage = "An error occurred"

    // Handle different error scenarios
    if (status === 401) {
      errorMessage = "Authentication error. Please log in again."
      // Optional: Redirect to login or clear auth state
      localStorage.removeItem("access_token")
      localStorage.removeItem("user_data")
      window.location.href = "/login"
    } else if (status === 403) {
      errorMessage = "You don't have permission to perform this action."
    } else if (status === 404) {
      errorMessage = "The requested resource was not found."
    } else if (status >= 500) {
      errorMessage = "Server error. Please try again later."
    }

    // Use the error message from the response if available
    if (data?.message) {
      errorMessage = data.message
    } else if (typeof data === "string") {
      errorMessage = data
    }

    // Show toast notification
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })

    console.error("API Error:", action.payload)
  }

  return next(action)
}
