import { FC, useRef } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FooterButton from './Buttons/FooterButton';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  id: string;
}

const DeleteModal: FC<DeleteModalProps> = ({
  isOpen,
  id,
  onClose,
  onDelete,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return isOpen
    ? ReactDOM.createPortal(
        <ModalOverlay ref={modalRef} onClick={handleClickOutside}>
          <ModalContainer>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalContent>
              Are you sure you want to delete invoice #${id} This action cannot
              be undone.
            </ModalContent>
            <ButtonWrapper>
              <FooterButton
                bgColor='#F9FAFE'
                color='#7E88C3'
                onClick={onClose}
                title='Cancel'
                padding='18px 24px 15px 24px'
              />
              <FooterButton
                bgColor='#EC5757'
                color='#F9FAFE'
                onClick={onDelete}
                title='Delete'
                padding='18px 25px 15px 24px'
              />
            </ButtonWrapper>
          </ModalContainer>
        </ModalOverlay>,
        document.body
      )
    : null;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.invoiceCardBG};
  padding: 32px 34px;
  width: 327px;

  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;
  z-index: 101;
`;

const ModalHeader = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 133% */

  letter-spacing: -0.5px;

  /* 08 */

  color: ${({ theme }) => theme.colors.primary};
`;

const ModalContent = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
  /* or 169% */

  letter-spacing: -0.1px;

  /* 06 */

  color: ${({ theme }) => theme.colors.secondary};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export default DeleteModal;
