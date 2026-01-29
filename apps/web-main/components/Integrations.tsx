import React from 'react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';

const integrations = [
    {
        name: 'Texas Water Development Board',
        description: 'Native export to TWDB groundwater database formats.',
        icon: 'TWDB',
    },
    {
        name: 'ArcGIS / QGIS',
        description: 'Direct shapefile and GeoJSON integration for your GIS team.',
        icon: 'GIS',
    },
    {
        name: 'SCADA Systems',
        description: 'Ingest telemetry data from major meter manufacturers.',
        icon: 'SCADA',
    },
    {
        name: 'Excel / CSV',
        description: 'Universal import/export for legacy data migration.',
        icon: 'CSV',
    },
];

export const Integrations: React.FC = () => {
    return (
        <section className="bg-brand-muted dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 py-16">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-heading dark:text-white">
                        Works With Your Existing Ecosystem
                    </h2>
                    <p className="text-brand-text/80 dark:text-slate-400">
                        Don&apos;t rip and replace. AridInsights connects with the tools you already use, ensuring a smooth transition and unified data strategy.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {integrations.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 group">
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 text-brand-primary font-bold text-sm tracking-wider group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-brand-heading dark:text-white mb-1 text-center">{item.name}</h3>
                            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
