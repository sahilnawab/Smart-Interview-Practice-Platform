"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, TextField, Button, Box, Typography, LinearProgress, Alert, Chip } from "@mui/material"
import { Send as SendIcon, Timer as TimerIcon } from "@mui/icons-material"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

interface AnswerFormData {
  submittedAnswer: string
}

interface AnswerFormProps {
  onSubmit: (answer: string, timeTaken: number) => void
  loading?: boolean
  disabled?: boolean
}

const answerSchema = Yup.object().shape({
  submittedAnswer: Yup.string().required("Answer is required").min(10, "Answer must be at least 10 characters long"),
})

const AnswerForm: React.FC<AnswerFormProps> = ({ onSubmit, loading = false, disabled = false }) => {
  const [startTime] = useState(Date.now())
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AnswerFormData>({
    resolver: yupResolver(answerSchema),
    defaultValues: {
      submittedAnswer: "",
    },
  })

  const watchedAnswer = watch("submittedAnswer")

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Update word and character count
  useEffect(() => {
    const text = watchedAnswer || ""
    setCharCount(text.length)
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0)
  }, [watchedAnswer])

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getTimeTakenInSeconds = () => {
    return Math.floor((currentTime - startTime) / 1000)
  }

  const handleFormSubmit = (data: AnswerFormData) => {
    const timeTakenSeconds = getTimeTakenInSeconds()
    onSubmit(data.submittedAnswer, timeTakenSeconds)
  }

  const getProgressColor = () => {
    const length = charCount
    if (length < 50) return "error"
    if (length < 100) return "warning"
    return "success"
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h5" className="font-semibold text-white">
            Your Answer
          </Typography>
          <Box className="flex items-center gap-4">
            <Chip icon={<TimerIcon />} label={formatTime(currentTime - startTime)} color="primary" variant="outlined" />
            <Box className="text-right">
              <Typography variant="caption" className="text-gray-400 block">
                Words: {wordCount} | Characters: {charCount}
              </Typography>
            </Box>
          </Box>
        </Box>

        {charCount > 0 && (
          <Box className="mb-4">
            <LinearProgress
              variant="determinate"
              value={Math.min((charCount / 500) * 100, 100)}
              color={getProgressColor()}
              sx={{ height: 6, borderRadius: 3 }}
            />
            <Typography variant="caption" className="text-gray-400 mt-1 block">
              {charCount < 50
                ? "Keep writing... (minimum 10 characters)"
                : charCount < 100
                  ? "Good start! Consider adding more details."
                  : "Great! Your answer is well-detailed."}
            </Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="submittedAnswer"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={12}
                placeholder="Type your answer here... Be detailed and explain your reasoning."
                error={!!errors.submittedAnswer}
                helperText={errors.submittedAnswer?.message}
                disabled={disabled || loading}
                sx={{
                  mb: 3,
                  "& .MuiInputBase-root": {
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  },
                }}
              />
            )}
          />

          {charCount < 10 && charCount > 0 && (
            <Alert severity="warning" className="mb-3">
              Your answer is too short. Please provide more details to get better feedback.
            </Alert>
          )}

          <Box className="flex justify-between items-center">
            <Typography variant="body2" className="text-gray-400">
              💡 Tip: Explain your thought process and reasoning for better AI feedback
            </Typography>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SendIcon />}
              disabled={disabled || loading || charCount < 10}
              className="bg-gradient-to-r from-orange-500 to-red-500 min-w-32"
            >
              {loading ? "Submitting..." : "Submit Answer"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}

export default AnswerForm
