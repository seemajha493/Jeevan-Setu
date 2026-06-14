import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Gift,
  Search,
  Phone,
  Loader2,
  AlertTriangle,
  Shield,
  MapPin,
  Shirt,
  Package,
  GraduationCap,
  IndianRupee,
  Calendar,
  User,
} from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUserRoles } from "@/hooks/useUserRoles";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";

type Donation = Database["public"]["Tables"]["donations"]["Row"];
type DonationStatus = Database["public"]["Enums"]["donation_status"];

const donationTypeIcons = {
  clothes: Shirt,
  food_kit: Package,
  training_sponsorship: GraduationCap,
  monetary: IndianRupee,
};

const donationTypeLabels = {
  clothes: "Clothes",
  food_kit: "Food Kit",
  training_sponsorship: "Training Sponsorship",
  monetary: "Monetary",
};

const statusColors: Record<DonationStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  contacted: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const AdminDonations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DonationStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { isAdmin, isLoading: rolesLoading } = useUserRoles();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["admin-donations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Donation[];
    },
    enabled: isAdmin,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: DonationStatus }) => {
      const { error } = await supabase
        .from("donations")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-donations"] });
      toast.success("Status updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.donor_contact.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || donation.status === statusFilter;
    const matchesType = typeFilter === "all" || donation.donation_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

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

  const stats = {
    total: donations.length,
    pending: donations.filter((d) => d.status === "pending").length,
    contacted: donations.filter((d) => d.status === "contacted").length,
    completed: donations.filter((d) => d.status === "completed").length,
    monetary: donations
      .filter((d) => d.donation_type === "monetary" && d.amount)
      .reduce((sum, d) => sum + (Number(d.amount) || 0), 0),
  };

  return (
    <PageLayout>
      <div className="bg-card py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Donation Management
            </h1>
            <p className="text-muted-foreground">
              View and manage all donation submissions.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Contacted</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </CardContent>
            </Card>
            <Card className="col-span-2 md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Monetary Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹{stats.monetary.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, city, or contact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as DonationStatus | "all")}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="clothes">Clothes</SelectItem>
                  <SelectItem value="food_kit">Food Kit</SelectItem>
                  <SelectItem value="training_sponsorship">Training Sponsorship</SelectItem>
                  <SelectItem value="monetary">Monetary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Donations List */}
          {!isLoading && (
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredDonations.map((donation) => {
                const Icon = donationTypeIcons[donation.donation_type] || Gift;
                return (
                  <div
                    key={donation.id}
                    className="bg-background rounded-xl p-6 card-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Icon className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-foreground">
                            {donation.donor_name}
                          </h3>
                          <Badge variant="outline">
                            {donationTypeLabels[donation.donation_type]}
                          </Badge>
                          <Badge className={statusColors[donation.status]}>
                            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {donation.donor_contact}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {donation.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(donation.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        {donation.donation_type === "monetary" && donation.amount && (
                          <div className="text-lg font-semibold text-primary mb-2">
                            ₹{Number(donation.amount).toLocaleString()}
                            {donation.payment_method && (
                              <span className="text-sm font-normal text-muted-foreground ml-2">
                                via {donation.payment_method}
                              </span>
                            )}
                          </div>
                        )}

                        {donation.quantity && donation.donation_type !== "monetary" && (
                          <p className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium">Quantity:</span> {donation.quantity}
                          </p>
                        )}

                        {donation.payment_reference && (
                          <p className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium">Txn Ref:</span> {donation.payment_reference}
                          </p>
                        )}

                        {donation.description && (
                          <p className="text-sm text-muted-foreground">
                            {donation.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground mr-2">Status:</span>
                        <Select
                          value={donation.status}
                          onValueChange={(value) =>
                            updateStatus.mutate({ id: donation.id, status: value as DonationStatus })
                          }
                          disabled={updateStatus.isPending}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredDonations.length === 0 && (
                <div className="text-center py-12">
                  <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No donations found matching your filters.
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

export default AdminDonations;