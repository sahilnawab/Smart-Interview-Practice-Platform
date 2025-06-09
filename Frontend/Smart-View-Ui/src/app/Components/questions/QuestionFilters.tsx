"use client"

import type React from "react"
import { Card, CardContent, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material"
import { Search as SearchIcon, FilterList as FilterIcon } from "@mui/icons-material"

interface QuestionFiltersProps {
  searchTerm: string
  selectedDifficulty: string
  selectedTag: string
  availableTags: string[]
  onSearchChange: (value: string) => void
  onDifficultyChange: (value: string) => void
  onTagChange: (value: string) => void
  onClearFilters: () => void
}

const QuestionFilters: React.FC<QuestionFiltersProps> = ({
  searchTerm,
  selectedDifficulty,
  selectedTag,
  availableTags,
  onSearchChange,
  onDifficultyChange,
  onTagChange,
  onClearFilters,
}) => {
  return (
 <Card className="mb-6">
  <CardContent>
    <div className="flex flex-wrap gap-3 items-center">
      <div className="w-full md:w-1/3">
        <TextField
          fullWidth
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon className="mr-2 text-gray-400" />,
          }}
          className="w-full"
        />
      </div>
      <div className="w-full md:w-1/4">
        <FormControl fullWidth className="w-full">
          <InputLabel>Difficulty</InputLabel>
          <Select
            fullWidth
            value={selectedDifficulty}
            label="Difficulty"
            onChange={(e) => onDifficultyChange(e.target.value)}
          >
            <MenuItem value="">All Difficulties</MenuItem>
            <MenuItem value="0">Easy</MenuItem>
            <MenuItem value="1">Medium</MenuItem>
            <MenuItem value="2">Hard</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="w-full md:w-1/4">
        <FormControl fullWidth className="w-full">
          <InputLabel>Tag</InputLabel>
          <Select fullWidth value={selectedTag} label="Tag" onChange={(e) => onTagChange(e.target.value)}>
            <MenuItem value="">All Tags</MenuItem>
            {availableTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full md:w-1/8">
        <Button fullWidth variant="outlined" startIcon={<FilterIcon />} onClick={onClearFilters}>
          Clear
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
  )
}

export default QuestionFilters
