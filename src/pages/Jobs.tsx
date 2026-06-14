import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  Plus,
  Store,
  GraduationCap,
  Users,
  Search,
  Filter,
  ChefHat,
  Sparkles,
  Truck,
  Shield,
  Wrench,
  Baby,
  Scissors,
  Building,
  Trash2,
  Loader2,
  Accessibility,
  Phone,
  LogIn,
} from "lucide-react";
import { toast } from "sonner";
import { useJobs, NewJobData } from "@/hooks/useJobs";
import { formatDistanceToNow } from "date-fns";
import { validateJobPosting } from "@/lib/validationSchemas";
import { sanitizePhoneNumber } from "@/lib/contactUtils";
import { useSkillProfile } from "@/hooks/useSkillProfile";

const posterTypeConfig = {
  shop: { icon: Store, label: "Local Shop", color: "bg-blue-100 text-blue-700" },
  ngo: { icon: GraduationCap, label: "NGO", color: "bg-green-100 text-green-700" },
  individual: { icon: Users, label: "Individual", color: "bg-orange-100 text-orange-700" },
};

const jobTypeConfig = {
  job: { label: "Regular Job", color: "bg-primary/10 text-primary" },
  training: { label: "Training", color: "bg-emerald-100 text-emerald-700" },
  dailywage: { label: "Daily Wage", color: "bg-amber-100 text-amber-700" },
};

const skillIcons: Record<string, React.ElementType> = {
  cooking: ChefHat,
  cleaning: Sparkles,
  delivery: Truck,
  guarding: Shield,
  construction: Building,
  stitching: Scissors,
  childcare: Baby,
  repair: Wrench,
};

const skillOptions = [
  { value: "cooking", label: "Cooking" },
  { value: "cleaning", label: "Cleaning" },
  { value: "delivery", label: "Delivery" },
  { value: "guarding", label: "Security" },
  { value: "construction", label: "Construction" },
  { value: "stitching", label: "Tailoring" },
  { value: "childcare", label: "Childcare" },
  { value: "repair", label: "Repair" },
  { value: "computer", label: "Computer" },
  { value: "serving", label: "Serving" },
];

const Jobs = () => {
  const navigate = useNavigate();
  const { jobs, isLoading, createJob, deleteJob, user } = useJobs();
  const { profile } = useSkillProfile();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [matchMySkills, setMatchMySkills] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // New job form state
  const [newJob, setNewJob] = useState<NewJobData>({
    title: "",
    poster_name: "",
    poster_type: "shop",
    location: "",
    contact: "",
    hours_per_day: undefined,
    wage: "",
    description: "",
    skills_required: [],
    job_type: "dailywage",
    accessibility_friendly: false,
  });

  // Calculate match score for a job
  const getMatchScore = (job: { skills_required: string[]; accessibility_friendly: boolean }) => {
    if (!profile || profile.skills.length === 0) return 0;
    const jobSkills = job.skills_required || [];
    if (jobSkills.length === 0) return 0;
    const matched = jobSkills.filter((s) => profile.skills.includes(s));
    return matched.length / jobSkills.length;
  };

  const filteredJobs = useMemo(() => {
    let result = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.poster_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || job.job_type === filterType;
      return matchesSearch && matchesType;
    });

    if (matchMySkills && profile && profile.skills.length > 0) {
      result = result.filter((job) => getMatchScore(job) > 0);
      result.sort((a, b) => getMatchScore(b) - getMatchScore(a));
    }

    return result;
  }, [jobs, searchQuery, filterType, matchMySkills, profile]);

  const handlePostJob = async () => {
    if (!user) {
      toast.error("Please sign in to post a job");
      navigate("/auth");
      return;
    }

    // Validate with Zod schema
    const validation = validateJobPosting({
      ...newJob,
      hours_per_day: newJob.hours_per_day || null,
      wage: newJob.wage || null,
    });

    if (!validation.success) {
      setFormErrors(validation.errors || {});
      const firstError = Object.values(validation.errors || {})[0];
      toast.error(firstError || "Please check the form for errors");
      return;
    }

    setFormErrors({});

    setIsSubmitting(true);
    const success = await createJob(newJob);
    setIsSubmitting(false);

    if (success) {
      setNewJob({
        title: "",
        poster_name: "",
        poster_type: "shop",
        location: "",
        contact: "",
        hours_per_day: undefined,
        wage: "",
        description: "",
        skills_required: [],
        job_type: "dailywage",
        accessibility_friendly: false,
      });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      await deleteJob(jobId);
    }
  };

  const toggleSkill = (skill: string) => {
    setNewJob((prev) => ({
      ...prev,
      skills_required: prev.skills_required.includes(skill)
        ? prev.skills_required.filter((s) => s !== skill)
        : [...prev.skills_required, skill],
    }));
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  return (
    <PageLayout>
      <div className="warm-gradient py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Micro-Employment Board
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Find daily-wage work, training opportunities, and small jobs from local shops, NGOs, and individuals.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-card rounded-2xl p-4 card-shadow">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs, locations, or employers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[160px] h-12">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="dailywage">Daily Wage</SelectItem>
                      <SelectItem value="job">Regular Jobs</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                    </SelectContent>
                  </Select>

                  {profile && profile.skills.length > 0 && (
                    <Button
                      variant={matchMySkills ? "default" : "outline"}
                      className="h-12"
                      onClick={() => setMatchMySkills(!matchMySkills)}
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      {matchMySkills ? "Showing Matches" : "Match My Skills"}
                    </Button>
                  )}
                  {user ? (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="hero" className="h-12">
                          <Plus className="w-4 h-4 mr-2" />
                          Post Job
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Post a New Opportunity</DialogTitle>
                          <DialogDescription>
                            Share a job, training, or daily-wage work opportunity
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                          {/* Opportunity Type */}
                          <div className="space-y-3">
                            <Label className="font-semibold">Opportunity Type</Label>
                            <RadioGroup
                              value={newJob.job_type}
                              onValueChange={(v) => setNewJob({ ...newJob, job_type: v as any })}
                              className="grid grid-cols-3 gap-2"
                            >
                              {Object.entries(jobTypeConfig).map(([key, config]) => (
                                <label
                                  key={key}
                                  className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all text-sm ${newJob.job_type === key
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                    }`}
                                >
                                  <RadioGroupItem value={key} className="sr-only" />
                                  {config.label}
                                </label>
                              ))}
                            </RadioGroup>
                          </div>

                          {/* Poster Type */}
                          <div className="space-y-3">
                            <Label className="font-semibold">You are a</Label>
                            <RadioGroup
                              value={newJob.poster_type}
                              onValueChange={(v) => setNewJob({ ...newJob, poster_type: v as any })}
                              className="grid grid-cols-3 gap-2"
                            >
                              {Object.entries(posterTypeConfig).map(([key, config]) => (
                                <label
                                  key={key}
                                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${newJob.poster_type === key
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                    }`}
                                >
                                  <RadioGroupItem value={key} className="sr-only" />
                                  <config.icon className="w-5 h-5" />
                                  <span className="text-xs">{config.label}</span>
                                </label>
                              ))}
                            </RadioGroup>
                          </div>

                          {/* Basic Info */}
                          <div className="space-y-2">
                            <Label className="font-semibold">Job Title *</Label>
                            <Input
                              placeholder="e.g., Helper at Tea Stall"
                              value={newJob.title}
                              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                              maxLength={100}
                              className={formErrors.title ? "border-destructive" : ""}
                            />
                            {formErrors.title && (
                              <p className="text-xs text-destructive">{formErrors.title}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="font-semibold">Your Name / Organization *</Label>
                            <Input
                              placeholder="e.g., Sharma Tea Corner"
                              value={newJob.poster_name}
                              onChange={(e) => setNewJob({ ...newJob, poster_name: e.target.value })}
                              maxLength={100}
                              className={formErrors.poster_name ? "border-destructive" : ""}
                            />
                            {formErrors.poster_name && (
                              <p className="text-xs text-destructive">{formErrors.poster_name}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="font-semibold">Contact Number *</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                placeholder="e.g., +91 98765 43210"
                                className={`pl-10 ${formErrors.contact ? "border-destructive" : ""}`}
                                value={newJob.contact}
                                onChange={(e) => setNewJob({ ...newJob, contact: e.target.value })}
                                maxLength={100}
                              />
                            </div>
                            {formErrors.contact && (
                              <p className="text-xs text-destructive">{formErrors.contact}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="font-semibold">Location *</Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                placeholder="e.g., Lajpat Nagar, Delhi"
                                className={`pl-10 ${formErrors.location ? "border-destructive" : ""}`}
                                value={newJob.location}
                                onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                maxLength={200}
                              />
                            </div>
                            {formErrors.location && (
                              <p className="text-xs text-destructive">{formErrors.location}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="font-semibold">Hours/Day</Label>
                              <Input
                                type="number"
                                placeholder="e.g., 4"
                                min={1}
                                max={24}
                                value={newJob.hours_per_day || ""}
                                onChange={(e) => setNewJob({ ...newJob, hours_per_day: parseInt(e.target.value) || undefined })}
                                className={formErrors.hours_per_day ? "border-destructive" : ""}
                              />
                              {formErrors.hours_per_day && (
                                <p className="text-xs text-destructive">{formErrors.hours_per_day}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label className="font-semibold">Wage/Stipend</Label>
                              <Input
                                placeholder="e.g., ₹300/day"
                                value={newJob.wage || ""}
                                onChange={(e) => setNewJob({ ...newJob, wage: e.target.value })}
                                maxLength={50}
                              />
                            </div>
                          </div>

                          {/* Accessibility */}
                          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                              <Accessibility className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium text-sm">Accessibility Friendly</p>
                                <p className="text-xs text-muted-foreground">Suitable for persons with disabilities</p>
                              </div>
                            </div>
                            <Switch
                              checked={newJob.accessibility_friendly}
                              onCheckedChange={(checked) => setNewJob({ ...newJob, accessibility_friendly: checked })}
                            />
                          </div>

                          {/* Skills Required */}
                          <div className="space-y-3">
                            <Label className="font-semibold">Skills Required</Label>
                            <div className="flex flex-wrap gap-2">
                              {skillOptions.map((skill) => (
                                <button
                                  key={skill.value}
                                  type="button"
                                  onClick={() => toggleSkill(skill.value)}
                                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${newJob.skills_required.includes(skill.value)
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    }`}
                                >
                                  {skill.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Description */}
                          <div className="space-y-2">
                            <Label className="font-semibold">Description *</Label>
                            <Textarea
                              placeholder="Describe the work, requirements, and what you offer..."
                              value={newJob.description}
                              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                              className={`min-h-[100px] ${formErrors.description ? "border-destructive" : ""}`}
                              maxLength={1000}
                            />
                            {formErrors.description && (
                              <p className="text-xs text-destructive">{formErrors.description}</p>
                            )}
                          </div>

                          <Button onClick={handlePostJob} variant="hero" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Posting...
                              </>
                            ) : (
                              "Post Opportunity"
                            )}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button variant="hero" className="h-12" onClick={() => navigate("/auth")}>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In to Post
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-wrap justify-center gap-6 text-center">
              <div>
                <span className="text-2xl font-bold text-primary">{jobs.length}</span>
                <p className="text-sm text-muted-foreground">Active Opportunities</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-primary">
                  {jobs.filter((j) => j.accessibility_friendly).length}
                </span>
                <p className="text-sm text-muted-foreground">Accessible Jobs</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-primary">
                  {jobs.filter((j) => j.job_type === "training").length}
                </span>
                <p className="text-sm text-muted-foreground">Training Programs</p>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-2xl">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {jobs.length === 0 ? "No job postings yet. Be the first to post!" : "No matching opportunities found"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => {
                  const PosterIcon = posterTypeConfig[job.poster_type].icon;
                  const isOwner = user?.id === job.user_id;
                  const matchScore = matchMySkills ? getMatchScore(job) : 0;
                  const matchPercent = Math.round(matchScore * 100);
                  return (
                    <div
                      key={job.id}
                      className={`bg-card rounded-2xl p-6 card-shadow hover:shadow-lg transition-shadow ${matchMySkills && matchScore >= 0.5 ? "ring-2 ring-primary/30" : ""
                        }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        {/* Left side */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {matchMySkills && matchPercent > 0 && (
                              <Badge className="text-xs bg-primary/15 text-primary border-primary/30">
                                {matchPercent}% Match
                              </Badge>
                            )}
                            {job.accessibility_friendly && (
                              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                                <Accessibility className="w-3 h-3 mr-1" />
                                Accessible
                              </Badge>
                            )}
                            <Badge className={jobTypeConfig[job.job_type].color}>
                              {jobTypeConfig[job.job_type].label}
                            </Badge>
                            <Badge variant="outline" className={posterTypeConfig[job.poster_type].color}>
                              <PosterIcon className="w-3 h-3 mr-1" />
                              {posterTypeConfig[job.poster_type].label}
                            </Badge>
                          </div>

                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {job.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">{job.poster_name}</p>

                          <p className="text-sm text-foreground mb-4">{job.description}</p>

                          {/* Skills */}
                          {job.skills_required && job.skills_required.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {job.skills_required.map((skill) => {
                                const SkillIcon = skillIcons[skill] || Briefcase;
                                return (
                                  <span
                                    key={skill}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                                  >
                                    <SkillIcon className="w-3 h-3" />
                                    {skill}
                                  </span>
                                );
                              })}
                            </div>
                          )}

                          {/* Meta info */}
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            {job.hours_per_day && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {job.hours_per_day} hrs/day
                              </span>
                            )}
                            {job.wage && (
                              <span className="flex items-center gap-1">
                                <IndianRupee className="w-4 h-4" />
                                {job.wage}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {job.contact}
                            </span>
                          </div>
                        </div>

                        {/* Right side */}
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs text-muted-foreground">{formatTimeAgo(job.created_at)}</span>
                          <div className="flex gap-2">
                            {isOwner && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteJob(job.id)}
                                className="text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                            <Button variant="hero" size="sm" asChild>
                              <a href={`tel:${sanitizePhoneNumber(job.contact)}`}>Apply Now</a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Jobs;
