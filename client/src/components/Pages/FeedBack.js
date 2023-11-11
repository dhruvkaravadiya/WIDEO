import { useState } from "react";
import { sendEmail } from "../../api/user";
import { toast } from "react-toastify";

export default function FeedbackPage() {
  const [feedbackDetails, setFeedbackDetails] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isCopyChecked, setIsCopyChecked] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackDetails({ ...feedbackDetails, [name]: value });
  };

  const handleCheckboxChange = () => {
    setIsCopyChecked(!isCopyChecked);
  };

  const validateForm = () => {
    const errors = {};

    if (!feedbackDetails.name.trim()) {
      errors.name = "Name is required";
    }

    if (!feedbackDetails.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(feedbackDetails.email)) {
      errors.email = "Invalid email address";
    }

    if (!feedbackDetails.message.trim()) {
      errors.message = "Message is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await sendEmail(feedbackDetails);
        setValidationErrors({});
        setFeedbackDetails({
          name: "",
          email: "",
          message: ""
        });
        toast.success("Feedback sent successfully");
      } catch (error) {
        console.error(error.message);
      }
    }
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
          <div>
            {/* Add noValidate to the form */}
            <form noValidate>
              <div className="mb-6">
                <label htmlFor="name" className="block mb-1 text-slate-400 font-semibold">Name</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="name"
                  name="name"
                  value={feedbackDetails.name}
                  className={`w-full text-white bg-[#222f46] px-3 py-2 rounded focus:bg-gray-600 focus:outline-none ${validationErrors.name ? 'border-red-500' : ''
                    }`}
                  placeholder="Your name"
                  required
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-1 text-slate-400 font-semibold">Email address</label>
                <input
                  onChange={handleInputChange}
                  type="email"
                  id="email"
                  name="email"
                  value={feedbackDetails.email}
                  className={`w-full text-white bg-[#222f46] px-3 py-2 rounded focus:bg-gray-600 focus:outline-none ${validationErrors.email ? 'border-red-500' : ''
                    }`}
                  placeholder="Your email"
                  required
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block mb-1 text-slate-400 font-semibold">Message</label>
                <textarea
                  onChange={handleInputChange}
                  id="message"
                  name="message"
                  value={feedbackDetails.message}
                  rows="3"
                  // Remove required attribute
                  className={`w-full text-white bg-[#222f46] px-3 py-2 rounded focus:bg-gray-600 focus:outline-none ${validationErrors.message ? 'border-red-500' : ''
                    }`}
                  placeholder="Your message"
                ></textarea>
                {validationErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="htmlForm-checkbox h-4 w-4 text-primary"
                    checked={isCopyChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2  text-slate-400">Send me a copy of this message</span>
                </label>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-700 text-white py-2 px-6 rounded shadow-md transition duration-300 ease-in-out hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
