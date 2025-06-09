"use client"

import type React from "react"
import { Box } from "@mui/material"
import {
  DataGrid,
  type GridColDef,
  type GridRowsProp,
  type GridSortModel,
  type GridFilterModel,
} from "@mui/x-data-grid"

interface DataTableProps {
  rows: GridRowsProp
  columns: GridColDef[]
  loading?: boolean
  onSortModelChange?: (model: GridSortModel) => void
  onFilterModelChange?: (model: GridFilterModel) => void
  sortModel?: GridSortModel
  filterModel?: GridFilterModel
  pageSize?: number
  autoHeight?: boolean
}

const DataTable: React.FC<DataTableProps> = ({
  rows,
  columns,
  loading = false,
  onSortModelChange,
  onFilterModelChange,
  sortModel,
  filterModel,
  pageSize = 10,
  autoHeight = true,
}) => {
  return (
    <Box className="bg-white rounded-lg">
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight={autoHeight}
        disableRowSelectionOnClick
        sortModel={sortModel}
        filterModel={filterModel}
        onSortModelChange={onSortModelChange}
        onFilterModelChange={onFilterModelChange}
        initialState={{
          pagination: {
            paginationModel: { pageSize },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        sx={{
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #e5e7eb",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f9fafb",
            borderBottom: "2px solid #e5e7eb",
          },
          "& .MuiDataGrid-toolbarContainer": {
            padding: "16px",
            borderBottom: "1px solid #e5e7eb",
          },
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  )
}

export default DataTable
