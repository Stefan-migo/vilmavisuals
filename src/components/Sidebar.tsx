import { useEffect, useState } from 'react';
import StaggeredMenu from './StaggeredMenu';
import { proposalData } from '../data/proposalData';

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', ...proposalData.map(s => s.id)];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = proposalData.map(section => ({
    label: section.title,
    link: `#${section.id}`,
    ariaLabel: `Ir a ${section.title}`
  }));

  useEffect(() => {
    // Handle smooth scroll for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
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

  return (
    <StaggeredMenu
      position="left"
      colors={['#000000', '#1a1a1a', '#262626']}
      items={menuItems}
      menuButtonColor="#ffffff"
      openMenuButtonColor="#ffffff"
      accentColor="#ffffff"
      changeMenuColorOnOpen={false}
      isFixed={true}
      displaySocials={false}
      displayItemNumbering={false}
      logoUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='24'%3E%3Ctext x='0' y='18' fill='white' font-family='system-ui' font-size='16' font-weight='600'%3EVLIMA%3C/text%3E%3C/svg%3E"
    />
  );
};

export default Sidebar;

