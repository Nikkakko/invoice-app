import { FC, useEffect } from 'react';
import styled from 'styled-components';
import FooterButton from '../Buttons/FooterButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  saveAsDraft,
  saveInvoice,
  setisEditing,
  updateStatus,
} from '../../features/invoiceSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';

interface DetailFooterProps {
  onSubmit?: () => void;
  handleDraft?: () => void;
}

const DetailFooter: FC<DetailFooterProps> = ({ onSubmit, handleDraft }) => {
  const { isDarkMode } = useAppSelector(state => state.theme);
  const { isEditing } = useAppSelector(state => state.invoice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2];

  const editBgColor = isDarkMode ? '#252945' : '#F9FAFE';
  const editColor = isDarkMode ? '#DFE3FA' : '#7E88C3';

  console.log(isEditing);

  const handleNavigate = (id: string) => {
    if (isEditing) {
      navigate(`/invoice/${id}`);
    } else {
      navigate(`/invoice/${id}/edit`);
      dispatch(setisEditing(true));
    }
    // navigate to edit page with the current invoice ID
  };
  const handleSaveOrPaid = () => {
    if (isEditing && onSubmit) {
      onSubmit();
    }

    if (!isEditing && currentPath !== 'new') {
      handleStatusUpdate();
      navigate('/');
    }

    if (currentPath === 'new' && onSubmit) {
      onSubmit();
    }
  };

  const handleDeleteAndDraft = () => {
    if (currentPath === 'new') {
      handleDraft && handleDraft();
      navigate('/');
    } else {
      return 'delete';
    }
  };

  function handleStatusUpdate() {
    dispatch(updateStatus({ id }));
  }

  const bgColor = currentPath === 'new' ? '#373B53' : '#EC5757';
  const color = currentPath === 'new' && isDarkMode ? '#DFE3FA' : '#888EB0';

  useEffect(() => {
    if (currentPath === 'new' || currentPath !== 'edit') {
      dispatch(setisEditing(false));
    } else {
      dispatch(setisEditing(true));
    }
  }, []);

  return (
    <Container>
      <FooterButton
        title={
          !isEditing ? 'Edit' : currentPath === 'new' ? 'Discard' : 'Cancel'
        }
        bgColor={editBgColor}
        color={editColor}
        padding={isEditing ? '18px 23px 15px 24px' : '18px 19px 15px 18px'}
        onClick={() => handleNavigate(id as string)}
      />
      {!isEditing && (
        <FooterButton
          title={currentPath === 'new' ? 'Save as Draft' : 'Delete'}
          bgColor={bgColor}
          color={currentPath === 'new' ? color : '#ffffff'}
          padding={
            currentPath === 'new'
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
            : currentPath === 'new'
            ? 'Save & Send'
            : 'Mark as Paid'
        }
        bgColor='#7C5DFA'
        color='#ffffff'
        padding={
          currentPath === 'new' ? '18px 15px 15px 16px' : '18px 28px 15px 27px'
        }
        onClick={handleSaveOrPaid}
      />
    </Container>
  );
};

const Container = styled.div`
  background: ${({ theme }) => theme.colors.invoiceCardBG};
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  padding: 21px 24px;

  position: absolute;

  // bottom of the page
  bottom: -41px;
  left: 0;
  right: 0;

  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export default DetailFooter;
