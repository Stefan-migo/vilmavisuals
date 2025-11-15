import type { ReactNode } from 'react';
import SpotlightCard from './SpotlightCard';
import FadeContent from './FadeContent';
import GlareHover from './GlareHover';
import './SpotlightCard.css';

interface SectionCardProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

const SectionCard = ({ id, title, children, className = '' }: SectionCardProps) => {
  return (
    <section id={id} className={`py-8 md:py-12 px-4 md:px-8 ${className}`}>
      <FadeContent delay={0} duration={800}>
        <div className="max-w-5xl mx-auto">
          <GlareHover className="w-full">
            <SpotlightCard
              className="p-4 md:p-6 lg:p-8 rounded-lg w-full"
              spotlightColor="rgba(255, 255, 255, 0.1)"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-700">
                {title}
              </h2>
              <div className="text-sm md:text-base text-gray-300 leading-relaxed">
                {children}
              </div>
            </SpotlightCard>
          </GlareHover>
        </div>
      </FadeContent>
    </section>
  );
};

export default SectionCard;

