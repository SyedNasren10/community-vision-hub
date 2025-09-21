import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

interface MapIssue {
  id: number;
  title: string;
  coordinates: { lat: number; lng: number };
  status: string;
  category: string;
  urgency: string;
}

interface LeafletMapProps {
  mapIssues: MapIssue[];
  filterStatus: string;
  filterCategory: string;
}

const LeafletMap = ({ mapIssues, filterStatus, filterCategory }: LeafletMapProps) => {
  const [mounted, setMounted] = useState(false);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

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

  const filteredIssues = mapIssues
    .filter(issue => filterStatus === "all" || issue.status === filterStatus)
    .filter(issue => filterCategory === "all" || issue.category.toLowerCase().replace(' ', '-') === filterCategory);

  if (!mounted) {
    return (
      <div className="h-full bg-gradient-to-br from-civic-light to-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-primary mx-auto mb-2 animate-pulse" />
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[40.7128, -74.0060]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        className="z-0 rounded-lg"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredIssues.map((issue) => (
          <Marker
            key={`marker-${issue.id}`}
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
    </div>
  );
};

export default LeafletMap;