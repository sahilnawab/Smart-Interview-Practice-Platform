import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";


export default function HomePage() {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Welcome to <span className="text-primary">Smart Interview Practice</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Building the future with innovative solutions and cutting-edge technology. Join thousands of satisfied
          customers who trust our platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="large" >
            <Link to="/register">Get Started</Link>
          </Button>
          <Button size="large" variant="outlined" >
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardHeader>Fast & Reliable</CardHeader>
              <CardContent>Lightning-fast performance with 99.9% uptime guarantee</CardContent>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our infrastructure is built for speed and reliability, ensuring your business never stops.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardHeader>Secure</CardHeader>
              <CardContent>Enterprise-grade security to protect your data</CardContent>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Advanced encryption and security measures keep your information safe and secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardHeader>24/7 Support</CardHeader>
              <CardContent>Round-the-clock customer support when you need it</CardContent>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our dedicated support team is always ready to help you succeed.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
