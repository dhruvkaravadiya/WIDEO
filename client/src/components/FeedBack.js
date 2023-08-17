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
    <div className="p-4 mt-14">
      <h2 className="text-2xl font-semibold mb-4">Feedback Page</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Your Feedback:</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg resize-none"
          rows="5"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Please enter your feedback here..."
        ></textarea>
        <button
          type="submit"
          className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
