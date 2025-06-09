"use client"

import type React from "react"
import { useState } from "react"
import { Container, Typography, Box, Tabs, Tab } from "@mui/material"
import UsersTab from "../Components/admin/UsersTab"
import QuestionsTab from "../Components/questions/QuestionsTab"

const AdminDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Container maxWidth="xl" className="py-8">
      <Typography variant="h3" className="font-bold text-white mb-6">
        Admin Dashboard
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Users" />
          <Tab label="Questions" />
        </Tabs>
      </Box>

      {/* Users Tab */}
      {tabValue === 0 && <UsersTab />}

      {/* Questions Tab */}
      {tabValue === 1 && <QuestionsTab />}
    </Container>
  )
}

export default AdminDashboard
