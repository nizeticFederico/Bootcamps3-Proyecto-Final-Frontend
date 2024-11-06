
const NewsletterBanner = () => {
    return (
      <div className="bg-yellow-300 py-16 px-4 flex flex-col items-center text-center md:flex-row md:justify-center md:items-center gap-20">
        <div className="md:text-left ">
          <h2 className="text-3xl font-bold mb-3">Subscribe to our Newsletter</h2>
          <p className="text-gray-700 mt-2 font-regular leading-relaxed">
            Receive our weekly newsletter & updates with new events from your favorite organizers & venues.
          </p>
        </div>
        <div className="flex items-center mt-1">
          <input
            type="email"
            placeholder="Enter your e-mail address"
            className="p-3 w-64 rounded-l-md border border-gray-300 focus:outline-none"
          />
          <button className="bg-indigo-900 text-white px-6 py-3 rounded-r-md font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    );
  };
  
  export default NewsletterBanner;
  


