import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, User, Search, Filter } from "lucide-react";
import { useState } from "react";

const Issues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for issues
  const issues = [
    {
      id: 1,
      title: "Pothole on Main Street",
      description: "Large pothole causing damage to vehicles near the intersection of Main Street and Oak Avenue.",
      location: "Main Street & Oak Avenue",
      status: "in-progress",
      reporter: "John Doe",
      reportedDate: "2024-01-15",
      category: "Road Infrastructure"
    },
    {
      id: 2,
      title: "Broken Streetlight",
      description: "Streetlight has been out for over a week, creating safety concerns for pedestrians.",
      location: "Park Avenue",
      status: "reported",
      reporter: "Jane Smith",
      reportedDate: "2024-01-14",
      category: "Lighting"
    },
    {
      id: 3,
      title: "Overflowing Trash Bin",
      description: "Public trash bin is overflowing and attracting pests in the downtown area.",
      location: "City Center Plaza",
      status: "resolved",
      reporter: "Mike Johnson",
      reportedDate: "2024-01-10",
      category: "Waste Management"
    },
    {
      id: 4,
      title: "Damaged Sidewalk",
      description: "Cracked and uneven sidewalk poses tripping hazard for pedestrians.",
      location: "Elm Street",
      status: "reported",
      reporter: "Sarah Wilson",
      reportedDate: "2024-01-13",
      category: "Sidewalks"
    },
    {
      id: 5,
      title: "Graffiti on Public Building",
      description: "Vandalism on the community center building needs to be cleaned.",
      location: "Community Center",
      status: "in-progress",
      reporter: "David Brown",
      reportedDate: "2024-01-12",
      category: "Vandalism"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reported":
        return "bg-accent text-accent-foreground";
      case "in-progress":
        return "bg-primary text-primary-foreground";
      case "resolved":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "reported":
        return "Reported";
      case "in-progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      default:
        return status;
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Community Issues</h1>
          <p className="text-xl text-muted-foreground">
            Browse and track civic issues reported by community members
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="reported">Reported</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Issues Grid */}
        <div className="grid gap-6">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="shadow-card-civic hover:shadow-civic transition-shadow duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{issue.title}</CardTitle>
                    <CardDescription className="text-base">
                      {issue.description}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(issue.status)}>
                    {getStatusText(issue.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {issue.location}
                  </div>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Reported by {issue.reporter}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {new Date(issue.reportedDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Badge variant="outline">{issue.category}</Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg">
              No issues found matching your criteria.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Issues;