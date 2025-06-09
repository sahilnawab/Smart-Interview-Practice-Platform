"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Container, Typography, Box, Grid, Pagination } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../features/auth/AuthContext"
import { DifficultyLevel, useGetApiQuestionsQuery, type QuestionsDto } from "../Components/questions/QuestionsApi"
import QuestionCard from "../Components/questions/QuestionCard"
import QuestionFilters from "../Components/questions/QuestionFilters"


interface Question extends QuestionsDto {
  id: number
}

const UserDashbaord: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const questionsPerPage = 6

  const { data: allQuestions = [], isLoading } = useGetApiQuestionsQuery()

  // Add IDs to questions and filter based on current filters
  const questionsWithIds: Question[] = useMemo(() => {
    return allQuestions.map((question, index) => ({
      ...question,
      id: index + 1, // You should use actual IDs from your API
    }))
  }, [allQuestions])

  // Filter questions based on search term, difficulty, and tag
  const filteredQuestions = useMemo(() => {
    let filtered = questionsWithIds

    if (searchTerm) {
      filtered = filtered.filter(
        (q) =>
          q.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedDifficulty) {
      
      filtered = filtered.filter((q) => q.difficulty === DifficultyLevel[selectedDifficulty])
    }

    if (selectedTag) {
      filtered = filtered.filter((q) => q.tags?.some((tag) => tag.name === selectedTag))
    }

    return filtered
  }, [questionsWithIds, searchTerm, selectedDifficulty, selectedTag])

  // Get unique tags for filter dropdown
  const availableTags = useMemo(() => {
    const tags = questionsWithIds.flatMap((q) => q.tags?.map((tag) => tag.name || "") || [])
    return Array.from(new Set(tags)).filter(Boolean)
  }, [questionsWithIds])

  // Pagination
  const indexOfLastQuestion = currentPage * questionsPerPage
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion)
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedDifficulty, selectedTag])

  const handleStartQuestion = (questionId: number) => {
    navigate(`/question/${questionId}`)
  }

  const handleBookmarkQuestion = (questionId: number) => {
    console.log("Bookmarking question:", questionId)
    // Implement bookmark functionality
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedDifficulty("")
    setSelectedTag("")
  }

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </Box>
    )
  }

  return (
    <Container maxWidth="xl" className="py-8">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h3" className="font-bold text-white mb-2">
          Welcome back, {user?.fullName}! 👋
        </Typography>
        <Typography variant="h6" className="text-gray-400">
          Ready to practice some interview questions?
        </Typography>
      </Box>

      {/* Filters */}
      <QuestionFilters
        searchTerm={searchTerm}
        selectedDifficulty={selectedDifficulty}
        selectedTag={selectedTag}
        availableTags={availableTags}
        onSearchChange={setSearchTerm}
        onDifficultyChange={setSelectedDifficulty}
        onTagChange={setSelectedTag}
        onClearFilters={handleClearFilters}
      />

      {/* Results Count */}
      <Typography variant="body1" className="text-gray-400 mb-4">
        Showing {filteredQuestions.length} question(s)
      </Typography>

      {/* Questions Grid */}
      <Grid container spacing={3} className="mb-6">
        {currentQuestions.map((question) => (
          <Grid item xs={12} md={6} lg={4} key={question.id}>
            <QuestionCard question={question} onStart={handleStartQuestion} onBookmark={handleBookmarkQuestion} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box className="flex justify-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  )
}

export default UserDashbaord
