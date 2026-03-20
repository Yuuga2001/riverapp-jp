import { Hero } from "@/components/home/Hero";
import { AppsContainer } from "@/components/home/AppsContainer";
import { AboutSection } from "@/components/home/AboutSection";
import { getAllApps } from "@/lib/apps";

export default function HomePage() {
  const apps = getAllApps();

  return (
    <>
      <Hero appCount={apps.length} />
      <AppsContainer apps={apps} />
      <AboutSection />
    </>
  );
}
