import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NavBar } from "@/components/layout/NavBar";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { SkillSection } from "@/components/sections/SkillSection";
import { SmoothScroll } from "@/components/effects/SmoothScroll";

export const Home = () => {
  return (
    <SmoothScroll fixed={<NavBar />}>
      <div className="relative min-h-screen overflow-x-hidden text-foreground">
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillSection />
          <ProjectSection />
          <ContactSection />
          <FooterSection />
        </main>
      </div>
    </SmoothScroll>
  );
};
