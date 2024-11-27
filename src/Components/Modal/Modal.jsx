import PropTypes from "prop-types";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Box */}
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
        <h2 className="text-lg font-semibold mb-4">Modal Title</h2>
        <p className="text-gray-600 mb-6">
          This is a modal. You can add your content here.
        </p>
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition duration-150"
          onClick={onClose}
        >
          ✕
        </button>
        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={onClose}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
