import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CaseStatusTracker, { CaseStatus } from "@/components/CaseStatusTracker";
import { useHelpRequests } from "@/hooks/useHelpRequests";
import { formatDistanceToNow } from "date-fns";
import { 
  Search, 
  MapPin, 
  Clock, 
  Utensils, 
  Home, 
  Stethoscope,
  Filter,
  Heart,
  Loader2,
  LogIn,
  Trash2,
  User,
} from "lucide-react";

const helpTypeIcons: Record<string, React.ElementType> = {
  food: Utensils,
  shelter: Home,
  medical: Stethoscope,
};

const urgencyColors: Record<string, string> = {
  high: "bg-urgent text-urgent-foreground",
  medium: "bg-moderate text-moderate-foreground",
  low: "bg-primary/20 text-primary",
};

const HelpDashboard = () => {
  const navigate = useNavigate();
  const { helpRequests, isLoading, assignVolunteer, deleteHelpRequest, user } = useHelpRequests();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterUrgency, setFilterUrgency] = useState<string | null>(null);

  const filteredRequests = helpRequests.filter((request) => {
    const matchesSearch = request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUrgency = !filterUrgency || request.urgency === filterUrgency;
    return matchesSearch && matchesUrgency;
  });

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  const handleHelpNow = async (requestId: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    await assignVolunteer(requestId);
  };

  const handleDelete = async (requestId: string) => {
    if (confirm("Are you sure you want to delete this help request?")) {
      await deleteHelpRequest(requestId);
    }
  };

  return (
    <PageLayout>
      <div className="bg-card py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Help Dashboard
            </h1>
            <p className="text-muted-foreground">
              Browse active help requests in your area and extend a helping hand
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by location or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterUrgency === null ? "default" : "outline"}
                  onClick={() => setFilterUrgency(null)}
                  className="h-12"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  All
                </Button>
                <Button
                  variant={filterUrgency === "high" ? "default" : "outline"}
                  onClick={() => setFilterUrgency("high")}
                  className="h-12"
                >
                  Urgent
                </Button>
                <Button
                  variant={filterUrgency === "medium" ? "default" : "outline"}
                  onClick={() => setFilterUrgency("medium")}
                  className="h-12"
                >
                  Medium
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredRequests.length} active requests
            </p>
          </div>

          {/* Request Cards */}
          <div className="max-w-4xl mx-auto space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  {helpRequests.length === 0 
                    ? "No help requests yet. Report someone in need to get started."
                    : "No matching help requests found."}
                </p>
              </div>
            ) : (
              filteredRequests.map((request) => {
                const isReporter = user?.id === request.reporter_id;
                const isAssigned = user?.id === request.assigned_volunteer_id;
                
                return (
                  <div
                    key={request.id}
                    className="bg-background rounded-2xl p-6 card-shadow hover:elevated-shadow transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Urgency & Help Types */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={urgencyColors[request.urgency]}>
                            {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
                          </Badge>
                          {request.help_types.map((type) => {
                            const Icon = helpTypeIcons[type];
                            return (
                              <Badge key={type} variant="secondary" className="gap-1">
                                <Icon className="w-3 h-3" />
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </Badge>
                            );
                          })}
                          {isAssigned && (
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              <User className="w-3 h-3 mr-1" />
                              You're helping
                            </Badge>
                          )}
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground">{request.location}</p>
                            <p className="text-sm text-muted-foreground">{request.city}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-4">
                          {request.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTimeAgo(request.created_at)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 md:self-center shrink-0">
                        {isReporter && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(request.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                        {user ? (
                          <Button 
                            variant="hero" 
                            onClick={() => handleHelpNow(request.id)}
                            disabled={isAssigned}
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            {isAssigned ? "Assigned" : "Help Now"}
                          </Button>
                        ) : (
                          <Button variant="hero" onClick={() => navigate("/auth")}>
                            <LogIn className="w-4 h-4 mr-2" />
                            Sign In to Help
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Case Status Tracker */}
                    <div className="mt-6 pt-5 border-t border-border">
                      <p className="text-xs font-medium text-muted-foreground mb-3">Case Progress</p>
                      <CaseStatusTracker currentStatus={request.case_status} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HelpDashboard;
