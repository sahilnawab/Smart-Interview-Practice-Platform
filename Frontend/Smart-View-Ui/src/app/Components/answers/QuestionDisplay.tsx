"use client"

import type React from "react"
import { Card, CardContent, Typography, Box, Chip, Divider } from "@mui/material"
import { type QuestionsDto, DifficultyLevel, QuestionType } from "../questions/QuestionsApi"

interface QuestionDisplayProps {
  question: QuestionsDto & { id: number }
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case DifficultyLevel.Easy:
        return "success"
      case DifficultyLevel.Medium:
        return "warning"
      case DifficultyLevel.Hard:
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
      case QuestionType.Coding:
        return "💻"
      case QuestionType.Text:
        return "📝"
      default:
        return "💬"
    }
  }

  const getTypeLabel = (type: QuestionType) => {
    switch (type) {
      case QuestionType.Text:
        return "Text Answer"
      case QuestionType.MultipleChoice:
        return "Multiple Choice"
      case QuestionType.Coding:
        return "Coding Challenge"
      default:
        return "Unknown"
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        {/* Question Header */}
        <Box className="flex justify-between items-start mb-4">
          <Box className="flex-1">
            <Typography variant="h4" className="font-bold text-white mb-2">
              {getTypeIcon(question.type!)} {question.title}
            </Typography>
            <Box className="flex items-center gap-2 mb-3">
              <Chip
                label={getTypeLabel(question.type!)}
                variant="outlined"
                size="small"
                className="text-blue-400 border-blue-400"
              />
              <Chip
                label={getDifficultyLabel(question.difficulty!)}
                color={getDifficultyColor(question.difficulty!) as any}
                size="small"
              />
            </Box>
          </Box>
        </Box>

        <Divider className="mb-4" />

        {/* Question Description */}
        <Box className="mb-4">
          <Typography variant="h6" className="text-gray-300 mb-3">
            Question Description:
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-100 leading-relaxed whitespace-pre-wrap"
            sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}
          >
            {question.description}
          </Typography>
        </Box>

        {/* Tags */}
        {question.tags && question.tags.length > 0 && (
          <Box>
            <Typography variant="subtitle2" className="text-gray-400 mb-2">
              Related Topics:
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {question.tags.map((tag, index) => (
                <Chip key={index} label={tag.name} size="small" className="bg-gray-700 text-gray-300" />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default QuestionDisplay
