import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Gift, Shirt, Package, GraduationCap, Heart, CheckCircle, IndianRupee, Copy, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const donationSchema = z.object({
  donor_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  donor_contact: z.string().min(5, "Please provide a valid phone or email").max(100),
  donation_type: z.enum(["clothes", "food_kit", "training_sponsorship", "monetary"]),
  description: z.string().max(500).optional(),
  quantity: z.string().max(50).optional(),
  city: z.string().min(2, "City is required").max(100),
  amount: z.string().optional(),
  payment_method: z.string().optional(),
  payment_reference: z.string().optional(),
});

type DonationFormData = z.infer<typeof donationSchema>;

const donationTypes = [
  {
    value: "clothes",
    label: "Clothes",
    icon: Shirt,
    description: "Donate clean, wearable clothes for those in need",
  },
  {
    value: "food_kit",
    label: "Food Kit",
    icon: Package,
    description: "Provide essential food supplies and ration kits",
  },
  {
    value: "training_sponsorship",
    label: "Training Sponsorship",
    icon: GraduationCap,
    description: "Sponsor skill training programs for employment",
  },
  {
    value: "monetary",
    label: "Monetary Donation",
    icon: IndianRupee,
    description: "Contribute funds to support our programs",
  },
];

const paymentDetails = {
  upiId: "jeevansetu@upi",
  bankName: "State Bank of India",
  accountName: "Jeevan Setu Foundation",
  accountNumber: "1234567890123456",
  ifscCode: "SBIN0001234",
};

const Donate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donor_name: "",
      donor_contact: "",
      donation_type: undefined,
      description: "",
      quantity: "",
      city: "",
      amount: "",
      payment_method: "",
      payment_reference: "",
    },
  });

  const selectedType = form.watch("donation_type");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("donations").insert({
        donor_name: data.donor_name,
        donor_contact: data.donor_contact,
        donation_type: data.donation_type,
        description: data.description || null,
        quantity: data.donation_type === "monetary" ? null : (data.quantity || null),
        city: data.city,
        amount: data.donation_type === "monetary" && data.amount ? parseFloat(data.amount) : null,
        payment_method: data.donation_type === "monetary" ? (data.payment_method || null) : null,
        payment_reference: data.donation_type === "monetary" ? (data.payment_reference || null) : null,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Thank you for your generous contribution!");
    } catch (error: any) {
      console.error("Error submitting donation:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
              Thank You for Your Generosity!
            </h1>
            <p className="text-muted-foreground mb-8">
              Your donation offer has been received. Our team will contact you soon to arrange the pickup or discuss the sponsorship details.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Submit Another Donation
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Gift className="w-4 h-4" />
            Support Those in Need
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Donate Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your contribution can transform lives. Donate clothes, food kits, or sponsor skill training programs to help people rebuild their lives with dignity.
          </p>
        </div>

        {/* Donation Types */}
        <div className="grid md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
          {donationTypes.map((type) => (
            <Card key={type.value} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <type.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-lg">{type.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{type.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Donation Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Offer Your Donation
            </CardTitle>
            <CardDescription>
              Fill out this form and our team will contact you to arrange the details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="donor_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="donor_contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone or Email *</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we reach you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="donation_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select what you'd like to donate" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="clothes">Clothes</SelectItem>
                            <SelectItem value="food_kit">Food Kit</SelectItem>
                            <SelectItem value="training_sponsorship">Training Sponsorship</SelectItem>
                            <SelectItem value="monetary">Monetary Donation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {selectedType === "monetary" ? (
                  <>
                    {/* Payment Details Card */}
                    <Card className="bg-muted/50 border-dashed">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Payment Details
                        </CardTitle>
                        <CardDescription>
                          Complete your payment via UPI or Bank Transfer, then fill in the details below.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* UPI */}
                        <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                          <div>
                            <p className="text-sm text-muted-foreground">UPI ID</p>
                            <p className="font-medium">{paymentDetails.upiId}</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(paymentDetails.upiId, "UPI ID")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Bank Details */}
                        <div className="p-3 bg-background rounded-lg space-y-2">
                          <p className="text-sm text-muted-foreground mb-2">Bank Transfer</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">Bank:</span>
                            <span className="font-medium">{paymentDetails.bankName}</span>
                            <span className="text-muted-foreground">Account Name:</span>
                            <span className="font-medium">{paymentDetails.accountName}</span>
                            <span className="text-muted-foreground">Account No:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{paymentDetails.accountNumber}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => copyToClipboard(paymentDetails.accountNumber, "Account Number")}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="text-muted-foreground">IFSC:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{paymentDetails.ifscCode}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => copyToClipboard(paymentDetails.ifscCode, "IFSC Code")}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount (₹) *</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 1000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="payment_method"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Method</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="upi">UPI</SelectItem>
                                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="payment_reference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transaction Reference / UTR Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your transaction ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ) : (
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 10 sets, 5 kits" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any specific details about your donation..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Donation Offer"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Donate;