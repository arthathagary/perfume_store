import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto max-w-screen-lg py-20 px-8">
                    <h1 className="text-3xl font-light tracking-tight mb-12 sm:text-4xl text-center">Frequently Asked Questions</h1>

                    <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>How long does delivery take?</AccordionTrigger>
                                <AccordionContent>
                                    Delivery usually takes 1-3 business days within Colombo and suburbs, and 2-5 business days for outstation areas.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                                <AccordionContent>
                                    We accept all major credit and debit cards (Visa, MasterCard, etc.) via our secure online payment gateway. We also offer Cash on Delivery for select areas.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Are your products authentic?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, absolutely. Atelier Voile creates original, artisanal fragrances using high-quality ingredients sourced globally.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Can I return my perfume if I don't like it?</AccordionTrigger>
                                <AccordionContent>
                                    Due to hygiene reasons, we cannot accept returns on opened bottles. We recommend trying our discovery sets before committing to a full-sized bottle.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                                <AccordionContent>
                                    Currently, we operate primarily within Sri Lanka. Please contact us for special international shipping requests.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
