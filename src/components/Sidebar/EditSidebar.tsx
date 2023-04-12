import { FC, useRef } from 'react';
import { InvoiceEdit } from '../../pages';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setisEditSidebarOpen,
  setisEditing,
} from '../../features/invoiceSlice';
import DetailFooter from '../page/DetailFooter';

interface EditSidebarProps {
  newInvoice?: boolean;
}

const EditSidebar: FC<EditSidebarProps> = ({ newInvoice }) => {
  const { isEditSidebarOpen } = useAppSelector(state => state.invoice);
  const dispatch = useAppDispatch();

  if (!isEditSidebarOpen) return null;

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
    if (e.target === modalRef.current) {
      dispatch(setisEditSidebarOpen(false));
      dispatch(setisEditing(false));
    }
  };

  return ReactDOM.createPortal(
    <Overlay ref={modalRef} onClick={handleClickOutside}>
      <Container>
        <InvoiceEdit isSidebar newInvoice={newInvoice} />
      </Container>
    </Overlay>,
    document.getElementById('edit-modal') as Element
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  padding: 59px 56px;

  // scroll through content
  overflow-y: scroll;
  // if scroll leaves content, add padding to bottom
  padding-bottom: 100px;
  height: 100vh;
  min-height: 100vh;

  &::-webkit-scrollbar {
    width: 8px;

    &-thumb {
      background: #dfe3fa;
      border-radius: 4px;
      height: 104px;
    }
  }

  background: ${({ theme }) => theme.colors.background};
  border-radius: 0px 20px 20px 0px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

export default EditSidebar;
