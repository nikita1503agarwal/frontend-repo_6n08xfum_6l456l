import React from 'react';
import { MapPin, Store, Users, Bell, MessageSquare, Shield } from 'lucide-react';

const Card = ({ icon: Icon, title, children, id }) => (
  <section id={id} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
    </div>
    <div className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
      {children}
    </div>
  </section>
);

const Sections = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card id="map" icon={MapPin} title="Interactive Campus Map">
          • Centered on P.D.A. College of Engineering, Gulbarga
          <br />• Pick from a dropdown of key locations and navigate via your maps app
          <br />• See your live position and whether you are inside campus bounds
          <br />• Upload photos for places like library, labs, and classrooms
        </Card>
        <Card id="marketplace" icon={Store} title="Student Marketplace">
          • Post listings for textbooks, notes, and question papers
          <br />• Browse and contact sellers in-app
          <br />• Optimized for fast search and mobile experience
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card id="clubs" icon={Users} title="Student Connect & Clubs">
          • Find study partners and create project groups
          <br />• Explore clubs and societies by department
          <br />• Join hackathons and collaboration events
        </Card>
        <Card id="notifications" icon={Bell} title="Notifications & Events Hub">
          • Campus events, election updates, and news feed
          <br />• Quick access to student representatives
          <br />• Real-time updates and reminders
        </Card>
        <Card id="feedback" icon={Shield} title="Anonymous Feedback">
          • Share suggestions safely and privately
          <br />• Direct line to faculty/HOD without exposing identity
          <br />• Encourages candid, constructive input
        </Card>
      </div>

      <Card id="chat" icon={MessageSquare} title="Query-Based Chat Forum">
        • Ask academic questions and get peer answers
        <br />• Reputation points and a leaderboard for contributors
        <br />• Top helpers can be recognized as student ambassadors
      </Card>
    </div>
  );
};

export default Sections;
