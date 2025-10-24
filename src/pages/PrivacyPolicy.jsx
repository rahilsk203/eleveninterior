import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const privacyData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - Eleven Interior World",
    "description": "Privacy Policy for Eleven Interior World. Learn how we collect, use, and protect your personal information.",
    "url": typeof window !== 'undefined' ? window.location.href : ''
  };

  return (
    <>
      <SEO
        title="Privacy Policy - Eleven Interior World"
        description="Privacy Policy for Eleven Interior World. Learn how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, personal information, interior design"
        ogTitle="Privacy Policy - Eleven Interior World"
        ogDescription="Learn how we collect, use, and protect your personal information."
        ogUrl="/privacy-policy"
        canonical="/privacy-policy"
        structuredData={privacyData}
      />
      <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-violet-50 to-indigo-50">
        {/* Navigation */}
        <NavBar />

        {/* Main Content */}
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                Privacy Policy
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
                    Welcome to Eleven Interior World ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <Link to="/" className="text-violet-600 hover:text-violet-800 font-medium">eleveninteriorworld.com</Link> (the "Site") and use our services.
                  </p>
                  <p>
                    Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Information We Collect</h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information You Disclose to Us</h3>
                  <p className="mb-4">
                    We collect personal information that you voluntarily provide to us when you register on the site, express an interest in obtaining information about us or our products and services, participate in activities on the site, or otherwise contact us.
                  </p>
                  <p className="mb-4">
                    The personal information we collect may include:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Mailing address</li>
                    <li>Project details and preferences</li>
                    <li>Any other information you choose to provide</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Information Automatically Collected</h3>
                  <p className="mb-4">
                    We automatically collect certain information when you visit, use, or navigate the site. This information does not reveal your specific identity but may include:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>IP address and browser type</li>
                    <li>Internet service provider</li>
                    <li>Date and time stamp</li>
                    <li>Referring/exit pages</li>
                    <li>Clickstream data</li>
                    <li>Device information</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">How We Use Your Information</h2>
                  <p className="mb-4">
                    We use personal information collected via our site for a variety of business purposes described below:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>To provide and maintain our services</li>
                    <li>To improve, personalize, and expand our services</li>
                    <li>To understand and analyze how you use our site</li>
                    <li>To develop new products, services, features, and functionality</li>
                    <li>To communicate with you, either directly or through one of our partners</li>
                    <li>To send you updates and promotional information</li>
                    <li>To process your transactions and manage your orders</li>
                    <li>To prevent fraudulent transactions and monitor against theft</li>
                    <li>To comply with legal obligations and resolve disputes</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Sharing Your Information</h2>
                  <p className="mb-4">
                    We may share your information in the following situations:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                    <li><strong>Affiliates:</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy.</li>
                    <li><strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services or promotions.</li>
                    <li><strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Data Security</h2>
                  <p>
                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Your Privacy Rights</h2>
                  <p className="mb-4">
                    You have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Access:</strong> You have the right to request copies of your personal information.</li>
                    <li><strong>Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                    <li><strong>Erasure:</strong> You have the right to request that we erase your personal information, under certain conditions.</li>
                    <li><strong>Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal information, under certain conditions.</li>
                    <li><strong>Object to Processing:</strong> You have the right to object to our processing of your personal information, under certain conditions.</li>
                    <li><strong>Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                  </ul>
                  <p>
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Cookies and Tracking Technologies</h2>
                  <p>
                    We use cookies and similar tracking technologies to access or store information. For more information about how we use cookies and your choices regarding cookies, please see our Cookie Policy.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Third-Party Websites</h2>
                  <p>
                    The site may contain links to third-party websites. Please be aware that we are not responsible for the privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of each and every website that collects personally identifiable information.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Changes to This Privacy Policy</h2>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Contact Us</h2>
                  <p className="mb-4">
                    If you have questions or comments about this privacy policy, you may contact us at:
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

export default PrivacyPolicy;