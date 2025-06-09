"use client"

import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material"
import { Menu as MenuIcon, Psychology, AccountCircle, Dashboard, Home, ExitToApp } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../features/auth/AuthContext"


export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"))
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
    handleClose()
  }

  const navItems = isAuthenticated
    ? [
        { label: "Home", href: "/dashboard", icon: <Home /> },
        ...(isAdmin ? [{ label: "Admin Dashboard", href: "/admin", icon: <Dashboard /> }] : []),
      ]
    : [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
      ]

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} component={Link} to={item.href}>
            <ListItemText primary={item.label} sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }} />
          </ListItem>
        ))}
        {!isAuthenticated && (
          <>
            <ListItem>
              <Button variant="text" sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}>
                What's New
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="text" sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}>
                Help
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="contained" fullWidth component={Link} to="/login">
                Get Started
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  )

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                background: "linear-gradient(to right, #f97316, #ef4444)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1,
              }}
            >
              <Psychology sx={{ color: "white", fontSize: 20 }} />
            </Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: "white" }}>
              InterviewAce
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.href}
                  startIcon={item.icon}
                  sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Desktop Actions */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {isAuthenticated ? (
                <>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                      {user?.fullName?.charAt(0) || "U"}
                    </Avatar>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <AccountCircle sx={{ mr: 1 }} />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ExitToApp sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}>What's New</Button>
                  <Button sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}>Help</Button>
                  <Button variant="contained" component={Link} to="/login">
                    Get Started
                  </Button>
                </>
              )}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "background.default",
            borderLeft: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
}
