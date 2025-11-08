import React from 'react';
import { Users, Store, MessageSquare, MapPin } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Clubs & Communities',
    desc: 'Discover and join student groups that match your interests, from tech to arts.',
  },
  {
    icon: Store,
    title: 'Student Marketplace',
    desc: 'Buy and sell textbooks, gadgets, and dorm essentials with classmates.',
  },
  {
    icon: MessageSquare,
    title: 'Q&A Forum',
    desc: 'Ask questions, share tips, and get peer support across campus topics.',
  },
  {
    icon: MapPin,
    title: 'Campus Map',
    desc: 'See events and listings near you with geo-tagged posts and photos.',
  },
];

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
    <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="font-semibold text-slate-900">{title}</h3>
    <p className="text-sm mt-1 text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const FeatureGrid = () => {
  return (
    <section id="features" className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900">What you can do</h2>
        <p className="text-slate-600 mt-2">A streamlined toolkit for student life</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
