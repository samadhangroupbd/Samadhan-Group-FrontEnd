import React from 'react';
import { FaBuilding, FaChartLine, FaHandshake, FaUsers, FaLightbulb, FaGlobe } from 'react-icons/fa';

const About_Us = () => {
  return (
    <div className="font-sans bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-95">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="relative text-center px-4 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
              Samadhan Group
            </span>
          </h1>
          <p className="text-xl md:text-3xl font-light max-w-4xl mx-auto tracking-wide">
            Redefining Industry Standards Through Innovation & Integrity
          </p>
          <div className="mt-8">
            <button className="px-12 py-4 bg-transparent border-2 border-white rounded-full text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300">
              Explore Our Legacy
            </button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-blue-50 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-all duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                alt="Our Team"
                className="relative rounded-3xl transform group-hover:scale-105 transition-all duration-300"
              />
            </div>
            <div className="space-y-8">

              <p className="text-lg text-gray-600 leading-relaxed">
                At Samadhan Group, we have spent nearly two decades mastering the principles of sustainable business growth. From our humble beginnings as a startup, we have evolved into a multinational conglomerate, driven by an unwavering commitment to quality, innovation, and operational excellence.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                  <div className="text-5xl font-bold text-blue-900 mb-2">11,000+</div>
                  <div className="text-gray-600 font-medium">Total Employees</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                  <div className="text-5xl font-bold text-blue-900 mb-2">18+</div>
                  <div className="text-gray-600 font-medium">Partnerships</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-semibold tracking-wide">OUR PHILOSOPHY</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">Foundations of Success</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: FaHandshake, title: "Ethical Governance", text: "Maintaining transparency in all operations" },
              { icon: FaChartLine, title: "Sustainable Growth", text: "Balancing progress with responsibility" },
              { icon: FaUsers, title: "Stakeholder Value", text: "Creating shared success for all partners" },
            ].map((item, index) => (
              <div key={index} className="group p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="text-3xl text-blue-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="relative py-32 px-4 md:px-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Pioneering Tomorrow's Solutions Today
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto font-light">
            Join our network of innovators and industry leaders shaping the future of global business
          </p>
          <div className="flex justify-center space-x-6">
            <button className="px-8 py-4 bg-white text-blue-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Partner With Us
            </button>
            <button className="px-8 py-4 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300">
              Explore Careers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About_Us;