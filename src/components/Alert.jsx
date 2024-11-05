import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, type, visible, onClose }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!show) return null;

  const alertStyles = {
    success: 'bg-green-500 text-white',
    info: 'bg-blue-500 text-white',
    danger: 'bg-red-500 text-white',
  };

  return (
    <div
      className={`fixed z-50 p-4 rounded-md shadow-md transition-transform transform ${
        alertStyles[type]
      } ${show ? 'translate-y-0' : '-translate-y-full'} ${
        window.innerWidth < 640 ? 'top-4 left-1/2 transform -translate-x-1/2' : 'top-4 right-4'
      }`}
    >
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'info', 'danger']).isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert; 