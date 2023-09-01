import React, { useState } from 'react';
import Modal from 'react-modal';
import { RiVideoAddFill } from 'react-icons/ri';

// Styling for the modal
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    maxHeight: '80%',
    overflow: 'auto',
    padding: '20px',
    backgroundColor: '#02142e',
    border: 'none',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)', // Whitish box shadow
  },
};

const NewVideo = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button className="p-2 hover:bg-gray-700 mx-2" onClick={openModal}>
        <RiVideoAddFill className="text-white h-5 w-5" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="New Video Form"
      >
        <form className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Upload Video</h2>
          <div className="bg-white text-black rounded-lg p-4">
            <div className="mb-2">
              <label htmlFor="title" className="block text-sm font-medium text-black">
                Video Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="mt-1 p-2 bg-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
                placeholder="Enter video title"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="description" className="block text-sm font-medium text-black">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                className="mt-1 p-2 bg-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md h-20"
                placeholder="Enter video description"
              ></textarea>
            </div>
            <div className="mb-2">
              <label htmlFor="videoFile" className="block text-sm font-medium text-black">
                Video File
              </label>
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                className="mt-1 p-2 bg-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              onClick={closeModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Upload
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 ml-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NewVideo;
