import React, { useState } from 'react';
import { Send, User, Mail, FileText, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);  // Vite env -_-

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSuccess, setIsSuccess] = useState(false);  // New state for success feedback

    const accentRgb = "212, 175, 55"; 
    
    

    // --- Input Styles ---
    const inputStyle = {
        backgroundColor: 'var(--bg)',
        border: '1px solid var(--border)',
        color: 'var(--text-primary)',
        transition: 'border-color 0.3s ease',
        padding: '1rem',
        borderRadius: '0.5rem',
        width: '100%',
    };

    const focusStyle = (e) => {
        e.currentTarget.style.borderColor = 'var(--accent)';
    };

    const blurStyle = (e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
    };

    // Dynamic button styles and text
    const buttonBgColor = isSuccess ? 'var(--accent-hover)' : 'var(--accent)';
    const buttonText = isSuccess ? 'Successfully Submitted' : 'Send Message';
    const buttonBorderColor = isSuccess ? 'var(--accent-hover)' : 'var(--accent)';

    return (
        <section 
            id="contact" 
            className="py-20 md:py-32" 
            style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}
            aria-labelledby="contact-heading"
        >
            <div className="max-w-4xl mx-auto px-6">
                
                {/* Header */}
                <header className="mb-12 md:mb-16 text-center">
                    <div className="flex items-center gap-3 mb-4 justify-center">
                        <div className="h-0.5 w-12" style={{ backgroundColor: 'var(--accent)' }} />
                        <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                            Get In Touch
                        </span>
                        <div className="h-0.5 w-12" style={{ backgroundColor: 'var(--accent)' }} />
                    </div>
                    <h2 
                        id="contact-heading" 
                        className="text-5xl md:text-6xl font-extrabold leading-tight"
                    >
                        Let's Talk 
                        <span 
                            style={{ 
                                color: 'var(--accent)', 
                                textShadow: `0 0 10px rgba(${accentRgb}, 0.6)` 
                            }}
                        >
                            .
                        </span>
                    </h2>
                    <p className="text-xl font-medium max-w-2xl mx-auto mt-4" style={{ color: 'var(--text-secondary)' }}>
                        I'm currently accepting new projects. Tell me about your needs!
                    </p>
                </header>
                
                {/* Contact Form */}
                <form 
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    style={{ 
                        backgroundColor: 'var(--bg-alt)', 
                        padding: '2rem', 
                        borderRadius: '1rem', 
                        border: '1px solid var(--border)',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
                    }}
                >
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                                <User className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                style={inputStyle}
                                onFocus={focusStyle}
                                onBlur={blurStyle}
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                                <Mail className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                style={inputStyle}
                                onFocus={focusStyle}
                                onBlur={blurStyle}
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    {/* Subject Field */}
                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                            <FileText className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                            Subject
                        </label>
                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={focusStyle}
                            onBlur={blurStyle}
                            placeholder="Project Inquiry / Collaboration"
                        />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                            <MessageSquare className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={focusStyle}
                            onBlur={blurStyle}
                            placeholder="Tell me more about your project goals and timeline..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSuccess}  // Optional: Disable during success state
                            className="w-full flex items-center justify-center gap-3 text-sm font-bold uppercase py-3 rounded-lg transition-all duration-300"
                            style={{
                                backgroundColor: buttonBgColor,
                                color: 'var(--bg)', // Text color set to black for high contrast
                                border: `1px solid ${buttonBorderColor}`,
                                boxShadow: `0 4px 15px rgba(${accentRgb}, 0.5)`,
                                opacity: isSuccess ? 0.8 : 1,  // Subtle dim on success
                            }}
                            // Use onMouseOver/Out for accent-hover effect (skip if success)
                            onMouseOver={(e) => {
                                if (!isSuccess) {
                                    e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                                    e.currentTarget.style.borderColor = 'var(--accent-hover)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isSuccess) {
                                    e.currentTarget.style.backgroundColor = 'var(--accent)';
                                    e.currentTarget.style.borderColor = 'var(--accent)';
                                }
                            }}
                        >
                            {buttonText}
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;