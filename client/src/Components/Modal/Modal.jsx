import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Modal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/${path}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Box */}
      <div className="bg-white  text-black w-64 xsm:w-96 rounded-lg shadow-lg p-6 relative">
        {/* modal list item */}
        <div className="flex flex-col items-center justify-center">
          <ul className="my-1">
            <li className=" hover:text-gray-400 mb-1">
              <button onClick={() => handleNavigate("")} className="">
                Home
              </button>
            </li>
            <li className=" hover:text-gray-400 mb-1">
              <button onClick={() => handleNavigate("profile")}>Profile</button>
            </li>
            <li className=" hover:text-gray-400 mb-1">
              <button onClick={() => handleNavigate("setting")}>Setting</button>
            </li>
            <li className=" hover:text-gray-400 mb-1">
              <button onClick={() => handleNavigate("login")} className="">
                Log out
              </button>
            </li>
          </ul>
        </div>
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
