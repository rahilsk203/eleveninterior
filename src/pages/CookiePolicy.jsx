import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cookieData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy - Eleven Interior World",
    "description": "Cookie Policy for Eleven Interior World. Learn how we use cookies and tracking technologies on our website.",
    "url": typeof window !== 'undefined' ? window.location.href : ''
  };

  return (
    <>
      <SEO
        title="Cookie Policy - Eleven Interior World"
        description="Cookie Policy for Eleven Interior World. Learn how we use cookies and tracking technologies on our website."
        keywords="cookie policy, cookies, tracking, privacy, interior design"
        ogTitle="Cookie Policy - Eleven Interior World"
        ogDescription="Learn how we use cookies and tracking technologies on our website."
        ogUrl="/cookie-policy"
        canonical="/cookie-policy"
        structuredData={cookieData}
      />
      <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-violet-50 to-indigo-50">
        {/* Navigation */}
        <NavBar />

        {/* Main Content */}
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                Cookie Policy
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
                    This Cookie Policy explains how Eleven Interior World ("we," "our," or "us") uses cookies and similar technologies to recognize you when you visit our website <Link to="/" className="text-violet-600 hover:text-violet-800 font-medium">eleveninteriorworld.com</Link> (the "Site"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                  </p>
                  <p>
                    In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">What Are Cookies?</h2>
                  <p className="mb-4">
                    Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                  </p>
                  <p>
                    Cookies set by the website owner (in this case, Eleven Interior World) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Why Do We Use Cookies?</h2>
                  <p className="mb-4">
                    We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Site to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Site. Third parties serve cookies through our Site for advertising, analytics, and other purposes.
                  </p>
                  <p>
                    The specific types of first and third-party cookies served through our Site and the purposes they perform are described below.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">How Do We Use Cookies?</h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Essential Website Cookies</h3>
                  <p className="mb-4">
                    These cookies are strictly necessary to provide you with services available through our Site and to use some of its features.
                  </p>
                  <div className="bg-gradient-to-r from-violet-50 to-indigo-50 p-4 rounded-xl border border-violet-200 mb-4">
                    <p className="font-semibold">Purpose:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Authenticate users and prevent fraudulent use of user accounts</li>
                      <li>Remember information that the user has entered into forms</li>
                      <li>Maintain user sessions</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance and Functionality Cookies</h3>
                  <p className="mb-4">
                    These cookies are used to enhance the performance and functionality of our Site but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
                  </p>
                  <div className="bg-gradient-to-r from-violet-50 to-indigo-50 p-4 rounded-xl border border-violet-200 mb-4">
                    <p className="font-semibold">Purpose:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Remember choices you make (such as your language preference)</li>
                      <li>Provide enhanced, personalized features</li>
                      <li>Remember the state of collapsed/expanded sections</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Analytics and Customization Cookies</h3>
                  <p className="mb-4">
                    These cookies collect information that is used either in aggregate form to help us understand how our Site is being used or how effective our marketing campaigns are, or to help us customize our Site for you.
                  </p>
                  <div className="bg-gradient-to-r from-violet-50 to-indigo-50 p-4 rounded-xl border border-violet-200 mb-4">
                    <p className="font-semibold">Purpose:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Understand and analyze how visitors use our Site</li>
                      <li>Measure the performance of our Site</li>
                      <li>Track user interactions with the Site</li>
                      <li>Identify which pages are visited most frequently</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Advertising Cookies</h3>
                  <p>
                    These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">How Often Will You Update This Cookie Policy?</h2>
                  <p>
                    We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                  </p>
                  <p className="mt-4">
                    The date at the top of this Cookie Policy indicates when it was last updated.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">Where Can I Get Further Information?</h2>
                  <p className="mb-4">
                    If you have any questions about our use of cookies or other technologies, please contact us at:
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

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-violet-200">How Can I Control Cookies?</h2>
                  <p className="mb-4">
                    You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Site though your access to some functionality and areas of our Site may be restricted.
                  </p>
                  <p className="mb-4">
                    You can usually activate or deactivate cookies by:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Adjusting your browser settings (usually found in "Help," "Tools," or "Edit" menus)</li>
                    <li>Visiting the "Tools" or "Preferences" menu in your browser</li>
                    <li>Using your browser's "Do Not Track" feature</li>
                  </ul>
                  <p>
                    For more information about how to manage cookies, including how to delete cookies that have already been placed on your device, please visit <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-800 font-medium">www.allaboutcookies.org</a>.
                  </p>
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

export default CookiePolicy;