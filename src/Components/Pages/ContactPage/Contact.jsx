import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="font-sans bg-white">
      {/* Hero Section */}
      {/* Hero Section */}
<section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
  <div className="absolute inset-0 mt-16">
    <img 
      src="/contactBanner.jpg" 
      alt="Contact Banner"
      className="w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-black/20"></div>
  </div>
  
  {/* <div className="relative text-center px-4 space-y-4 z-10">
    <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
        Connect With Us
      </span>
    </h1>
    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto tracking-wide">
      Let's Start a Conversation About Your Business Needs
    </p>
  </div> */}
</section>

      {/* Contact Information */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: FaPhone, 
                title: "Phone Support",
                content: "+880 1818697777",
                subtitle: "24/7 Available Support"
              },
              { 
                icon: FaEnvelope, 
                title: "Email Us",
                content: "infosamadhangroupbd@gmail.com",
                subtitle: "Official Business Inquiry"
              },
              { 
                icon: FaMapMarkerAlt, 
                title: "Visit Office",
                content: "119-120 Adamjee Court Annex -2, Motijheel 1000, Dhaka",
                subtitle: "Bangladesh Headquarters"
              },
            ].map((item, index) => (
              <div key={index} className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="text-3xl text-blue-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-blue-900 text-lg font-semibold mb-2">{item.content}</p>
                <p className="text-gray-600 text-sm">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="mb-12">
                <span className="text-blue-600 font-semibold tracking-wide">GET IN TOUCH</span>
                <h2 className="text-4xl font-bold text-gray-900 mt-4">Send Us a Message</h2>
              </div>
              
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border bg-gray-100 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border bg-gray-100 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border bg-gray-100 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Business Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">Message</label>
                  <textarea 
                    rows="6"
                    className="w-full px-4 py-3 border bg-gray-100 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button className="px-8 py-4 bg-blue-900 text-white rounded-full font-semibold hover:bg-blue-800 transition-all duration-300 flex items-center gap-4">
                  <FaPaperPlane className="text-xl" />
                  Send Message
                </button>
              </form>
            </div>

            <div className="relative group hidden md:block">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-blue-50 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-all duration-300"></div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                alt="Contact"
                className="relative rounded-3xl transform group-hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[600px] bg-gray-100">
        <iframe
          title="Company Location"
          className="w-full h-full border-none"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.483888130707!2d90.41320137432531!3d23.72846478962002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b859b839b371%3A0xc5b61ffaaa4672e2!2sPrime%20Bank%20Ltd%2C%20Head%20Office!5e1!3m2!1sen!2sbd!4v1741416773925!5m2!1sen!2sbd"
          allowFullScreen
          loading="lazy"
        ></iframe>
       
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-700/20"></div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto font-light">
            Schedule a consultation with our experts today
          </p>
          <div className="flex justify-center gap-6">
            <button className="px-8 py-4 bg-white text-blue-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Book Meeting
            </button>
            <button className="px-8 py-4 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300">
              Career Opportunities
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;