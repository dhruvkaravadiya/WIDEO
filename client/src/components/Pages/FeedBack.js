import { useState } from "react";
export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle submitting the feedback here (e.g., sending it to a server).
    console.log("Feedback submitted:", feedback);
    // Reset the feedback field after submitting
    setFeedback("");
  };

  return (
    <div className="container mx-auto p-5 mt-14">
  <div className="flex justify-center">
    <div className="text-center max-w-xl">
      <h2 className="my-10 text-5xl font-bold font-archivo text-white">Send Feedback</h2>
    </div>
  </div>

  <div className="flex items-center justify-center">
    <div className="mb-12 w-full lg:w-5/12">
      <form>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-1 text-slate-400 font-semibold">Name</label>
          <input type="text" id="name" name="name" className="w-full text-white bg-[#222f46] px-3 py-2 rounded focus:bg-gray-600 focus:outline-none" placeholder="Your name" />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-1 text-slate-400 font-semibold">Email address</label>
          <input type="email" id="email" name="email" className="w-full text-white bg-[#222f46] px-3 py-2 rounded focus:bg-gray-600 focus:outline-none" placeholder="Your email" />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block mb-1 text-slate-400 font-semibold">Message</label>
          <textarea id="message" name="message" rows="3" className="w-full text-white bg-[#222f46] px-3 py-2 rounded focus:bg-gray-600 focus:outline-none" placeholder="Your message"></textarea>
        </div>
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input type="checkbox" className="htmlForm-checkbox h-4 w-4 text-primary"  />
            <span className="ml-2  text-slate-400">Send me a copy of this message</span>
          </label>
        </div>
        <button type="button" className="w-full bg-blue-700 text-white py-2 px-6 rounded shadow-md transition duration-300 ease-in-out hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary">
          Send
        </button>
      </form>
    </div>
    
  </div>
</div>

  );
}
