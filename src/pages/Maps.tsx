import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Filter, Navigation, Layers } from "lucide-react";
import { useState, Suspense, lazy } from "react";

// Dynamic imports for react-leaflet to avoid SSR issues
const MapContainer = lazy(() => import("react-leaflet").then(module => ({ default: module.MapContainer })));
const TileLayer = lazy(() => import("react-leaflet").then(module => ({ default: module.TileLayer })));
const Marker = lazy(() => import("react-leaflet").then(module => ({ default: module.Marker })));
const Popup = lazy(() => import("react-leaflet").then(module => ({ default: module.Popup })));

// Import leaflet styles and compatibility
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

const Maps = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Mock data for map markers/issues
  const mapIssues = [
    {
      id: 1,
      title: "Pothole on Main Street",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      status: "in-progress",
      category: "Road Infrastructure",
      urgency: "high"
    },
    {
      id: 2,
      title: "Broken Streetlight",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      status: "reported",
      category: "Lighting",
      urgency: "medium"
    },
    {
      id: 3,
      title: "Overflowing Trash Bin",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      status: "resolved",
      category: "Waste Management",
      urgency: "low"
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "border-l-red-500";
      case "high":
        return "border-l-orange-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Interactive Map</h1>
          <p className="text-xl text-muted-foreground">
            View and explore civic issues across your community
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card className="shadow-card-civic">
              <CardHeader>
                <CardTitle className="text-lg">Search Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by address or landmark"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="w-full" variant="outline">
                  <Navigation className="mr-2 h-4 w-4" />
                  Use Current Location
                </Button>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="shadow-card-civic">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="reported">Reported</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="road-infrastructure">Road Infrastructure</SelectItem>
                      <SelectItem value="lighting">Street Lighting</SelectItem>
                      <SelectItem value="waste-management">Waste Management</SelectItem>
                      <SelectItem value="sidewalks">Sidewalks</SelectItem>
                      <SelectItem value="vandalism">Vandalism</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full">
                  <Layers className="mr-2 h-4 w-4" />
                  Toggle Heat Map
                </Button>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="shadow-card-civic">
              <CardHeader>
                <CardTitle className="text-lg">Map Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-accent rounded-full"></div>
                  <span className="text-sm">Reported Issues</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  <span className="text-sm">In Progress</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-secondary rounded-full"></div>
                  <span className="text-sm">Resolved</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="shadow-card-civic">
              <CardContent className="p-0">
                <div className="h-96 lg:h-[600px] rounded-lg overflow-hidden">
                  <Suspense fallback={
                    <div className="h-full bg-gradient-to-br from-civic-light to-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-primary mx-auto mb-2 animate-pulse" />
                        <p className="text-muted-foreground">Loading map...</p>
                      </div>
                    </div>
                  }>
                    <MapContainer
                      center={[40.7128, -74.0060] as [number, number]}
                      zoom={12}
                      style={{ height: "100%", width: "100%" }}
                      className="z-0"
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {mapIssues
                        .filter(issue => filterStatus === "all" || issue.status === filterStatus)
                        .filter(issue => filterCategory === "all" || issue.category.toLowerCase().replace(' ', '-') === filterCategory)
                        .map((issue) => (
                          <Marker
                            key={issue.id}
                            position={[issue.coordinates.lat, issue.coordinates.lng]}
                          >
                            <Popup>
                              <div className="p-2 min-w-[200px]">
                                <h3 className="font-semibold text-sm mb-1">{issue.title}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(issue.status)}`}>
                                    {issue.status.replace('-', ' ')}
                                  </span>
                                  <span className="text-xs text-gray-600 capitalize">
                                    {issue.urgency} priority
                                  </span>
                                </div>
                                <p className="text-xs text-gray-700">{issue.category}</p>
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                    </MapContainer>
                  </Suspense>
                </div>
              </CardContent>
            </Card>

            {/* Issue List */}
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Issues in View</h3>
              {mapIssues.map((issue) => (
                <Card key={issue.id} className={`shadow-card-civic border-l-4 ${getUrgencyColor(issue.urgency)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{issue.title}</h4>
                      <Badge className={getStatusColor(issue.status)} variant="secondary">
                        {issue.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{issue.category}</span>
                      <span className="capitalize">{issue.urgency} priority</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">
                      <MapPin className="mr-2 h-4 w-4" />
                      View on Map
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;