"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, Button } from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Download as DownloadIcon } from "@mui/icons-material"
import { GridActionsCellItem, type GridColDef } from "@mui/x-data-grid"
import DataTable from "../../commonComponents/DataTable"
import QuestionForm from "../questions/QuestionForm"
import {
  useGetApiQuestionsQuery,
  usePostApiQuestionsMutation,
  usePutApiQuestionsByIdMutation,
  useDeleteApiQuestionsByIdMutation,
  type QuestionsDto,
  type QuestionCreateDto,
  DifficultyLevel,
  QuestionType,
} from "../questions/QuestionsApi"
import { Chip } from "@mui/material"

interface Question extends QuestionsDto {
  id: number
}

const QuestionsTab: React.FC = () => {
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  const { data: questions = [], isLoading, refetch } = useGetApiQuestionsQuery()
  const [createQuestion, { isLoading: isCreating }] = usePostApiQuestionsMutation()
  const [updateQuestion, { isLoading: isUpdating }] = usePutApiQuestionsByIdMutation()
  const [deleteQuestion] = useDeleteApiQuestionsByIdMutation()

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question)
    setOpenQuestionDialog(true)
  }

  const handleDeleteQuestion = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestion({ id }).unwrap()
        refetch()
      } catch (error) {
        console.error("Failed to delete question:", error)
      }
    }
  }

  const handleAddQuestion = () => {
    setEditingQuestion(null)
    setOpenQuestionDialog(true)
  }

  const handleSubmitQuestion = async (data: QuestionCreateDto) => {
    try {
      if (editingQuestion) {
        await updateQuestion({ id: editingQuestion.id, questionCreateDto: data }).unwrap()
      } else {
        await createQuestion({ questionCreateDto: data }).unwrap()
      }
      setOpenQuestionDialog(false)
      setEditingQuestion(null)
      refetch()
    } catch (error) {
      console.error("Failed to save question:", error)
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200, filterable: true },
    { field: "description", headerName: "Description", width: 300, filterable: true },
    {
      field: "type",
      headerName: "Type",
      width: 120,
      valueGetter: (params) => getTypeLabel(params),
      filterable: true,
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      width: 120,
      renderCell: (params) => {
        const label = getDifficultyLabel(params.value)
        const color =
          params.value === DifficultyLevel.Easy ? "success" : params.value === DifficultyLevel.Medium ? "warning" : "error"
        return <Chip label={label} color={color} size="small" />
      },
      valueGetter: (params) => getDifficultyLabel(params),
      filterable: true,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 200,
      renderCell: (params) => {
        // Fix: Check if params.value is an array before mapping
     
       
       const tags:string[]= params.row.tags;
       
        return (
          <Box className="flex flex-wrap gap-1">
            {tags.map((tag: any, index: number) => (
              <Chip key={index} label={tag.name || "Unknown"} size="small" />
            ))}
          </Box>
        )
      },
      valueGetter: (params) => {
        // Fix: Check if params.value is an array before mapping
        const tags = Array.isArray(params) ? params : []
        return tags.map((tag: any) => tag.name || "").join(", ") || ""
      },
      filterable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditQuestion(params.row)}
          key="edit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteQuestion(params.id as number)}
          key="delete"
        />,
      ],
    },
  ]

  // Add IDs to questions for DataGrid
  const questionsWithIds = questions.map((question, index) => ({
    ...question,
    id: index + 1, // You should use actual IDs from your API
  }))

  return (
    <Box>
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5" className="text-white">
          Question Management
        </Typography>
        <Box className="flex gap-2">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddQuestion}
            className="bg-gradient-to-r from-orange-500 to-red-500"
          >
            Add Question
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            className="bg-gradient-to-r from-orange-500 to-red-500"
          >
            Export PDF
          </Button>
        </Box>
      </Box>

      <DataTable rows={questionsWithIds} columns={columns} loading={isLoading} />

      <QuestionForm
        open={openQuestionDialog}
        onClose={() => {
          setOpenQuestionDialog(false)
          setEditingQuestion(null)
        }}
        onSubmit={handleSubmitQuestion}
        initialData={
          editingQuestion
            ? {
                title: editingQuestion.title || "",
                description: editingQuestion.description || "",
                type: editingQuestion.type || QuestionType.Text,
                difficulty: editingQuestion.difficulty || DifficultyLevel.Easy,
                tags: editingQuestion.tags?.map((tag) => tag.name || "") || [],
              }
            : null
        }
        loading={isCreating || isUpdating}
      />
    </Box>
  )
}

export default QuestionsTab
