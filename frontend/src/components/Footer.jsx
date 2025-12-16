import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🐾</span>
                            <span className="text-2xl font-bold gradient-text">Powow</span>
                        </Link>
                        <p className="text-gray-500 mb-6">
                            Connecting loving families with pets in need of a forever home.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <div className="w-10 h-10 rounded-full bg-[#8D6E63]/10 flex items-center justify-center text-[#8D6E63] hover:bg-[#8D6E63]/20 transition-colors cursor-pointer">
                                <i className="fab fa-facebook-f"></i>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#8D6E63]/10 flex items-center justify-center text-[#8D6E63] hover:bg-[#8D6E63]/20 transition-colors cursor-pointer">
                                <i className="fab fa-twitter"></i>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#8D6E63]/10 flex items-center justify-center text-[#8D6E63] hover:bg-[#8D6E63]/20 transition-colors cursor-pointer">
                                <i className="fab fa-instagram"></i>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/pets" className="text-gray-500 hover:text-[#8D6E63] transition-colors">Browse Pets</Link></li>
                            <li><Link to="/quiz" className="text-gray-500 hover:text-[#8D6E63] transition-colors">Match Quiz</Link></li>
                            <li><Link to="/vets" className="text-gray-500 hover:text-[#8D6E63] transition-colors">Vet Directory</Link></li>
                            <li><Link to="/about" className="text-gray-500 hover:text-[#8D6E63] transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li><Link to="/adoption-guide" className="text-gray-500 hover:text-[#8D6E63] transition-colors">Adoption Guide</Link></li>
                            <li><Link to="/pet-care" className="text-gray-500 hover:text-[#8D6E63] transition-colors">Pet Care Tips</Link></li>
                            <li><Link to="/success-stories" className="text-gray-500 hover:text-[#8D6E63] transition-colors">Success Stories</Link></li>
                            <li><Link to="/faq" className="text-gray-500 hover:text-[#8D6E63] transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="text-gray-500">hello@powow.com</li>
                            <li className="text-gray-500">+1 (555) 123-4567</li>
                            <li className="text-gray-500">123 Puppy Lane, Dogville</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Powow. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <Link to="/privacy" className="hover:text-[#8D6E63] transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-[#8D6E63] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
