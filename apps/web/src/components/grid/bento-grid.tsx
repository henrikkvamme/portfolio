import { AchievementCard } from './achievement-card';
import { AwardsCard } from './awards-card';
import { CogitoCard } from './cogito-card';
import { ContactCard } from './contact-card';
import { EducationCard } from './education-card';
import { ExpertiseCard } from './expertise-card';
import { LocationCard } from './location-card';
import { PhilosophyCard } from './philosophy-card';
import { ProfileCard } from './profile-card';
import { StartCard } from './start-card';
import { TechStackCard } from './tech-stack-card';

export function BentoGrid() {
  return (
    <div className="mb-40 grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Pitch */}
      <ExpertiseCard colSpan={3} />

      {/* Identity + story */}
      <ProfileCard colSpan={1} />
      <AchievementCard colSpan={2} />

      {/* Credentials */}
      <AwardsCard colSpan={2} />
      <EducationCard colSpan={1} />

      {/* Working style + presence */}
      <PhilosophyCard colSpan={2} />
      <LocationCard colSpan={1} />

      {/* Skills showcase */}
      <TechStackCard colSpan={3} />

      {/* Communities + closing CTA */}
      <CogitoCard colSpan={1} />
      <StartCard colSpan={1} />
      <ContactCard colSpan={1} />
    </div>
  );
}
