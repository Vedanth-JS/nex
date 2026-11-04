import React, { useState } from 'react';
import { 
  Briefcase, 
  Eye, 
  Code2, 
  ArrowRight,
  RotateCw
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { DemoId } from '../types';

interface PortfolioProps {
  onOpenDemo: (id: DemoId) => void;
  onSelectProject: (title: string) => void;
}

const CATEGORIES = [
  'All',
  'Restaurants',
  'Healthcare',
  'Education',
  'Retail',
  'Hospitality',
  'Corporate',
] as const;

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenDemo, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-aurora-bg/95 border-t border-white/5 overflow-hidden">
      {/* Background Aurora Grid */}
      <div className="absolute inset-0 aurora-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-aurora-magenta/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-surface border border-aurora-violet/40 text-aurora-amber text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(124,92,255,0.25)]">
            <Briefcase className="w-3.5 h-3.5 text-aurora-amber" />
            <span>Proven Design Excellence</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Our Work & Showcase <br />
            <span className="headline-shimmer">
              Transforming Ideas Into Digital Authority
            </span>
          </h2>
          <p className="text-aurora-muted text-base sm:text-lg mt-4 leading-relaxed">
            Explore our curated collection of industry-specific prototypes and client builds. Device frames tilt toward the cursor and flip in 3D to reveal development architecture.
          </p>

          {/* Transparency Disclaimer */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-aurora-surface border border-white/10 text-xs text-aurora-muted max-w-xl mx-auto">
            <span className="w-2 h-2 rounded-full bg-aurora-amber shrink-0" />
            <span>Note: Prototype designs are tagged "Demo concept" to transparently showcase architecture & interaction patterns.</span>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'btn-amber-cta'
                  : 'bg-aurora-surface text-aurora-muted hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid with 3D Tilt and Flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isFlipped = !!flippedCards[project.id];

            return (
              <div
                key={project.id}
                className="group relative h-[560px] rounded-3xl"
                style={{ perspective: 1200 }}
              >
                {/* 3D Flippable Container */}
                <div
                  className="relative w-full h-full transition-transform duration-700 ease-out"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* ================= CARD FRONT ================= */}
                  <div
                    className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 hover:border-aurora-amber/50 transition-all duration-300 flex flex-col justify-between bg-aurora-surface/95 shadow-2xl hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(7,7,13,0.9)]"
                    style={{
                      backfaceVisibility: 'hidden',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div>
                      {/* Device Top Bezel */}
                      <div className="bg-aurora-elevated px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-[10px] font-mono text-aurora-muted truncate max-w-[150px]">
                          {project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                        </span>
                        <button
                          onClick={() => toggleFlip(project.id)}
                          className="flex items-center gap-1 text-[10px] text-aurora-amber hover:underline font-mono cursor-pointer"
                          title="Flip for stack details"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Stack</span>
                        </button>
                      </div>

                      {/* Image Showcase */}
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-aurora-violet/20 to-aurora-surface bg-[#0A0C16]">
                        <img 
                          src={project.image} 
                          alt=""
                          aria-label={project.title}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-aurora-surface via-transparent to-transparent pointer-events-none" />
                        
                        {/* Category & Concept Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-aurora-amber border border-aurora-amber/30">
                            {project.category}
                          </span>
                          {project.isConcept && (
                            <span className="px-2.5 py-1 rounded-lg bg-aurora-violet/25 text-aurora-violet border border-aurora-violet/40 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                              Demo concept
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-6 pb-2">
                        <p className="text-[11px] text-aurora-violet font-semibold uppercase tracking-wider mb-1">
                          {project.clientType}
                        </p>
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-aurora-amber transition-colors mb-2">
                          {project.title}
                        </h3>
                        <p className="text-aurora-muted text-xs leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.highlights.map((h, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-aurora-muted border border-white/5 font-medium">
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-6 pt-0 grid grid-cols-2 gap-3 border-t border-white/10 mt-auto">
                      <button
                        onClick={() => onOpenDemo(project.demoId)}
                        className="py-2.5 rounded-xl btn-glass-secondary text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-aurora-amber" />
                        <span>View Demo</span>
                      </button>

                      <button
                        onClick={() => onSelectProject(project.title)}
                        className="py-2.5 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Build This</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                  {/* ================= CARD BACK ================= */}
                  <div
                    className="absolute inset-0 rounded-3xl p-6 border border-aurora-violet/50 bg-aurora-elevated flex flex-col justify-between shadow-2xl text-left"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div>
                      {/* Back Header */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-5 h-5 text-aurora-amber" />
                          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                            Full Technology Stack
                          </h4>
                        </div>
                        <button
                          onClick={() => toggleFlip(project.id)}
                          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-aurora-amber cursor-pointer"
                          title="Flip Back to Preview"
                        >
                          <RotateCw className="w-4 h-4" />
                        </button>
                      </div>

                      <h5 className="font-display text-base font-bold text-white mb-2">
                        {project.title}
                      </h5>
                      <p className="text-xs text-aurora-muted leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        <p className="text-[11px] font-bold text-aurora-amber uppercase tracking-wider">
                          Development Modules:
                        </p>
                        {project.highlights.map((h, i) => (
                          <div key={i} className="text-xs text-aurora-text flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-aurora-amber" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies Used */}
                      <div className="pt-3 border-t border-white/10">
                        <p className="text-[10px] uppercase tracking-wider text-aurora-muted font-bold mb-2">
                          Core Frameworks & Tools:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-aurora-surface text-aurora-amber border border-aurora-amber/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Back Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 mt-auto">
                      <button
                        onClick={() => onOpenDemo(project.demoId)}
                        className="py-2.5 rounded-xl btn-glass-secondary text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-aurora-amber" />
                        <span>View Demo</span>
                      </button>

                      <button
                        onClick={() => onSelectProject(project.title)}
                        className="py-2.5 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Build This</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
