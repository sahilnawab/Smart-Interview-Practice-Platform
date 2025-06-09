"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import { Link, useNavigate } from "react-router-dom"
import { Alert, Button, Card, CardContent, Divider, FormLabel, IconButton, Input, InputAdornment, TextField, Typography } from "@mui/material"
import { usePostApiAuthLoginMutation } from "../authApi"
import { Box, Container, flex, Grid } from "@mui/system"
import { Psychology, Visibility, VisibilityOff } from "@mui/icons-material"
import { useAuth } from "../AuthContext"


type LoginFormInputs = {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
})

export function Login({ className, ...props }: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
 const [showPassword, setShowPassword] = useState(false)
 const navigate=useNavigate();
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
  })
  const [loginIn, { isLoading }] = usePostApiAuthLoginMutation();

 
const onSubmit = async (data: LoginFormInputs) => {
  
    setError(null)
    setSuccess(null)
  try {
    const res = await loginIn({loginDto:{email:data.email,password:data.password}}).unwrap();
   setSuccess("login suscessfull")
    login(res.token, {
  id: res.id,
  email: res.email,
  fullName: res.fullName,
  roles: res.roles
});
navigate("/dashboard")
  } catch (err) {
    console.error("Login Failed", err);
     setError(err.message || "Login failed. Please try again.")
  }
};




  return (
    <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Card sx={{ overflow: "hidden", backgroundColor: "background.paper" }}>
            <Grid container sx={{direction:flex,justifyContent:"center"}} >
              {/* Form Section */}
              <Grid item xs={12} md={6}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: { xs: 4, md: 6 } }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1.5,
                          background: "linear-gradient(to right, #f97316, #ef4444)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <Psychology sx={{ color: "white", fontSize: 24 }} />
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
                        Welcome back
                      </Typography>
                      <Typography color="text.secondary">
                        Sign in to continue your interview practice journey
                      </Typography>
                    </Box>

                    {error && (
                      <Alert severity="error" sx={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#f87171" }}>
                        {error}
                      </Alert>
                    )}

                    {success && (
                      <Alert severity="success" sx={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#34d399" }}>
                        {success}
                      </Alert>
                    )}

                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: "text.secondary" }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Link to="#" style={{ textDecoration: "none" }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "primary.main", "&:hover": { color: "primary.light" } }}
                        >
                          Forgot password?
                        </Typography>
                      </Link>
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={isLoading}
                      sx={{ py: 1.5 }}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>

                    <Divider sx={{ my: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Or continue with
                      </Typography>
                    </Divider>

                    <Grid container spacing={3}  sx={{direction:flex,justifyContent:"center"}} >
                      {[
                        {
                          name: "Apple",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                              <path
                                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                fill="currentColor"
                              />
                            </svg>
                          ),
                        },
                        {
                          name: "Google",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                              <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                              />
                            </svg>
                          ),
                        },
                        {
                          name: "Facebook",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                              <path
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                fill="currentColor"
                              />
                            </svg>
                          ),
                        },
                      ].map((provider) => (
                        <Grid item xs={4} key={provider.name}>
                          <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                              borderColor: "divider",
                              backgroundColor: "rgba(31, 41, 55, 1)",
                              "&:hover": { backgroundColor: "rgba(55, 65, 81, 1)" },
                              color: "text.secondary",
                            }}
                          >
                            {provider.icon}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>

                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" color="text.secondary">
                        Don't have an account?{" "}
                        <Link to="/register" style={{ textDecoration: "none" }}>
                          <Typography
                            component="span"
                            sx={{ color: "primary.main", "&:hover": { color: "primary.light" }, fontWeight: 500 }}
                          >
                            Sign up
                          </Typography>
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Image Section */}
              {/* <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
                <Box sx={{ position: "relative", height: "100%", backgroundColor: "rgba(31, 41, 55, 1)" }}>
                  <img
                  
                    src="../../../../assets/appImages/ai-interview.jpg"
                    alt="Professional interview practice session"
                    
                    style={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(17, 24, 39, 0.8), transparent)",
                    }}
                  />
                  <Box sx={{ position: "absolute", bottom: 4, left: 4, right: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
                      Practice Makes Perfect
                    </Typography>
                    <Typography color="text.secondary">
                      Join thousands of professionals who have mastered their interview skills with our AI-powered
                      platform.
                    </Typography>
                  </Box>
                </Box>
              </Grid>*/}
            </Grid> 
          </Card>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="caption" color="text.secondary">
              By signing in, you agree to our{" "}
              <Link to="#" style={{ color: "#f97316" }}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" style={{ color: "#f97316" }}>
                Privacy Policy
              </Link>
              .
            </Typography>
          </Box>
        </Container>
      </Box>
  )
}
