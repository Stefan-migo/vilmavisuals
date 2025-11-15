import { motion } from 'motion/react';

const Hero = () => {
  const title = "PROPUESTA DE SERVICIOS AUDIOVISUALES";
  const subtitle = "PARA: VLIMA Córdoba (Valeria Lynch Instituto Musical Artístico)";
  const project = "PROYECTO: Visuales para la Obra de Teatro Musical \"La ley se viste de rosa\"";
  const date = "FECHA: 15 de Noviembre de 2025";

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-5xl mx-auto"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.02em',
          }}
        >
          {title.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-1 sm:mr-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut"
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 px-2"
        >
          {subtitle}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-2 px-2"
        >
          {project}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 px-2 mb-8"
        >
          {date}
        </motion.p>
        
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
              const link = document.createElement('a');
              link.href = '/Mapping La ley se viste de rosa presupuesto.pdf';
              link.download = 'Mapping La ley se viste de rosa presupuesto.pdf';
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              document.body.appendChild(link);
              link.click();
              setTimeout(() => {
                document.body.removeChild(link);
              }, 100);
            } catch (error) {
              console.error('Error downloading PDF:', error);
              // Fallback: open in new tab
              window.open('/Mapping La ley se viste de rosa presupuesto.pdf', '_blank');
            }
          }}
          type="button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl mt-4 cursor-pointer relative z-50"
          style={{ pointerEvents: 'auto' }}
        >
          Descargar Presupuesto PDF
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;

