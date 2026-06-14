import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Search,
  CheckCircle2,
  XCircle,
  Building2,
  MapPin,
  Phone,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { useOrganizations } from "@/hooks/useOrganizations";
import { useUserRoles } from "@/hooks/useUserRoles";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const AdminVerification = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "verified">("pending");
  const { user } = useAuth();
  const { isAdmin, isLoading: rolesLoading } = useUserRoles();
  const { organizations, isLoading, updateOrganization } = useOrganizations();

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.city.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "pending") return matchesSearch && !org.is_verified;
    if (filter === "verified") return matchesSearch && org.is_verified;
    return matchesSearch;
  });

  const handleVerify = async (id: string) => {
    await updateOrganization.mutateAsync({ id, is_verified: true });
  };

  const handleReject = async (id: string) => {
    await updateOrganization.mutateAsync({ id, is_active: false });
  };

  // Not logged in
  if (!user) {
    return (
      <PageLayout>
        <div className="bg-card py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
                Sign In Required
              </h1>
              <p className="text-muted-foreground mb-6">
                Please sign in to access the admin panel.
              </p>
              <Button asChild variant="hero">
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Loading roles
  if (rolesLoading) {
    return (
      <PageLayout>
        <div className="bg-card py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <PageLayout>
        <div className="bg-card py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />
              <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
                Access Denied
              </h1>
              <p className="text-muted-foreground mb-6">
                You don't have permission to access this page. Admin privileges are required.
              </p>
              <Button asChild variant="outline">
                <Link to="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  const pendingCount = organizations.filter((o) => !o.is_verified).length;

  return (
    <PageLayout>
      <div className="bg-card py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Organization Verification
            </h1>
            <p className="text-muted-foreground">
              Review and verify submitted organizations.
            </p>
            {pendingCount > 0 && (
              <Badge variant="destructive" className="mt-4">
                {pendingCount} pending review
              </Badge>
            )}
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search organizations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === "pending" ? "default" : "outline"}
                  onClick={() => setFilter("pending")}
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  variant={filter === "verified" ? "default" : "outline"}
                  onClick={() => setFilter("verified")}
                  size="sm"
                >
                  Verified
                </Button>
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  onClick={() => setFilter("all")}
                  size="sm"
                >
                  All
                </Button>
              </div>
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Organizations List */}
          {!isLoading && (
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredOrganizations.map((org) => (
                <div
                  key={org.id}
                  className="bg-background rounded-xl p-6 card-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">
                          {org.name}
                        </h3>
                        <Badge variant="outline">{org.type}</Badge>
                        {org.is_verified ? (
                          <Badge className="bg-hope/20 text-hope border-0">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {org.location}, {org.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {org.contact}
                        </span>
                      </div>

                      {org.description && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {org.description}
                        </p>
                      )}

                      {org.services.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {org.services.map((s) => (
                            <Badge key={s} variant="secondary" className="text-xs">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {!org.is_verified && (
                      <div className="flex gap-2 lg:flex-col">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1 lg:flex-none"
                          onClick={() => handleVerify(org.id)}
                          disabled={updateOrganization.isPending}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Verify
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1 lg:flex-none"
                          onClick={() => handleReject(org.id)}
                          disabled={updateOrganization.isPending}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {filteredOrganizations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {filter === "pending"
                      ? "No pending organizations to review."
                      : "No organizations found."}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminVerification;
