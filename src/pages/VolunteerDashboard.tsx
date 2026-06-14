import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Heart,
  Camera,
  FileText,
  Users,
  Award,
  Upload,
  Plus,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  TrendingUp
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface HelpRecord {
  id: number;
  date: string;
  location: string;
  description: string;
  proofType: "photo" | "note";
  livesHelped: number;
  status: "pending" | "verified";
}

const VolunteerDashboard = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerEmail, setVolunteerEmail] = useState("");
  const [volunteerPhone, setVolunteerPhone] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProofDialogOpen, setIsProofDialogOpen] = useState(false);

  // Proof upload state
  const [proofLocation, setProofLocation] = useState("");
  const [proofDescription, setProofDescription] = useState("");
  const [proofLivesHelped, setProofLivesHelped] = useState("1");
  const [proofType, setProofType] = useState<"photo" | "note">("photo");

  const [helpRecords, setHelpRecords] = useState<HelpRecord[]>([
    {
      id: 1,
      date: "2024-01-05",
      location: "Near Central Railway Station",
      description: "Provided food packets to 3 homeless individuals",
      proofType: "photo",
      livesHelped: 3,
      status: "verified",
    },
    {
      id: 2,
      date: "2024-01-03",
      location: "Under Bandra Flyover",
      description: "Distributed blankets to a family of 4",
      proofType: "photo",
      livesHelped: 4,
      status: "verified",
    },
    {
      id: 3,
      date: "2024-01-01",
      location: "Dadar Station",
      description: "Connected elderly person with local NGO for shelter",
      proofType: "note",
      livesHelped: 1,
      status: "pending",
    },
  ]);

  const totalLivesHelped = helpRecords.reduce((sum, record) => sum + record.livesHelped, 0);
  const verifiedCount = helpRecords.filter((r) => r.status === "verified").length;

  const handleRegister = () => {
    if (!volunteerName || !volunteerEmail || !volunteerPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to register.",
        variant: "destructive",
      });
      return;
    }
    setIsRegistered(true);
    setIsDialogOpen(false);
    toast({
      title: "Welcome, Volunteer! 🎉",
      description: "You're now registered as a volunteer helper.",
    });
  };

  const handleSubmitProof = () => {
    if (!proofLocation || !proofDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newRecord: HelpRecord = {
      id: helpRecords.length + 1,
      date: new Date().toISOString().split("T")[0],
      location: proofLocation,
      description: proofDescription,
      proofType,
      livesHelped: parseInt(proofLivesHelped) || 1,
      status: "pending",
    };

    setHelpRecords([newRecord, ...helpRecords]);
    setProofLocation("");
    setProofDescription("");
    setProofLivesHelped("1");
    setIsProofDialogOpen(false);
    toast({
      title: "Proof Submitted! 📸",
      description: "Your help record is pending verification.",
    });
  };

  return (
    <PageLayout>
      <div className="bg-card py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Volunteer Dashboard 🤝
            </h1>
            <p className="text-muted-foreground">
              Register as a volunteer, track your impact, and upload proof of help
            </p>
          </div>

          {/* Registration Section */}
          {!isRegistered ? (
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 text-center card-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
                  Become a Volunteer
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Join our community of helpers and make a real difference in the lives of those in need.
                </p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="hero" size="lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Register as Volunteer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-serif">Volunteer Registration</DialogTitle>
                      <DialogDescription>
                        Fill in your details to start helping those in need.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          value={volunteerName}
                          onChange={(e) => setVolunteerName(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={volunteerEmail}
                          onChange={(e) => setVolunteerEmail(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone"
                          value={volunteerPhone}
                          onChange={(e) => setVolunteerPhone(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <Button onClick={handleRegister} className="w-full" variant="hero">
                        Complete Registration
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="max-w-4xl mx-auto mb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-background rounded-2xl p-6 card-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-foreground">{totalLivesHelped}</p>
                        <p className="text-sm text-muted-foreground">Lives Helped</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background rounded-2xl p-6 card-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-foreground">{verifiedCount}</p>
                        <p className="text-sm text-muted-foreground">Verified Actions</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background rounded-2xl p-6 card-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-sky/20 flex items-center justify-center">
                        <Award className="w-6 h-6 text-sky" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-foreground">Hero</p>
                        <p className="text-sm text-muted-foreground">Volunteer Badge</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Proof Section */}
              <div className="max-w-4xl mx-auto mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Your Help History
                  </h2>
                  <Dialog open={isProofDialogOpen} onOpenChange={setIsProofDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="hero">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Proof of Help
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-serif">Upload Proof of Help</DialogTitle>
                        <DialogDescription>
                          Document your volunteering effort with a photo or note.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        {/* Proof Type Selection */}
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant={proofType === "photo" ? "default" : "outline"}
                            onClick={() => setProofType("photo")}
                            className="flex-1"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Photo
                          </Button>
                          <Button
                            type="button"
                            variant={proofType === "note" ? "default" : "outline"}
                            onClick={() => setProofType("note")}
                            className="flex-1"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Note
                          </Button>
                        </div>

                        {proofType === "photo" && (
                          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                            <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Click to upload photo
                            </p>
                            <Input
                              type="file"
                              accept="image/*"
                              className="opacity-0 absolute inset-0 cursor-pointer"
                            />
                            <Button variant="outline" size="sm">
                              Choose File
                            </Button>
                          </div>
                        )}

                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            placeholder="Where did you help?"
                            value={proofLocation}
                            onChange={(e) => setProofLocation(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>

                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Describe how you helped..."
                            value={proofDescription}
                            onChange={(e) => setProofDescription(e.target.value)}
                            className="mt-1.5"
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="livesHelped">Number of People Helped</Label>
                          <Input
                            id="livesHelped"
                            type="number"
                            min="1"
                            placeholder="1"
                            value={proofLivesHelped}
                            onChange={(e) => setProofLivesHelped(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>

                        <Button onClick={handleSubmitProof} className="w-full" variant="hero">
                          Submit Proof
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Help Records */}
                <div className="space-y-4">
                  {helpRecords.map((record) => (
                    <div
                      key={record.id}
                      className="bg-background rounded-2xl p-5 card-shadow hover:elevated-shadow transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={record.status === "verified" ? "default" : "secondary"}
                              className={
                                record.status === "verified"
                                  ? "bg-primary text-primary-foreground"
                                  : ""
                              }
                            >
                              {record.status === "verified" ? (
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                              ) : (
                                <Clock className="w-3 h-3 mr-1" />
                              )}
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              {record.proofType === "photo" ? (
                                <Camera className="w-3 h-3" />
                              ) : (
                                <FileText className="w-3 h-3" />
                              )}
                              {record.proofType.charAt(0).toUpperCase() + record.proofType.slice(1)}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <MapPin className="w-4 h-4" />
                            <span>{record.location}</span>
                          </div>

                          <p className="text-foreground mb-2">{record.description}</p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(record.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 bg-primary/10 rounded-xl px-4 py-3">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{record.livesHelped}</p>
                            <p className="text-xs text-muted-foreground">Lives Helped</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {helpRecords.length === 0 && (
                  <div className="text-center py-16 bg-background rounded-2xl">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No help records yet. Start making a difference!
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default VolunteerDashboard;
