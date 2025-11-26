import React from 'react';
import { Container } from './ui/Container';

export const ProductPreview: React.FC = () => {
  return (
    <section className="relative z-20 -mt-24 md:-mt-32 pb-20">
      <Container>
        {/* Main Dashboard Frame */}
        <div className="relative rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden transition-colors duration-300 transform perspective-1000">
          
          {/* Browser Top Bar */}
          <div className="h-8 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
          </div>

          {/* Abstract UI Content */}
          <div className="flex h-[400px] md:h-[600px]">
            {/* Sidebar */}
            <div className="w-16 md:w-64 border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hidden md:flex flex-col p-4 space-y-4">
              <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
              <div className="mt-auto space-y-2">
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white dark:bg-slate-900 p-6 relative overflow-hidden">
              
              {/* Header area */}
              <div className="flex justify-between items-center mb-8">
                <div className="space-y-2 w-1/3">
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded"></div>
                </div>
                <div className="flex space-x-3">
                  <div className="h-8 w-24 bg-brand-primary/10 dark:bg-brand-primary/20 rounded"></div>
                  <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                </div>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-3 gap-6 h-full">
                
                {/* Left Col: List Items */}
                <div className="col-span-3 md:col-span-2 space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 space-y-2">
                        <div className="h-8 w-8 rounded-full bg-brand-primary/20"></div>
                        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-600 rounded"></div>
                      </div>
                    ))}
                  </div>

                  {/* Table/List Skeleton */}
                  <div className="rounded-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                      <div className="h-4 w-24 bg-slate-200 dark:bg-slate-600 rounded"></div>
                      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-600 rounded"></div>
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-4 border-b border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded bg-slate-100 dark:bg-slate-800"></div>
                          <div className="space-y-1">
                            <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                            <div className="h-2 w-20 bg-slate-100 dark:bg-slate-800 rounded"></div>
                          </div>
                        </div>
                        <div className="h-6 w-16 rounded-full bg-green-100 dark:bg-green-900/30"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Col: Map/Details */}
                <div className="hidden md:block col-span-1 space-y-4">
                  <div className="h-48 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative overflow-hidden group">
                    {/* Abstract Map Nodes */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-50">
                      <div className="absolute top-10 left-10 w-2 h-2 bg-brand-primary rounded-full animate-ping"></div>
                      <div className="absolute top-10 left-10 w-2 h-2 bg-brand-primary rounded-full"></div>
                      
                      <div className="absolute bottom-12 right-20 w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                    {/* Tooltip Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2 rounded border border-slate-200 dark:border-slate-600 shadow-sm">
                      <div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-600 rounded mb-1"></div>
                      <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-600 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="h-40 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4">
                     <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-600 rounded mb-4"></div>
                     <div className="space-y-2">
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Glass Overlay for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-slate-900/50 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Floating Captions */}
        <div className="hidden md:block absolute -right-4 top-1/4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 max-w-xs animate-blob animation-delay-2000">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">✓</div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">Status Update</div>
              <div className="text-sm font-semibold text-brand-heading dark:text-white">Permit #8821 Approved</div>
              <div className="text-xs text-slate-400">Middle Trinity GCD · Just now</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};