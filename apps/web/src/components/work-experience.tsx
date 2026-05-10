import { motion } from 'motion/react';
import { useState } from 'react';
import {
  calculateDuration,
  formatDatePeriod,
  getExperiences,
} from '@/data/experience';
import { WORK_EXPERIENCE_ANIMATION } from '@/lib/animation-config';
import { DISPLAY } from '@/lib/display-config';
import type { WorkExperience as WorkExperienceType } from '@/types/experience';
import { TechPill } from './tech-pill';

type JourneyCardProps = {
  experience: WorkExperienceType;
  index: number;
  isLeft: boolean;
};

function JourneyCard({ experience, index, isLeft }: JourneyCardProps) {
  const isSpecialProject = experience.id === 'upcoming-project';
  const [showAllTech, setShowAllTech] = useState(false);

  return (
    <motion.div
      className={`relative flex w-full items-center ${isLeft ? 'lg:justify-start' : 'lg:justify-end'} justify-center`}
      initial={{
        opacity: 0,
        x: isLeft
          ? -WORK_EXPERIENCE_ANIMATION.OFFSET
          : WORK_EXPERIENCE_ANIMATION.OFFSET,
      }}
      transition={{
        duration: WORK_EXPERIENCE_ANIMATION.DURATION,
        delay: index * WORK_EXPERIENCE_ANIMATION.DELAY_MULTIPLIER,
      }}
      viewport={{ once: true, margin: '-50px' }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      {/* Timeline dot */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 12px 4px rgba(128,75,242,0.4)',
            '0 0 20px 8px rgba(128,75,242,0.6)',
            '0 0 12px 4px rgba(128,75,242,0.4)',
          ],
        }}
        className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-20 hidden h-3 w-3 rounded-full bg-theme-primary shadow-[0_0_12px_4px_rgba(128,75,242,0.4)] lg:block"
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      {/* Card */}
      <div className={`w-full lg:max-w-md ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}>
        <div className="w-full">
          <div
            className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 ${isSpecialProject ? 'border-theme-primary/60 bg-theme-primary/10' : ''}`}
          >
            {/* Special project glow */}
            {isSpecialProject && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-theme-primary/15 to-theme-secondary/15 opacity-60" />
            )}

            <div className="relative z-10">
              {/* Header */}
              <div className="mb-3">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-lg text-white">
                      {experience.role}
                    </h3>
                    {experience.isCurrentRole && (
                      <span className="rounded-full border border-green-500/30 bg-green-500/20 px-2 py-0.5 font-medium text-green-400 text-xs">
                        Current
                      </span>
                    )}
                    {isSpecialProject && (
                      <span className="rounded-full border border-theme-primary/50 bg-theme-primary/25 px-2 py-0.5 font-medium text-white text-xs">
                        Startup
                      </span>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-medium text-sm text-white/80">
                      {formatDatePeriod(
                        experience.startDate,
                        experience.endDate
                      )}
                    </p>
                    <p className="text-white/60 text-xs">
                      {calculateDuration(
                        experience.startDate,
                        experience.endDate
                      )}{' '}
                      • {experience.location}
                    </p>
                  </div>
                </div>
                <p className="mb-1 font-medium text-base text-blue-300">
                  {experience.company}
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  {experience.companyDescription}
                </p>
              </div>

              {/* Description */}
              <p className="mb-3 text-sm text-white/80 leading-relaxed">
                {experience.description}
              </p>

              {/* Technologies */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {(showAllTech
                    ? experience.technologies
                    : experience.technologies.slice(
                        0,
                        DISPLAY.TECH.INITIAL_LIMIT
                      )
                  ).map((tech) => (
                    <TechPill key={tech} variant="default">
                      {tech}
                    </TechPill>
                  ))}
                  {experience.technologies.length >
                    DISPLAY.TECH.INITIAL_LIMIT &&
                    !showAllTech && (
                      <button
                        className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/60 text-xs transition-colors hover:bg-white/10 hover:text-white/80"
                        onClick={() => setShowAllTech(true)}
                        type="button"
                      >
                        +
                        {experience.technologies.length -
                          DISPLAY.TECH.INITIAL_LIMIT}{' '}
                        more
                      </button>
                    )}
                  {showAllTech &&
                    experience.technologies.length >
                      DISPLAY.TECH.INITIAL_LIMIT && (
                      <button
                        className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/60 text-xs transition-colors hover:bg-white/10 hover:text-white/80"
                        onClick={() => setShowAllTech(false)}
                        type="button"
                      >
                        Show less
                      </button>
                    )}
                </div>
              </div>

              {/* Key highlights - compact */}
              {experience.highlights && experience.highlights.length > 0 && (
                <div className="space-y-1">
                  {experience.highlights
                    .slice(0, DISPLAY.EXPERIENCE.MAX_HIGHLIGHTS)
                    .map((highlight) => (
                      <div
                        className="flex items-start gap-1.5 align-middle text-white/60 text-xs"
                        key={highlight}
                      >
                        <span className="mt-1.5 block h-0.5 w-0.5 flex-shrink-0 rounded-full bg-theme-secondary" />
                        {highlight}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function WorkExperience() {
  const experiences = getExperiences();

  return (
    <section className="relative space-y-8">
      {/* Section header */}
      <motion.div
        className="mb-12 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-50px' }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-3 font-bold text-4xl text-white sm:text-5xl md:text-6xl">
          Work Experience
        </h2>
        <p className="mx-auto max-w-2xl text-white/70 text-xl">
          From startup environments to consultancy work
        </p>
      </motion.div>

      {/* Journey timeline */}
      <div className="relative mx-auto max-w-4xl lg:px-0">
        {/* Central timeline line */}
        <div className="absolute top-0 bottom-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block" />

        {/* Experience cards */}
        <div className="space-y-8 lg:space-y-12">
          {experiences.map((experience, index) => (
            <JourneyCard
              experience={experience}
              index={index}
              isLeft={index % 2 === 0}
              key={experience.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
