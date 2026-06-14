import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Globe,
  Search,
  CheckCircle2,
  Users,
  Loader2,
  Plus
} from "lucide-react";
import { useState } from "react";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Link } from "react-router-dom";
import { openContact, getContactHref } from "@/lib/contactUtils";
import { toast } from "sonner";

const Directory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { organizations, isLoading } = useOrganizations();

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      ngo: 'NGO',
      shelter: 'Shelter',
      government: 'Government',
      community: 'Community'
    };
    return labels[type] || type;
  };

  return (
    <PageLayout>
      <div className="bg-card py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-hope/20 mb-6">
              <Building2 className="w-8 h-8 text-hope" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              NGO & Shelter Directory
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Connect with verified organizations dedicated to serving the homeless community in your area.
            </p>
            <Button asChild variant="hero">
              <Link to="/directory/add">
                <Plus className="w-4 h-4 mr-2" />
                Add Organization
              </Link>
            </Button>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, location, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Organization Cards */}
          {!isLoading && (
            <div className="max-w-4xl mx-auto space-y-6">
              {filteredOrganizations.map((org) => (
                <div
                  key={org.id}
                  className="bg-background rounded-2xl p-6 md:p-8 card-shadow hover:elevated-shadow transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                      {/* Name & Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                          {org.name}
                        </h3>
                        <Badge variant="outline">{getTypeLabel(org.type)}</Badge>
                        {org.is_verified && (
                          <Badge className="bg-hope/20 text-hope border-0 gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </Badge>
                        )}
                      </div>

                      {/* Description */}
                      {org.description && (
                        <p className="text-muted-foreground mb-4">
                          {org.description}
                        </p>
                      )}

                      {/* Services */}
                      {org.services.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {org.services.map((service) => (
                            <Badge key={service} variant="secondary">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          {org.location}, {org.city}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4 text-primary" />
                          {org.contact}
                        </div>
                        {org.website && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Globe className="w-4 h-4 text-primary" />
                            <a 
                              href={org.website.startsWith('http') ? org.website : `https://${org.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors"
                            >
                              {org.website}
                            </a>
                          </div>
                        )}
                        {org.capacity && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4 text-primary" />
                            Capacity: {org.capacity}
                          </div>
                        )}
                      </div>

                      {/* Operating Hours */}
                      {org.operating_hours && (
                        <p className="text-sm text-muted-foreground mt-3">
                          <span className="font-medium">Hours:</span> {org.operating_hours}
                        </p>
                      )}
                    </div>

                    {/* Contact Button */}
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="lg:self-center"
                      onClick={() => {
                        if (!openContact(org.contact)) {
                          toast.error("Invalid contact format");
                        }
                      }}
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredOrganizations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No organizations found matching your search.</p>
              <Button asChild variant="outline">
                <Link to="/directory/add">Add the first organization</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Directory;
