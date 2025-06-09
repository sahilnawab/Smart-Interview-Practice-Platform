"use client"

import type React from "react"
import { Card, CardContent, Typography, Box, Chip, LinearProgress, Divider, Alert } from "@mui/material"
import {
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material"

interface FeedbackDisplayProps {
  feedback: string
  score: number
  timeTaken: number
  isCorrect?: boolean
  loading?: boolean
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  feedback,
  score,
  timeTaken,
  isCorrect,
  loading = false,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "success"
    if (score >= 6) return "warning"
    return "error"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 9) return "Excellent"
    if (score >= 8) return "Very Good"
    if (score >= 7) return "Good"
    if (score >= 6) return "Fair"
    if (score >= 4) return "Needs Improvement"
    return "Poor"
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <Box className="text-center py-8">
            <Box className="mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
            </Box>
            <Typography variant="h6" className="text-white mb-2">
              AI is evaluating your answer...
            </Typography>
            <Typography variant="body2" className="text-gray-400">
              This may take a few moments. Please wait while our AI provides detailed feedback.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Typography variant="h5" className="font-semibold text-white mb-4">
          AI Feedback & Evaluation
        </Typography>

        {/* Score Section */}
        <Box className="mb-6">
          <Box className="flex items-center justify-between mb-3">
            <Typography variant="h6" className="text-gray-300">
              Overall Score
            </Typography>
            <Box className="flex items-center gap-2">
              <StarIcon className="text-yellow-500" />
              <Typography variant="h4" className="font-bold text-white">
                {score}/10
              </Typography>
            </Box>
          </Box>

          <LinearProgress
            variant="determinate"
            value={(score / 10) * 100}
            color={getScoreColor(score)}
            sx={{ height: 8, borderRadius: 4, mb: 2 }}
          />

          <Box className="flex justify-between items-center">
            <Chip
              label={getScoreLabel(score)}
              color={getScoreColor(score)}
              icon={score >= 7 ? <CheckIcon /> : <CancelIcon />}
            />
            <Box className="flex items-center gap-4">
              <Box className="flex items-center gap-1">
                <TrendingUpIcon className="text-gray-400" fontSize="small" />
                <Typography variant="body2" className="text-gray-400">
                  Time: {formatTime(timeTaken)}
                </Typography>
              </Box>
              {isCorrect !== undefined && (
                <Chip
                  label={isCorrect ? "Correct" : "Incorrect"}
                  color={isCorrect ? "success" : "error"}
                  size="small"
                />
              )}
            </Box>
          </Box>
        </Box>

        <Divider className="mb-4" />

        {/* Feedback Section */}
        <Box>
          <Typography variant="h6" className="text-gray-300 mb-3">
            Detailed Feedback
          </Typography>

          {feedback ? (
            <Box className="bg-gray-800 rounded-lg p-4">
              <Typography
                variant="body1"
                className="text-gray-100 leading-relaxed whitespace-pre-wrap"
                sx={{ fontSize: "1rem", lineHeight: 1.7 }}
              >
                {feedback}
              </Typography>
            </Box>
          ) : (
            <Alert severity="info">No detailed feedback available. The AI evaluation may still be processing.</Alert>
          )}
        </Box>

        {/* Performance Insights */}
        <Box className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
          <Typography variant="subtitle2" className="text-blue-400 mb-2">
            💡 Performance Insights
          </Typography>
          <Typography variant="body2" className="text-gray-300">
            {score >= 8
              ? "Excellent work! Your answer demonstrates strong understanding and clear communication."
              : score >= 6
                ? "Good effort! Consider adding more details and examples to strengthen your answer."
                : "Keep practicing! Focus on providing more comprehensive explanations and examples."}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default FeedbackDisplay
