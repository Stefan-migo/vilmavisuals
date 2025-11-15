import { useEffect } from 'react';
import LiquidEtherBackground from './components/LiquidEtherBackground';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import SectionCard from './components/SectionCard';
import GradualBlur from './components/GradualBlur';
import { proposalData } from './data/proposalData';

function App() {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't intercept button clicks
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        return;
      }
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      if (link) {
        e.preventDefault();
        const id = link.getAttribute('href')?.replace('#', '');
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const formatContent = (content: string | string[]) => {
    if (typeof content === 'string') {
      return <p>{content}</p>;
    }
    
    const renderMarkdown = (text: string) => {
      // Split by ** to handle bold text (handles multiple bold sections)
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      });
    };
    
    return content.map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Handle markdown-style formatting - check if entire line is bold
      if (line.startsWith('**') && line.endsWith('**') && !line.includes('**', 2)) {
        const text = line.slice(2, -2);
        return (
          <p key={index} className="font-bold text-white mt-4 mb-2">
            {text}
          </p>
        );
      }
      
      // Handle bullet points
      if (line.startsWith('* ')) {
        const text = line.slice(2);
        return (
          <p key={index} className="ml-4 mb-2">
            • {renderMarkdown(text)}
          </p>
        );
      }
      
      // Handle nested bullet points
      if (line.startsWith('  * ')) {
        const text = line.slice(4);
        return (
          <p key={index} className="ml-8 mb-2 text-gray-400">
            ◦ {renderMarkdown(text)}
          </p>
        );
      }
      
      // Regular paragraph with potential markdown
      return (
        <p key={index} className="mb-2 break-words">
          {renderMarkdown(line)}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <LiquidEtherBackground />
      <div className="relative z-10">
        <GradualBlur position="top" strength={1} height="4rem" />
        <Sidebar />
        <Hero />
        <div className="space-y-8 pb-20">
          {proposalData.map((section, index) => (
            <SectionCard
              key={section.id}
              id={section.id}
              title={section.title}
              className={index === 0 ? 'mt-0' : ''}
            >
              {formatContent(section.content)}
              {section.id === 'contacto' && (
                <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm md:text-base text-gray-500">
                  <p>
                    Esta página web fue creada por{' '}
                    <span className="text-white font-semibold">Stefan Miranda González</span>
                  </p>
                </div>
              )}
            </SectionCard>
          ))}
        </div>
        <GradualBlur position="bottom" strength={1} height="4rem" />
      </div>
    </div>
  );
}

export default App;
