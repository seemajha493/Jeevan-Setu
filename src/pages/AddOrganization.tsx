import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useOrganizations, OrganizationType } from "@/hooks/useOrganizations";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

const AddOrganization = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createOrganization } = useOrganizations();

  const [formData, setFormData] = useState({
    name: "",
    type: "ngo" as OrganizationType,
    location: "",
    city: "",
    contact: "",
    email: "",
    website: "",
    description: "",
    services: "",
    capacity: "",
    operating_hours: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Organization name is required";
    if (!formData.location.trim()) newErrors.location = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const servicesArray = formData.services
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    await createOrganization.mutateAsync({
      name: formData.name,
      type: formData.type,
      location: formData.location,
      city: formData.city,
      contact: formData.contact,
      email: formData.email || null,
      website: formData.website || null,
      description: formData.description || null,
      services: servicesArray,
      capacity: formData.capacity ? parseInt(formData.capacity) : null,
      operating_hours: formData.operating_hours || null,
      is_verified: false,
      is_active: true,
    });

    navigate("/directory");
  };

  if (!user) {
    return (
      <PageLayout>
        <div className="bg-card py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
                Sign In Required
              </h1>
              <p className="text-muted-foreground mb-6">
                Please sign in to add an organization to the directory.
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

  return (
    <PageLayout>
      <div className="bg-card py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Back Link */}
            <Link
              to="/directory"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Directory
            </Link>

            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-hope/20 mb-6">
                <Building2 className="w-8 h-8 text-hope" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                Add Organization
              </h1>
              <p className="text-muted-foreground">
                Register an NGO, shelter, or community organization to the directory.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Organization Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Aashray Foundation"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Organization Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: OrganizationType) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngo">NGO</SelectItem>
                    <SelectItem value="shelter">Shelter</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="community">Community Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">
                    Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., 123 Main Street, Andheri East"
                    className={errors.location ? "border-destructive" : ""}
                  />
                  {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g., Mumbai"
                    className={errors.city ? "border-destructive" : ""}
                  />
                  {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                </div>
              </div>

              {/* Contact & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">
                    Contact Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="e.g., +91 98765 43210"
                    className={errors.contact ? "border-destructive" : ""}
                  />
                  {errors.contact && <p className="text-sm text-destructive">{errors.contact}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g., contact@organization.org"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="e.g., www.organization.org"
                />
              </div>

              {/* Services */}
              <div className="space-y-2">
                <Label htmlFor="services">Services Offered</Label>
                <Input
                  id="services"
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                  placeholder="e.g., Shelter, Food, Medical Aid (comma separated)"
                />
                <p className="text-xs text-muted-foreground">Separate multiple services with commas</p>
              </div>

              {/* Capacity & Hours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity (number of people)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="e.g., 200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operating_hours">Operating Hours</Label>
                  <Input
                    id="operating_hours"
                    value={formData.operating_hours}
                    onChange={(e) => setFormData({ ...formData, operating_hours: e.target.value })}
                    placeholder="e.g., 24/7 or 9 AM - 6 PM"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the organization and its mission..."
                  rows={4}
                />
              </div>

              {/* Note */}
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <Badge variant="outline" className="mr-2">Note</Badge>
                  New organizations will be reviewed before being marked as verified.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={createOrganization.isPending}
              >
                {createOrganization.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding Organization...
                  </>
                ) : (
                  "Add Organization"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddOrganization;
