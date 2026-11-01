import React, { useState } from 'react';
import { 
  Briefcase, 
  Eye, 
  ExternalLink, 
  Code2, 
  Sparkles, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/portfolioData';
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

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#050510]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Proven Design Excellence</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Our Work & Showcase <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Transforming Ideas Into Digital Authority
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Explore our curated collection of industry-specific concept prototypes and flagship client builds.
          </p>

          {/* Transparency Disclaimer per instructions */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 max-w-xl mx-auto">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span>Note: Concept demo projects are marked with a badge to transparently showcase design capabilities and architecture.</span>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'gradient-button text-white shadow-lg shadow-purple-600/30'
                  : 'glass-card text-slate-400 hover:text-white hover:bg-white/5 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-purple-950/20 bg-[#090d1e]/80"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d1e] via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-bold text-cyan-300 border border-white/10">
                      {project.category}
                    </span>
                    {project.isConcept && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                        Concept Demo
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <p className="text-[11px] text-purple-400 font-semibold uppercase tracking-wider mb-1">
                    {project.clientType}
                  </p>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.highlights.map((h, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5 font-medium">
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  {/* Technologies Used */}
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>Technologies Used</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-800/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3 border-t border-white/10 mt-auto">
                <button
                  onClick={() => onOpenDemo(project.demoId)}
                  className="py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/15 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Demo</span>
                </button>

                <button
                  onClick={() => onSelectProject(project.title)}
                  className="py-2.5 rounded-xl gradient-button text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30"
                >
                  <span>Build This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
