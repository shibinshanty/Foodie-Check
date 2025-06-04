



const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Got a question, feedback, or just want to say hello? We'd love to hear from you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Message</label>
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-yellow-300 mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-300 mb-4">
              📞 <span className="text-white font-medium">+91 00000000</span>
            </p>
            <p className="text-gray-300 mb-4">
              📧 <span className="text-white font-medium">contact@foodieapp.com</span>
            </p>
            <p className="text-gray-300">
              📍 <span className="text-white font-medium">123 Food Street, Kochi, Kerala</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
