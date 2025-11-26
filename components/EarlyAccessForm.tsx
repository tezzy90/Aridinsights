import React, { useState } from 'react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { UserRole } from '../types';

export const EarlyAccessForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    challenge: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form Submitted:', formData);
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        challenge: ''
      });
    }, 1000);
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary dark:focus:border-brand-primary transition-all duration-200 placeholder-slate-400 dark:placeholder-slate-500 text-brand-heading dark:text-white";
  const labelClasses = "block text-sm font-semibold mb-2 text-brand-heading dark:text-slate-200 transition-colors duration-300";

  return (
    <section id="early-access" className="bg-brand-muted dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 lg:sticky lg:top-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-heading dark:text-white tracking-tight transition-colors duration-300">Request Early Access</h2>
            <p className="text-lg text-brand-text/80 dark:text-slate-300 leading-relaxed mb-8 transition-colors duration-300">
              WellFlow is in active development. If you work with Texas GCDs as a consultant, operator,
              landowner, or public agency, you can join the early access list to streamline your compliance workflows.
            </p>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hidden lg:block transition-colors duration-300">
              <h4 className="font-bold text-brand-heading dark:text-white mb-2">What happens next?</h4>
              <ul className="space-y-3 text-sm text-brand-text/80 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span> We will review your role and district needs.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span> Qualified partners get priority beta access.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span> No spam, just product updates.
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:max-w-lg">
            <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-2xl shadow-soft dark:shadow-none border border-slate-100 dark:border-slate-700 transition-colors duration-300">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="text-brand-heading dark:text-white font-bold text-2xl mb-2">Request Received</div>
                  <p className="text-brand-text/70 dark:text-slate-400 mb-8">Thank you for your interest. We will be in touch shortly.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-brand-primary dark:text-brand-primary underline font-medium hover:text-brand-dark dark:hover:text-white transition-colors"
                  >
                    Send another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className={labelClasses}>Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className={labelClasses}>Work Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@company.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className={labelClasses}>Company / Organization</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className={labelClasses}>Role</label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none cursor-pointer`}
                    >
                      <option value="">Select your role</option>
                      <option value={UserRole.Consultant}>Consultant</option>
                      <option value={UserRole.Developer}>Developer / Landowner</option>
                      <option value={UserRole.Agricultural}>Agricultural Operations</option>
                      <option value={UserRole.GCD}>GCD Staff / Public Agency</option>
                      <option value={UserRole.Other}>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="challenge" className={labelClasses}>What is your biggest compliance challenge?</label>
                    <textarea
                      id="challenge"
                      name="challenge"
                      rows={3}
                      placeholder="e.g. Tracking permit renewals across multiple districts..."
                      value={formData.challenge}
                      onChange={handleChange}
                      className={`${inputClasses} resize-none`}
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-full text-lg py-4 shadow-lg shadow-brand-primary/20 dark:shadow-none"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? 'Sending Request...' : 'Request Access'}
                    </Button>
                    <p className="text-center text-xs text-brand-text/50 dark:text-slate-500 mt-4">
                      By clicking Request Access, you agree to our Privacy Policy.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};