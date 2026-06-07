import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Facebook, Mail, MapPin, SendIcon } from "lucide-react";
import emailjs from "@emailjs/browser";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useToast } from "@/hooks/use-toast";
import { BlueprintFrame } from "@/components/ui/BlueprintFrame";

const channels = [
  {
    id: "01",
    label: "Facebook",
    value: "Sean Michael Borje",
    href: "https://www.facebook.com/seanmichael.borje.7/",
    icon: Facebook,
  },
  {
    id: "02",
    label: "Email",
    value: "seanmichaelborje179@gmail.com",
    href: "mailto:seanmichaelborje179@gmail.com",
    icon: Mail,
  },
  {
    id: "03",
    label: "Location",
    value: "Manila, Philippines",
    icon: MapPin,
  },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const channelsRef = useRef(null);
  const formPanelRef = useRef(null);
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

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        channelsRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        formPanelRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: formPanelRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section section-surface-light relative scroll-mt-24 overflow-x-clip"
    >
      <div className="section-padding border-t border-border">
        <div className="container min-w-0">
          <div className="contact-section__header mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-center sm:justify-between md:mb-20">
            <p className="text-label text-muted-foreground">06 — Contact</p>
            <p className="text-label text-muted-foreground/70">Open to collaborate</p>
          </div>

          <div className="grid min-w-0 items-start gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 xl:gap-20">
            <div className="min-w-0 lg:sticky lg:top-28">
              <div ref={headlineRef} className="max-w-xl min-w-0">
                <h2 className="contact-headline text-display-lg text-foreground">
                  Let&apos;s build
                  <br />
                  <span className="text-muted-foreground">something together</span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:mt-8 md:text-lg">
                  Have a project in mind or interested in working together? Send a
                  message — I&apos;m always open to new opportunities and professional
                  engagements.
                </p>
              </div>

              <div ref={channelsRef} className="contact-channels mt-8 sm:mt-12">
                {channels.map((channel) => (
                  <ContactChannel key={channel.id} {...channel} />
                ))}
              </div>
            </div>

            <div ref={formPanelRef} className="min-w-0">
              <BlueprintFrame className="contact-form-frame min-w-0">
                <div className="contact-form-frame__header">
                  <span className="text-label text-muted-foreground">Message</span>
                  <span className="text-label text-foreground/70">Direct inquiry</span>
                </div>

                <form ref={form} onSubmit={sendEmail} className="contact-form">
                  <ContactField id="name" name="name" label="Full Name" />
                  <ContactField id="email" name="email" type="email" label="Email Address" />
                  <ContactField id="subject" name="subject" label="Subject" />
                  <ContactField id="message" name="message" label="Message" multiline rows={5} />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cinematic-button-primary w-full disabled:opacity-60"
                  >
                    <SendIcon size={16} />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </BlueprintFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function ContactChannel({ id, label, value, href, icon: Icon }) {
  const content = (
    <>
      <div className="contact-channel__meta">
        <span className="contact-channel__index">{id}</span>
        <span className="text-label text-muted-foreground">{label}</span>
      </div>
      <div className="contact-channel__body">
        <div className="contact-channel__icon" aria-hidden="true">
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <p className="contact-channel__value">{value}</p>
        {href && (
          <span className="contact-channel__arrow" aria-hidden="true">
            <ArrowUpRight size={16} />
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="contact-channel group"
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return <div className="contact-channel">{content}</div>;
}

function ContactField({ id, name, label, type = "text", multiline = false, rows = 4 }) {
  const sharedProps = {
    id,
    name,
    required: true,
    className: "contact-field__input peer",
    placeholder: " ",
  };

  return (
    <div className="contact-field">
      {multiline ? (
        <textarea {...sharedProps} rows={rows} />
      ) : (
        <input type={type} {...sharedProps} />
      )}
      <label htmlFor={id} className="contact-field__label">
        {label}
      </label>
    </div>
  );
}
