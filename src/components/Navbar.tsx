import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, User, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-civic rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-civic bg-clip-text text-transparent">
              CivicReport
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/issues"
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/issues") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Issues
            </Link>
            <Link
              to="/report"
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/report") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Report Issue
            </Link>
            <Link
              to="/progress"
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/progress") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Progress
            </Link>
            <Link
              to="/maps"
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/maps") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Maps
            </Link>
          </div>

          {/* Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/login">
                <User className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/issues"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Issues
            </Link>
            <Link
              to="/report"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Report Issue
            </Link>
            <Link
              to="/progress"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Progress
            </Link>
            <Link
              to="/maps"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Maps
            </Link>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <User className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;