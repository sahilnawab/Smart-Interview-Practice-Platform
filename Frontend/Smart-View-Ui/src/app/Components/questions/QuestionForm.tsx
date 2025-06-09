"use client"

import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
  FormHelperText,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { type QuestionCreateDto, DifficultyLevel, QuestionType } from "../questions/QuestionsApi"
import TagsAutocomplete from "./TagsAutocomplete"

interface QuestionFormData {
  title: string
  description: string
  type: QuestionType
  difficulty: DifficultyLevel
  tags: string[]
}

interface QuestionFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: QuestionCreateDto) => void
  initialData?: QuestionFormData | null
  loading?: boolean
}

const questionSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  description: Yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
  type: Yup.string().required("Type is required"),
  difficulty: Yup.string().required("Difficulty is required"),
  tags: Yup.array().min(1, "At least one tag is required"),
})

const QuestionForm: React.FC<QuestionFormProps> = ({ open, onClose, onSubmit, initialData, loading = false }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: yupResolver(questionSchema),
    defaultValues: {
      title: "",
      description: "",
      type: QuestionType.Text,
      difficulty: DifficultyLevel.Easy,
      tags: [],
    },
  })

  React.useEffect(() => {
    if (initialData) {
      reset(initialData)
    } else {
      reset({
        title: "",
        description: "",
        type: QuestionType.Text,
        difficulty: DifficultyLevel.Easy,
        tags: [],
      })
    }
  }, [initialData, reset])

  const handleFormSubmit = (data: QuestionFormData) => {
    const submitData: QuestionCreateDto = {
      title: data.title,
      description: data.description,
      type: data.type,
      difficulty: data.difficulty,
      tags: data.tags,
    }
    onSubmit(submitData)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Box sx={{ fontSize: "1.5rem", fontWeight: 600, color: "text.primary" }}>
          {initialData ? "Edit Question" : "Add New Question"}
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ pt: 1 }}>
          <Grid container spacing={3}>
            {/* Title Field */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Question Title"
                    placeholder="Enter a clear and concise question title"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Description Field */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Question Description"
                    placeholder="Provide detailed description of the question..."
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Type and Difficulty Row */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Question Type</InputLabel>
                    <Select {...field} label="Question Type">
                      <MenuItem value={QuestionType.Text}>Text Answer</MenuItem>
                      <MenuItem value={QuestionType.MultipleChoice}>Multiple Choice</MenuItem>
                      <MenuItem value={QuestionType.Coding}>Coding Challenge</MenuItem>
                    </Select>
                    {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.difficulty}>
                    <InputLabel>Difficulty Level</InputLabel>
                    <Select {...field} label="Difficulty Level">
                      <MenuItem value={DifficultyLevel.Easy}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "success.main" }} />
                          Easy
                        </Box>
                      </MenuItem>
                      <MenuItem value={DifficultyLevel.Medium}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "warning.main" }} />
                          Medium
                        </Box>
                      </MenuItem>
                      <MenuItem value={DifficultyLevel.Hard}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "error.main" }} />
                          Hard
                        </Box>
                      </MenuItem>
                    </Select>
                    {errors.difficulty && <FormHelperText>{errors.difficulty.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Tags Field */}
            <Grid item xs={12}>
              <Controller
                name="tags"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TagsAutocomplete
                    value={value}
                    onChange={onChange}
                    error={!!errors.tags}
                    helperText={errors.tags?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={handleClose} disabled={loading} size="large">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading} size="large" sx={{ minWidth: 120 }}>
            {loading ? "Saving..." : initialData ? "Update Question" : "Add Question"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default QuestionForm
