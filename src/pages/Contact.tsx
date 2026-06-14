import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    Loader2
} from "lucide-react";

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success("Message sent successfully!", {
            description: "We'll get back to you as soon as possible."
        });

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
        setIsSubmitting(false);
    };

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="bg-orange-50 py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Get in <span className="text-orange-600">Touch</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Have questions about volunteering, donations, or want to report a case?
                        We're here to help you help others.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                <p className="text-gray-600 mb-8">
                                    Reach out to us through any of these channels. Our team is available
                                    to assist you with any inquiries regarding our initiatives.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Head Office</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            45/A, Seva Bhavan, Andheri East,<br />
                                            Mumbai, Maharashtra - 400069
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                                        <p className="text-gray-600 mb-1">General: +91 98765 43210</p>
                                        <p className="text-gray-600">Helpline: <span className="font-bold text-red-600">1800-HELP-NOW</span></p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600">support@jeevansetu.org</p>
                                        <p className="text-gray-600">volunteer@jeevansetu.org</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Office Hours</h3>
                                        <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600">Emergency Support: 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 h-fit">
                            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Your Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder="How can we help?"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Write your message here..."
                                        rows={6}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 text-lg shadow-lg hover:shadow-orange-500/25 transition-all"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default Contact;
