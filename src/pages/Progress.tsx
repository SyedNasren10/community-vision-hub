import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, AlertCircle, MapPin, Calendar, User } from "lucide-react";

const Progress = () => {
  // Mock data for user's reported issues
  const myIssues = [
    {
      id: 1,
      title: "Pothole on Main Street",
      status: "in-progress",
      progress: 75,
      reportedDate: "2024-01-15",
      estimatedCompletion: "2024-01-22",
      location: "Main Street & Oak Avenue",
      updates: [
        { date: "2024-01-20", message: "Work crew assigned and materials ordered" },
        { date: "2024-01-18", message: "Issue verified by municipal inspector" },
        { date: "2024-01-15", message: "Issue reported and logged in system" }
      ]
    },
    {
      id: 2,
      title: "Broken Streetlight",
      status: "resolved",
      progress: 100,
      reportedDate: "2024-01-10",
      estimatedCompletion: "2024-01-17",
      location: "Park Avenue",
      updates: [
        { date: "2024-01-17", message: "Streetlight replaced and tested - Issue resolved" },
        { date: "2024-01-15", message: "Replacement light ordered" },
        { date: "2024-01-12", message: "Electrical inspection completed" },
        { date: "2024-01-10", message: "Issue reported and logged in system" }
      ]
    }
  ];

  // Mock data for community progress statistics
  const communityStats = {
    totalIssues: 1247,
    resolvedIssues: 892,
    inProgressIssues: 245,
    reportedIssues: 110,
    averageResolutionTime: "8.5 days"
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-secondary" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <AlertCircle className="h-5 w-5 text-accent" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-secondary text-secondary-foreground";
      case "in-progress":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-accent text-accent-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "resolved":
        return "Resolved";
      case "in-progress":
        return "In Progress";
      default:
        return "Reported";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Progress Tracking</h1>
          <p className="text-xl text-muted-foreground">
            Monitor the status of your reports and community-wide progress
          </p>
        </div>

        <Tabs defaultValue="my-issues" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-issues">My Issues</TabsTrigger>
            <TabsTrigger value="community">Community Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="my-issues" className="space-y-6">
            {myIssues.map((issue) => (
              <Card key={issue.id} className="shadow-card-civic">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(issue.status)}
                      <div>
                        <CardTitle className="text-xl">{issue.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="mr-1 h-4 w-4" />
                          {issue.location}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(issue.status)}>
                      {getStatusText(issue.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{issue.progress}%</span>
                    </div>
                    <ProgressBar value={issue.progress} className="h-3" />
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      Reported: {new Date(issue.reportedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      Est. Completion: {new Date(issue.estimatedCompletion).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Updates Timeline */}
                  <div>
                    <h4 className="font-semibold mb-3">Recent Updates</h4>
                    <div className="space-y-3">
                      {issue.updates.map((update, index) => (
                        <div key={index} className="flex items-start space-x-3 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-muted-foreground">{update.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(update.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            {/* Community Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-none shadow-card-civic">
                <CardHeader className="pb-2">
                  <CardDescription>Total Issues</CardDescription>
                  <CardTitle className="text-3xl text-primary">
                    {communityStats.totalIssues.toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-card border-none shadow-card-civic">
                <CardHeader className="pb-2">
                  <CardDescription>Resolved</CardDescription>
                  <CardTitle className="text-3xl text-secondary">
                    {communityStats.resolvedIssues.toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-card border-none shadow-card-civic">
                <CardHeader className="pb-2">
                  <CardDescription>In Progress</CardDescription>
                  <CardTitle className="text-3xl text-primary">
                    {communityStats.inProgressIssues.toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-card border-none shadow-card-civic">
                <CardHeader className="pb-2">
                  <CardDescription>Avg. Resolution</CardDescription>
                  <CardTitle className="text-3xl text-accent">
                    {communityStats.averageResolutionTime}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Resolution Rate Progress */}
            <Card className="shadow-card-civic">
              <CardHeader>
                <CardTitle>Community Resolution Rate</CardTitle>
                <CardDescription>
                  Percentage of reported issues that have been successfully resolved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Resolution Rate</span>
                      <span>{Math.round((communityStats.resolvedIssues / communityStats.totalIssues) * 100)}%</span>
                    </div>
                    <ProgressBar 
                      value={(communityStats.resolvedIssues / communityStats.totalIssues) * 100} 
                      className="h-4" 
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 pt-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-secondary">
                        {Math.round((communityStats.resolvedIssues / communityStats.totalIssues) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Resolved</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {Math.round((communityStats.inProgressIssues / communityStats.totalIssues) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">In Progress</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">
                        {Math.round((communityStats.reportedIssues / communityStats.totalIssues) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Pending</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Progress;