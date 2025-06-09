"use client"

import type React from "react"
import { Box, Typography, Button, FormControl, Select, MenuItem } from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon, Download as DownloadIcon } from "@mui/icons-material"
import { GridActionsCellItem, type GridColDef } from "@mui/x-data-grid"
import DataTable from "../../commonComponents/DataTable"
import { useGetApiUsersQuery, usePutApiUsersByIdRoleMutation } from "../admin/UsersApi"

const UsersTab: React.FC = () => {
  const { data: users = [], isLoading, refetch } = useGetApiUsersQuery()
  const [updateUserRole] = usePutApiUsersByIdRoleMutation()

  const handleEditUser = (id: string) => {
    console.log("Edit user:", id)
    // Implement edit user functionality
  }

  const handleDeleteUser = (id: string) => {
    console.log("Delete user:", id)
    // Implement delete user functionality
  }

  const handleChangeUserRole = async (id: string, newRole: string) => {
    try {
      await updateUserRole({ id, body: newRole }).unwrap()
      refetch()
    } catch (error) {
      console.error("Failed to update user role:", error)
    }
  }

  const handleExportPDF = () => {
    // Implement PDF export functionality
    console.log("Export users to PDF")
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200, filterable: true },
    { field: "userName", headerName: "Username", width: 150, filterable: true },
    { field: "email", headerName: "Email", width: 200, filterable: true },
    { field: "fullName", headerName: "Full Name", width: 180, filterable: true },
    {
      field: "roles",
      headerName: "Role",
      width: 150,
      renderCell: (params) => (
        <FormControl size="small" fullWidth>
          <Select
            value={params.value?.[0] || "User"}
            onChange={(e) => handleChangeUserRole(params.row.id, e.target.value)}
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
      ),
      valueGetter: (params) => params.value?.[0] || "User",
      filterable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditUser(params.id as string)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteUser(params.id as string)}
        />,
      ],
    },
  ]

  return (
    <Box>
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5" className="text-white">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleExportPDF}
          className="bg-gradient-to-r from-orange-500 to-red-500"
        >
          Export PDF
        </Button>
      </Box>

      <DataTable rows={users} columns={columns} loading={isLoading} />
    </Box>
  )
}

export default UsersTab
