"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Box, Typography, LinearProgress, Alert } from "@mui/material"
import { CheckCircle as CheckIcon, Error as ErrorIcon } from "@mui/icons-material"

interface AnswerSubmissionStatusProps {
  isSubmitting: boolean
  isEvaluating: boolean
  hasError: boolean
  errorMessage?: string
}

const AnswerSubmissionStatus: React.FC<AnswerSubmissionStatusProps> = ({
  isSubmitting,
  isEvaluating,
  hasError,
  errorMessage,
}) => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = ["Submitting your answer...", "Processing with AI...", "Generating feedback...", "Complete!"]

  useEffect(() => {
    if (isSubmitting) {
      setCurrentStep(0)
      setProgress(25)
    } else if (isEvaluating) {
      setCurrentStep(1)
      // Simulate progress for AI evaluation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 5
        })
      }, 500)

      return () => clearInterval(interval)
    } else if (!hasError) {
      setCurrentStep(3)
      setProgress(100)
    }
  }, [isSubmitting, isEvaluating, hasError])

  if (hasError) {
    return (
      <Alert severity="error" icon={<ErrorIcon />} className="mb-4">
        <Typography variant="subtitle2" className="font-semibold">
          Submission Failed
        </Typography>
        <Typography variant="body2">{errorMessage || "An error occurred while submitting your answer."}</Typography>
      </Alert>
    )
  }

  if (!isSubmitting && !isEvaluating) {
    return null
  }

  return (
    <Box className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <Box className="flex items-center gap-2 mb-3">
        {currentStep === 3 ? (
          <CheckIcon className="text-green-500" />
        ) : (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
        )}
        <Typography variant="subtitle1" className="text-white font-semibold">
          {steps[currentStep]}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        color="primary"
        sx={{ height: 6, borderRadius: 3, mb: 2 }}
      />

      <Typography variant="body2" className="text-gray-400">
        {currentStep < 2
          ? "Your answer is being processed..."
          : currentStep === 2
            ? "AI is analyzing your response and generating personalized feedback..."
            : "Evaluation complete!"}
      </Typography>
    </Box>
  )
}

export default AnswerSubmissionStatus
