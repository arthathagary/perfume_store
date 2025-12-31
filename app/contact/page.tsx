import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto max-w-screen-md py-20 px-8">
                    <h1 className="text-4xl font-light tracking-tight mb-4 text-center sm:text-5xl">Contact Us</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                         <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-lg font-medium">Head Office</h2>
                            <p className="text-muted-foreground">
                                Atelier Voile<br />
                                Jawa Street,<br />
                                Kinniya , Sri Lanka
                            </p>
                            <p className="text-muted-foreground">
                                Email: support@ateliervoile.com<br />
                                Phone: +94 77 123 4567
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
                            <p className="text-muted-foreground mb-4">
                                For inquiries, private consultations, or press requests.
                            </p>
                        </div>
                    </div>

                    <form className="space-y-6 bg-secondary/10 p-8 rounded-sm border border-border">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="email@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Subject</label>
                            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="How can we help?" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Your message..." />
                        </div>

                        <div className="pt-4">
                            <Button variant="luxury" className="w-full justify-center">Send Message</Button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
