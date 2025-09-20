import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, BarChart3, Smartphone, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/civic-hero.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-civic bg-clip-text text-transparent">
              Report. Track. Improve.
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Empower your community by reporting civic issues and tracking their resolution. 
              Together, we can make our cities better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-button-civic">
                <Link to="/report">
                  <MapPin className="mr-2 h-5 w-5" />
                  Report an Issue
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/issues">
                  View All Issues
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-civic-light/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How CivicReport Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple, effective platform for citizen engagement and municipal responsiveness
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-none shadow-card-civic">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Report Issues</CardTitle>
                <CardDescription>
                  Easily report civic problems like potholes, broken streetlights, or waste management issues with photos and location
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-none shadow-card-civic">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Monitor the status of your reports and see real-time updates as authorities work to resolve issues
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-none shadow-card-civic">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>See Results</CardTitle>
                <CardDescription>
                  Celebrate when issues are resolved and see the positive impact of community engagement
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">1,247</div>
              <p className="text-muted-foreground">Issues Reported</p>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-secondary mb-2">892</div>
              <p className="text-muted-foreground">Issues Resolved</p>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">98%</div>
              <p className="text-muted-foreground">Citizen Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-civic">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who are actively improving their communities through CivicReport
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/login">
              <Users className="mr-2 h-5 w-5" />
              Get Started Today
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;