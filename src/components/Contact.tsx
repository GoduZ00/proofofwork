import React, { useState } from 'react';
import { Send, Terminal } from 'lucide-react';

export const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('New message from portfolio');
    const body = encodeURIComponent(`From: ${email}\n\n${message}`);

    window.location.href = `mailto:ovvoterminal@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-ink/10">
      <div className="flex items-center gap-4 mb-12">
        <Terminal size={20} />
        <h2 className="text-2xl font-bold uppercase tracking-tight">Contact</h2>
        <div className="h-px flex-1 bg-ink/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-4xl font-bold mb-6 tracking-tighter uppercase">Get in touch</h3>
          <p className="opacity-70 mb-8 leading-relaxed">
            Interested in collaboration or have questions about my work? 
            Drop a message and I'll get back to you within 24 hours.
          </p>
          
          <div className="space-y-4 text-sm font-mono uppercase tracking-widest">
            <div className="flex items-center gap-4">
              <span className="opacity-40">Email:</span>
              <a href="mailto:ovvoterminal@gmail.com" className="hover:underline">ovvoterminal@gmail.com</a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="group">
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 opacity-50 group-focus-within:opacity-100 transition-opacity">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-ink p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ink/5"
              placeholder="ovvoterminal@gmail.com"
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 opacity-50 group-focus-within:opacity-100 transition-opacity">Message</label>
            <textarea 
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white border border-ink p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ink/5 resize-none"
              placeholder="Your message here..."
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-ink text-paper font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {submitted ? "Message Sent" : "Send Message"}
            <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
};
