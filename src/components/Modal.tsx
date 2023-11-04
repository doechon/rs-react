import React, { Dispatch, ReactNode } from 'react';
import './Modal.css';
import { useNavigate } from 'react-router-dom';
const Modal = ({
  active,
  setActive,
  children,
}: {
  active: boolean;
  setActive: Dispatch<boolean>;
  children?: ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`modal ${active ? 'active' : ''}`}
      onClick={() => {
        setActive(false);
        navigate('/');
      }}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
