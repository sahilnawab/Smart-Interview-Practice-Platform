"use client"

import type React from "react"
import { useState } from "react"
import { Autocomplete, TextField, Chip, Box, CircularProgress, FormHelperText } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import { useGetApiQuestionsTagsQuery } from "../questions/QuestionsApi"

interface TagsAutocompleteProps {
  value: string[]
  onChange: (tags: string[]) => void
  error?: boolean
  helperText?: string
}

const TagsAutocomplete: React.FC<TagsAutocompleteProps> = ({ value = [], onChange, error = false, helperText }) => {
  const [inputValue, setInputValue] = useState("")
  const { data: availableTags = [], isLoading } = useGetApiQuestionsTagsQuery()

  const handleChange = (event: any, newValue: string[]) => {
    onChange(newValue)
  }

  const handleInputChange = (event: any, newInputValue: string) => {
    setInputValue(newInputValue)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault()
      const trimmedValue = inputValue.trim()

      // Add the new tag if it doesn't already exist
      if (!value.includes(trimmedValue)) {
        onChange([...value, trimmedValue])
      }
      setInputValue("")
    }
  }

  return (
    <Box>
      <Autocomplete
        multiple
        freeSolo
        options={availableTags}
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        loading={isLoading}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={option}
              sx={{
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                borderColor: "primary.main",
                color: "primary.main",
                "& .MuiChip-deleteIcon": {
                  color: "primary.main",
                },
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags"
            placeholder={value.length === 0 ? "Type and press Enter to add tags..." : "Add more tags..."}
            error={error}
            onKeyDown={handleKeyDown}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!availableTags.includes(option) && <AddIcon fontSize="small" color="primary" />}
              {option}
              {!availableTags.includes(option) && (
                <Box component="span" sx={{ fontSize: "0.75rem", color: "text.secondary", ml: "auto" }}>
                  (New)
                </Box>
              )}
            </Box>
          </Box>
        )}
        filterOptions={(options, params) => {
          const filtered = options.filter((option) => option.toLowerCase().includes(params.inputValue.toLowerCase()))

          const { inputValue } = params
          const isExisting = options.some((option) => inputValue === option)
          if (inputValue !== "" && !isExisting) {
            filtered.push(inputValue)
          }

          return filtered
        }}
        sx={{
          "& .MuiAutocomplete-tag": {
            margin: "2px",
          },
        }}
      />
      {helperText && (
        <FormHelperText error={error} sx={{ ml: 2, mt: 0.5 }}>
          {helperText}
        </FormHelperText>
      )}
      <FormHelperText sx={{ ml: 2, mt: 0.5, color: "text.secondary" }}>
        Type a tag name and press Enter to add it. You can select from existing tags or create new ones.
      </FormHelperText>
    </Box>
  )
}

export default TagsAutocomplete
