import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Please tell us a little more about your interest"),
});

type FormValues = z.infer<typeof schema>;

interface InquiryFormProps {
  propertyName?: string;
}

export default function InquiryForm({ propertyName }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      budget: "",
      message: propertyName ? `I am interested in ${propertyName} and would like to learn more.` : "",
    },
  });

  const onSubmit = (_data: FormValues) => {
    setTimeout(() => setSubmitted(true), 600);
  };

  if (submitted) {
    return (
      <div
        className="rounded-3xl bg-card border border-white/[0.08] p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[300px]"
        data-testid="form-success-message"
      >
        <CheckCircle2 className="w-12 h-12 text-primary" />
        <h3 className="font-serif text-2xl text-foreground">Thank you for your enquiry</h3>
        <p className="text-muted-foreground max-w-sm">
          A member of our team will be in touch within one business day to discuss your interest
          further.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-card border border-white/[0.08] p-8 md:p-10" data-testid="inquiry-form">
      <h3 className="font-serif text-2xl text-foreground mb-2">Register Your Interest</h3>
      <p className="text-muted-foreground text-sm mb-8">
        Complete the form below and a dedicated advisor will contact you.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs tracking-wide uppercase">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      data-testid="input-name"
                      placeholder="Your full name"
                      className="bg-background/50 border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs tracking-wide uppercase">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      data-testid="input-email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-background/50 border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs tracking-wide uppercase">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      data-testid="input-phone"
                      type="tel"
                      placeholder="+44 or +234..."
                      className="bg-background/50 border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs tracking-wide uppercase">
                    Budget Range
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        data-testid="select-budget"
                        className="bg-background/50 border-white/10 rounded-xl text-foreground focus:border-primary/50 transition-colors"
                      >
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-card border-white/10 text-foreground">
                      <SelectItem value="under-300k">Under $300,000</SelectItem>
                      <SelectItem value="300k-500k">$300,000 – $500,000</SelectItem>
                      <SelectItem value="500k-750k">$500,000 – $750,000</SelectItem>
                      <SelectItem value="750k-1m">$750,000 – $1,000,000</SelectItem>
                      <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground text-xs tracking-wide uppercase">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    data-testid="input-message"
                    rows={4}
                    className="bg-background/50 border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 transition-colors resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            data-testid="button-submit-inquiry"
            disabled={form.formState.isSubmitting}
            className="w-full py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60"
          >
            {form.formState.isSubmitting ? "Sending..." : "Submit Enquiry"}
          </button>
        </form>
      </Form>
    </div>
  );
}
