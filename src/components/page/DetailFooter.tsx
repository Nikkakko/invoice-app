import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import FooterButton from '../Buttons/FooterButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteInvoice,
  setisEditing,
  updateStatus,
  setisEditSidebarOpen,
  toggleEditSidebar,
} from '../../features/invoiceSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DeleteModal from '../DeleteModal';
import { device } from '../../styles/mediaQureis';

interface DetailFooterProps {
  onSubmit?: () => void;
  handleDraft?: () => void;
  isSidebar?: boolean;
  newInvoice?: boolean;
}

const DetailFooter: FC<DetailFooterProps> = ({
  onSubmit,
  handleDraft,
  isSidebar,
  newInvoice,
}) => {
  const { isDarkMode } = useAppSelector(state => state.theme);
  const { isEditing, isEditSidebarOpen } = useAppSelector(
    state => state.invoice
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2];
  const currentPathID = currentPath === id;

  const editBgColor = isDarkMode ? '#252945' : '#F9FAFE';
  const editColor = isDarkMode ? '#DFE3FA' : '#7E88C3';

  const handleNavigate = (id: string) => {
    if (currentPathID && !isEditing) {
      navigate(`/invoice/${id}/edit`);
    } else if (currentPath === 'new' || newInvoice) {
      navigate(`/`);
    } else if (isEditing) {
      navigate(`/invoice/${id}`);
    }
  };

  function handleSidebarOpen() {
    dispatch(toggleEditSidebar());
    dispatch(setisEditing(false));
  }

  const handleSaveOrPaid = () => {
    if (isEditing && onSubmit) {
      onSubmit();
    }

    if ((!isEditing && currentPath !== 'new') || newInvoice) {
      handleStatusUpdate();
    }

    if (currentPath === 'new' || (newInvoice && onSubmit)) {
      onSubmit && onSubmit();
    }
  };

  const handleDeleteAndDraft = () => {
    if (currentPath === 'new' || newInvoice) {
      handleDraft && handleDraft();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDelete = () => {
    dispatch(deleteInvoice({ id }));
    navigate('/');
  };

  function handleStatusUpdate() {
    dispatch(updateStatus({ id }));
  }

  const bgColor = currentPath === 'new' || newInvoice ? '#373B53' : '#EC5757';
  const color =
    currentPath === 'new' || (newInvoice && isDarkMode) ? '#DFE3FA' : '#888EB0';

  useEffect(() => {
    if (currentPath === 'new' || newInvoice || currentPathID) {
      dispatch(setisEditing(false));
    } else {
      dispatch(setisEditing(true));
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [isEditSidebarOpen]);

  return (
    <Container isSidebar={isSidebar}>
      <FooterButton
        title={
          !isEditing && !newInvoice && currentPath !== 'new'
            ? 'Edit'
            : currentPath === 'new' || newInvoice
            ? 'Discard'
            : 'Cancel'
        }
        bgColor={editBgColor}
        color={editColor}
        padding={isEditing ? '18px 23px 15px 24px' : '18px 19px 15px 18px'}
        onClick={
          isMobile ? () => handleNavigate(id as string) : handleSidebarOpen
        }
      />
      {!isEditing && (
        <FooterButton
          title={
            currentPath === 'new' || newInvoice ? 'Save as Draft' : 'Delete'
          }
          bgColor={bgColor}
          color={currentPath === 'new' || newInvoice ? color : '#ffffff'}
          padding={
            currentPath === 'new' || newInvoice
              ? '18px 13px 15px 16px'
              : '18px 25px 15px 24px'
          }
          onClick={handleDeleteAndDraft}
        />
      )}
      <FooterButton
        title={
          isEditing
            ? 'Save Changes'
            : currentPath === 'new' || newInvoice
            ? 'Save & Send'
            : 'Mark as Paid'
        }
        bgColor='#7C5DFA'
        color='#ffffff'
        padding={
          currentPath === 'new' || newInvoice
            ? '18px 15px 15px 16px'
            : '18px 28px 15px 27px'
        }
        onClick={handleSaveOrPaid}
      />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
        id={id as string}
      />
    </Container>
  );
};

const Container = styled.div<{
  isSidebar?: boolean;
}>`
  background: ${({ theme }) => theme.colors.invoiceCardBG};
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  padding: 21px 24px;
  position: ${({ isSidebar }) => (isSidebar ? 'fixed' : 'absolute')};

  // bottom of the page
  bottom: ${({ isSidebar }) => (isSidebar ? '0' : '-41px')};
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  max-width: 583px;

  @media ${device.tablet} {
    border-radius: 0px 20px 20px 0px;
  }

  @media ${device.laptopL} {
    padding: 21px 50px;
    left: 100px;
    max-width: 616px;
  }
`;

export default DetailFooter;
