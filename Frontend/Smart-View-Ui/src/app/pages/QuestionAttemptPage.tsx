"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Typography, Box, Button, Alert, Breadcrumbs, Link, Stepper, Step, StepLabel } from "@mui/material"
import { ArrowBack as ArrowBackIcon, Home as HomeIcon } from "@mui/icons-material"
import { useAuth } from "../features/auth/AuthContext"
import QuestionDisplay from "../Components/answers/QuestionDisplay"
import AnswerForm from "../Components/answers/AnswerForm"
import FeedbackDisplay from "../Components/answers/FeedbackDisplay"
import AnswerSubmissionStatus from "../Components/answers/AnswerSubmissionStatus"
import { useGetApiQuestionsByIdQuery, type QuestionsDto } from "../Components/questions/QuestionsApi"
import { usePostApiAnswerMutation, useGetApiAnswerByIdQuery } from "../Components/answers/AnswersApi"

interface Question extends QuestionsDto {
  id: number
}

const QuestionAttemptPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [attemptId, setAttemptId] = useState<number | null>(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const {
    data: questionData,
    isLoading: questionLoading,
    error: questionError,
  } = useGetApiQuestionsByIdQuery(
    { id: Number.parseInt(questionId!) },
    { skip: !questionId || Number.isNaN(Number.parseInt(questionId!)) },
  )

  const [submitAnswer, { isLoading: isSubmitting }] = usePostApiAnswerMutation()

  const {
    data: attemptData,
    isLoading: attemptLoading,
    refetch: refetchAttempt,
  } = useGetApiAnswerByIdQuery({ id: attemptId! }, { skip: !attemptId })

  // Poll for feedback when evaluating
  useEffect(() => {
    if (isEvaluating && attemptId) {
      const interval = setInterval(async () => {
        try {
          const result = await refetchAttempt()
          if (result.data?.feedback && result.data?.score !== undefined) {
            setIsEvaluating(false)
            setCurrentStep(2) // Move to feedback step
            clearInterval(interval)
          }
        } catch (error) {
          console.error("Error polling for feedback:", error)
        }
      }, 3000) // Poll every 3 seconds

      // Stop polling after 2 minutes
      const timeout = setTimeout(() => {
        setIsEvaluating(false)
        clearInterval(interval)
      }, 120000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [isEvaluating, attemptId, refetchAttempt])

  const handleSubmitAnswer = async (answer: string, timeTakenSeconds: number) => {
    try {
      setSubmissionError(null)



      const result = await submitAnswer({
        answerCreateDto: {
        
          questionId: Number.parseInt(questionId!),
          submittedAnswer: answer,
          timeTaken:  timeTakenSeconds
         
        },
      }).unwrap()

      setAttemptId(result.id)
      setCurrentStep(1)
      setIsEvaluating(true)
    } catch (error: any) {
      console.error("Error submitting answer:", error)
      setSubmissionError(error?.data?.message || "Failed to submit answer. Please try again.")
    }
  }

  const handleGoBack = () => {
    navigate("/")
  }

  const handleGoHome = () => {
    navigate("/")
  }

  if (questionLoading) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Box className="flex justify-center items-center min-h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </Box>
      </Container>
    )
  }

  if (questionError || !questionData) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Alert severity="error" className="mb-4">
          <Typography variant="h6">Question Not Found</Typography>
          <Typography>The question you're looking for doesn't exist or has been removed.</Typography>
        </Alert>
        <Button variant="contained" onClick={handleGoHome} startIcon={<HomeIcon />}>
          Go to Home
        </Button>
      </Container>
    )
  }

  const question: Question = {
    ...questionData,
    id: Number.parseInt(questionId!),
  }

  const steps = ["Answer Question", "AI Evaluation", "View Feedback"]

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-6">
        <Link component="button" variant="body2" onClick={handleGoHome} className="text-gray-400 hover:text-white">
          <HomeIcon fontSize="small" className="mr-1" />
          Home
        </Link>
        <Typography variant="body2" className="text-gray-300">
          Question Attempt
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box className="flex items-center justify-between mb-6">
        <Typography variant="h3" className="font-bold text-white">
          Interview Question
        </Typography>
        <Button variant="outlined" onClick={handleGoBack} startIcon={<ArrowBackIcon />}>
          Back to Questions
        </Button>
      </Box>

      {/* Progress Stepper */}
      <Box className="mb-8">
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Question Display */}
      <QuestionDisplay question={question} />

      {/* Submission Status */}
      <AnswerSubmissionStatus
        isSubmitting={isSubmitting}
        isEvaluating={isEvaluating}
        hasError={!!submissionError}
        errorMessage={submissionError || undefined}
      />

      {/* Answer Form or Feedback */}
      {currentStep === 0 && <AnswerForm onSubmit={handleSubmitAnswer} loading={isSubmitting} disabled={isSubmitting} />}

      {currentStep === 1 && <FeedbackDisplay loading={true} feedback="" score={0} timeTaken={0} />}

      {currentStep === 2 && attemptData && (
        <FeedbackDisplay
          feedback={attemptData.feedback || ""}
          score={attemptData.score || 0}
          timeTaken={attemptData.timeTaken?.totalSeconds || 0}
          isCorrect={attemptData.isCorrect}
          loading={attemptLoading}
        />
      )}

      {/* Welcome Message for First Time */}
      {currentStep === 0 && (
        <Alert severity="info" className="mt-4">
          <Typography variant="subtitle2" className="font-semibold mb-1">
            Welcome, {user?.fullName}! 👋
          </Typography>
          <Typography variant="body2">
            Take your time to read the question carefully and provide a detailed answer. Our AI will evaluate your
            response and provide personalized feedback to help you improve.
          </Typography>
        </Alert>
      )}
    </Container>
  )
}

export default QuestionAttemptPage
