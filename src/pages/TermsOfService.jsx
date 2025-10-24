import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const termsData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - Eleven Interior World",
    "description": "Terms of Service for Eleven Interior World. Please read these terms carefully before using our website and services.",
    "url": typeof window !== 'undefined' ? window.location.href : ''
  };

  return (
    <>
      <SEO
        title="Terms of Service - Eleven Interior World"
        description="Terms of Service for Eleven Interior World. Please read these terms carefully before using our website and services."
        keywords="terms of service, terms and conditions, user agreement, interior design"
        ogTitle="Terms of Service - Eleven Interior World"
        ogDescription="Please read these terms carefully before using our website and services."
        ogUrl="/terms-of-service"
        canonical="/terms-of-service"
        structuredData={termsData}
      />
      <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-violet-50 to-indigo-50">
        {/* Navigation */}
        <NavBar />

        {/* Main Content */}
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                Terms of Service
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 border border-violet-100 hover:shadow-2xl transition-all duration-300">
              <div className="prose prose-lg max-w-none text-gray-700">
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Introduction</h2>
                  <p className="mb-4">
                    Welcome to Eleven Interior World ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website <Link to="/" className="text-violet-600 hover:text-violet-800 font-medium">eleveninteriorworld.com</Link> (the "Site") and services.
                  </p>
                  <p>
                    Please read these Terms carefully before accessing or using our Site. By accessing or using any part of the Site, you agree to be bound by these Terms. If you do not agree to all the terms and conditions of this agreement, then you may not access the Site or use any services.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Services</h2>
                  <p className="mb-4">
                    Eleven Interior World provides interior design services for residential and commercial spaces. Our services include but are not limited to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Design consultation</li>
                    <li>Space planning</li>
                    <li>Material selection</li>
                    <li>Project management</li>
                    <li>Furniture and décor recommendations</li>
                  </ul>
                  <p>
                    We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Intellectual Property</h2>
                  <p className="mb-4">
                    The Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Eleven Interior World, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                  </p>
                  <p>
                    These Terms permit you to use the Site for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Site without our prior written consent.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">User Responsibilities</h2>
                  <p className="mb-4">
                    As a user of our Site, you agree not to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Use the Site in any way that violates any applicable federal, state, local, or international law or regulation</li>
                    <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site</li>
                    <li>Use the Site in any manner that could disable, overburden, damage, or impair the Site</li>
                    <li>Attempt to gain unauthorized access to the Site, user accounts, computer systems, or networks</li>
                    <li>Use any robot, spider, or other automatic device to monitor or copy our content without our prior written consent</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Project Agreements</h2>
                  <p className="mb-4">
                    All design projects will be governed by a separate project agreement that specifies the scope of work, timeline, payment terms, and other project-specific details. These Terms of Service do not constitute a contract for design services.
                  </p>
                  <p>
                    We reserve the right to refuse service to anyone for any reason at any time.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Payment Terms</h2>
                  <p className="mb-4">
                    Payment terms for our services will be specified in the project agreement. Unless otherwise specified:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Deposits are non-refundable</li>
                    <li>Payments are due according to the schedule specified in the project agreement</li>
                    <li>Late payments may incur additional fees</li>
                    <li>We reserve the right to suspend work on a project for non-payment</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Disclaimer of Warranties</h2>
                  <p>
                    The Site is provided on an "as is" and "as available" basis. Eleven Interior World makes no warranties of any kind, whether express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Limitation of Liability</h2>
                  <p>
                    In no event shall Eleven Interior World, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the Site, any websites linked to it, any content on the Site or such other websites, including any direct, indirect, special, incidental, consequential, or punitive damages.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Indemnification</h2>
                  <p>
                    You agree to defend, indemnify, and hold harmless Eleven Interior World, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Site.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Governing Law</h2>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the State of West Bengal, India, without regard to its conflict of law provisions.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Changes to Terms</h2>
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Contact Information</h2>
                  <p className="mb-4">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="bg-gradient-to-r from-violet-50 to-indigo-50 p-6 rounded-2xl border border-violet-200">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <FiMapPin className="w-5 h-5 text-violet-600 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Eleven Interior World</p>
                          <p className="text-gray-700">96/C Chittaranjan Avenue</p>
                          <p className="text-gray-700">Kolkata, West Bengal 700012</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiMail className="w-5 h-5 text-violet-600 mr-3 flex-shrink-0" />
                        <a href="mailto:eleveninteriorworld@gmail.com" className="text-violet-600 hover:text-violet-800 font-medium">eleveninteriorworld@gmail.com</a>
                      </div>
                      <div className="flex items-center">
                        <FiPhone className="w-5 h-5 text-violet-600 mr-3 flex-shrink-0" />
                        <a href="tel:+917667974947" className="text-violet-600 hover:text-violet-800 font-medium">+91 76679 74947</a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default TermsOfService;