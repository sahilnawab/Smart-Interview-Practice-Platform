
import { Box, Container, Grid, Typography, IconButton } from "@mui/material"
import { Psychology, Twitter, LinkedIn, GitHub } from "@mui/icons-material"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        backgroundColor: "background.default",
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mb: 2 }}>
                Master your interviews with AI-powered practice sessions. Build confidence and land your dream job.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  component={Link}
                  to="#"
                  sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  component={Link}
                  to="#"
                  sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  component={Link}
                  to="#"
                  sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
                >
                  <GitHub />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "white", mb: 2 }}>
              Platform
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Practice Sessions", "Mock Interviews", "AI Feedback", "Performance Analytics"].map((item) => (
                <Link key={item} to="#" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}>
                    {item}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "white", mb: 2 }}>
              Resources
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Interview Tips", "Career Guides", "Resume Templates", "Help Center"].map((item) => (
                <Link key={item} to="#" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}>
                    {item}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "white", mb: 2 }}>
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["About Us", "Careers", "Privacy Policy", "Terms of Service"].map((item) => (
                <Link key={item} to="#" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}>
                    {item}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: "divider", textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            &copy; 2024 InterviewAce. All rights reserved. Empowering careers through AI.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
