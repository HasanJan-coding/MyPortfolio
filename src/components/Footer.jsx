import React from 'react';
// Function to get the current year for the copyright notice
const getCurrentYear = () => new Date().getFullYear();

const Footer = () => {

  return (
     
        <div className='bg-black'>
            <footer 
            id='footer'
                className="relative border-t border-[color:var(--nav-border)] footer-gradient">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        
                        {/* */}
                        <div>
                            <h2 className="text-xl font-semibold text-[color:var(--accent)] mb-4">About Me</h2>
                            <p className="text-[#c9c5c5] leading-relaxed text-sm">
                                I’m <span className="font-medium">Hasan Ilyas</span>, a passionate Web Developer focused on creating 
                                modern, user-first digital experiences. My portfolio showcases projects where design 
                                meets performance, built with precision and creativity.
                            </p>
                        </div>

                        {/* */}
                        <div>
                            <h2 className="text-xl font-semibold text-[color:var(--accent)] mb-4">Abbonova</h2>
                            <p className="text-[#c9c5c5] leading-relaxed text-sm mb-3">
                                Abbonova is an innovative IT solutions company helping businesses 
                                with web, software, and digital transformation. We combine creativity 
                                and technology to deliver results that matter.
                            </p>
                            <a href="https://abbonova.com" className="inline-block text-sm font-medium text-[color:var(--accent)] hover:underline">
                                Learn more →
                            </a>
                        </div>

                        {/* */}
                        <div>
                            <h2 className="text-xl font-semibold text-[color:var(--accent)] mb-4">Quick Links</h2>
                            <ul className="space-y-2 text-sm text-[#c9c5c5]">
                                <li><a href="#projects" className="hover:text-[color:var(--btn)]">Projects</a></li>
                                <li><a href="#services" className="hover:text-[color:var(--btn)]">Services</a></li>
                                <li><a href="#contact" className="hover:text-[color:var(--btn)]">Contact</a></li>
                                <li><a href="#about" className="hover:text-[color:var(--btn)]">About</a></li>
                            </ul>
                        </div>

                        {/* */}
                        <div>
                            <h2 className="text-xl font-semibold text-[color:var(--accent)] mb-4">Contact Info</h2>
                            <p className="text-[#c9c5c5] text-sm mb-3">
                                Email : <a href="mailto:hassan.ilyas@abbonova.com" className="text-sm font-medium text-[color:var(--btn)] hover:underline"> hassan.ilyas@abbonova.com </a>
                            </p>
                            <p className="text-[#c9c5c5] text-sm mb-3">
                                WhatsApp : 03199929674 
                            </p>
                            <p className="text-[#c9c5c5] text-sm mb-3">
                                Location : Swabi, Pakistan
                            </p>

                          </div>
                    </div>

                    {/* */}
                    <div className="border-t border-[color:var(--nav-border)] mt-12 pt-8 text-center text-sm text-[#c9c5c5]">
                        {/* Display the current year */}
                        <p>© <span id="year">{getCurrentYear()}</span> Hasan Ilyas's Portfolio, All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;