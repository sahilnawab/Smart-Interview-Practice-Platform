"use client"

import type React from "react"
import { Card, CardContent, Typography, Box, Chip, Button, IconButton, Tooltip } from "@mui/material"
import { PlayArrow as PlayIcon, Bookmark as BookmarkIcon } from "@mui/icons-material"
import { type QuestionsDto, DifficultyLevel, QuestionType } from "../questions/QuestionsApi"

interface QuestionCardProps {
  question: QuestionsDto & { id: number }
  onStart: (questionId: number) => void
  onBookmark?: (questionId: number) => void
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onStart, onBookmark }) => {
  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case DifficultyLevel.Easy: // Easy
        return "success"
      case DifficultyLevel.Medium: // Medium
        return "warning"
      case DifficultyLevel.Hard: // Hard
        return "error"
      default:
        return "default"
    }
  }

  const getDifficultyLabel = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case DifficultyLevel.Easy:
        return "Easy"
      case DifficultyLevel.Medium:
        return "Medium"
      case DifficultyLevel.Hard:
        return "Hard"
      default:
        return "Unknown"
    }
  }

  const getTypeIcon = (type: QuestionType) => {
    switch (type) {
      case QuestionType.Coding: // Coding
        return "💻"
      case QuestionType.MultipleChoice: // MultipleChoice
        return "📝"
      default: // Text
        return "💬"
    }
  }

  const getTypeLabel = (type: QuestionType) => {
    switch (type) {
      case QuestionType.Text:
        return "Text"
      case QuestionType.MultipleChoice:
        return "Multiple Choice"
      case QuestionType.Coding:
        return "Coding"
      default:
        return "Unknown"
    }
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="h-full flex flex-col">
        <Box className="flex justify-between items-start mb-3">
          <Typography variant="h6" className="font-semibold text-white flex-1">
            {getTypeIcon(question.type!)} {question.title}
          </Typography>
          {onBookmark && (
            <Tooltip title="Bookmark">
              <IconButton
                size="small"
                className="text-gray-400 hover:text-orange-500"
                onClick={() => onBookmark(question.id)}
              >
                <BookmarkIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Typography
          variant="body2"
          className="text-gray-400 mb-4 flex-1"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {question.description}
        </Typography>

        <Box className="flex flex-wrap gap-1 mb-3">
          {question.tags?.map((tag, index) => (
            <Chip key={index} label={tag.name} size="small" className="bg-gray-700 text-gray-300" />
          ))}
        </Box>

        <Box className="flex justify-between items-center">
          <Chip
            label={getDifficultyLabel(question.difficulty!)}
            color={getDifficultyColor(question.difficulty!) as any}
            size="small"
          />
          <Button
            variant="contained"
            size="small"
            startIcon={<PlayIcon />}
            className="bg-gradient-to-r from-orange-500 to-red-500"
            onClick={() => onStart(question.id)}
          >
            Start
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default QuestionCard
