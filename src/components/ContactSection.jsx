import { Mail, MapPin, Facebook, SendIcon } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FadeReveal, Reveal } from "@/components/Reveal";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you for the message. I'll get back to you as soon as possible.",
        });
        setIsSubmitting(false);
        form.current.reset();
      })
      .catch(() => {
        toast({
          title: "Message Failed to Send",
          description: "Please try again later.",
        });
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="section-surface-light section-padding relative scroll-mt-24">
      <div className="container">
        <Reveal split="lines" className="mb-16 md:mb-24">
          <p className="text-label mb-4 text-muted-foreground">Contact</p>
          <h2 className="text-display-lg max-w-4xl text-foreground">
            Let&apos;s build
            <br />
            something together
          </h2>
        </Reveal>

        <p className="mb-16 max-w-2xl text-muted-foreground md:mb-20">
          If you have a project in mind or are interested in collaboration, please
          don&apos;t hesitate to get in touch. I am always open to exploring new
          opportunities and professional engagements.
        </p>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <FadeReveal className="space-y-10">
            <div>
              <h3 className="font-display mb-8 text-2xl font-medium text-foreground">
                Contact Information
              </h3>

              <div className="space-y-8">
                <ContactRow
                  icon={Facebook}
                  href="https://www.facebook.com/seanmichael.borje.7/"
                  label="Sean Michael Borje"
                />
                <ContactRow
                  icon={Mail}
                  href="mailto:seanmichaelborje179@gmail.com"
                  label="seanmichaelborje179@gmail.com"
                />
                <ContactRow icon={MapPin} label="Manila, Philippines" />
              </div>
            </div>
          </FadeReveal>

          <FadeReveal delay={0.15}>
            <div className="rounded-2xl hairline-border bg-card/50 p-8 backdrop-blur-sm md:p-10">
              <h3 className="font-display mb-8 text-2xl font-medium text-foreground">
                Send a Message
              </h3>

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <FloatingInput id="name" name="name" label="Full Name" />
                <FloatingInput id="email" name="email" type="email" label="Email" />
                <FloatingInput id="subject" name="subject" label="Subject" />
                <FloatingTextarea id="message" name="message" label="Message" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cinematic-button-primary w-full disabled:opacity-60"
                >
                  <SendIcon size={16} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </FadeReveal>
        </div>
      </div>
    </section>
  );
};

function ContactRow({ icon, href, label }) {
  const IconComponent = icon;
  const content = (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/50">
        <IconComponent className="h-5 w-5 text-accent" />
      </div>
      <span className="text-muted-foreground transition-colors group-hover:text-foreground">
        {label}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="group block" target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return content;
}

function FloatingInput({ id, name, label, type = "text" }) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        required
        className="peer w-full rounded-xl border border-border bg-background/50 px-4 pb-3 pt-6 text-foreground placeholder-transparent focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-4 text-sm text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ id, name, label }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        required
        rows={5}
        className="peer w-full resize-none rounded-xl border border-border bg-background/50 px-4 pb-3 pt-6 text-foreground placeholder-transparent focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-4 text-sm text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
}
