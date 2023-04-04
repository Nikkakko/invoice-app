import { FC } from 'react';
import styled from 'styled-components';
import FooterButton from '../Buttons/FooterButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setisEditing } from '../../features/invoiceSlice';
import { useNavigate, useParams } from 'react-router-dom';

interface DetailFooterProps {}

const DetailFooter: FC<DetailFooterProps> = ({}) => {
  const { isDarkMode } = useAppSelector(state => state.theme);
  const { isEditing } = useAppSelector(state => state.invoice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const editBgColor = isDarkMode ? '#252945' : '#F9FAFE';
  const editColor = isDarkMode ? '#DFE3FA' : '#7E88C3';

  const handleNavigate = (id: string) => {
    // navigate to edit page with the current invoice ID
    navigate(`/invoice/${id}/edit`);
    dispatch(setisEditing(true));
  };

  return (
    <Container>
      <FooterButton
        title={!isEditing ? 'Edit' : 'Cancel'}
        bgColor={editBgColor}
        color={editColor}
        padding='18px 23px 15px 24px'
        onClick={() => handleNavigate(id as string)}
      />
      {!isEditing && (
        <FooterButton
          title='Delete'
          bgColor='#EC5757'
          color='#ffffff'
          padding='18px 25px 15px 24px'
        />
      )}
      <FooterButton
        title={isEditing ? 'Save Changes' : 'Mark as Paid'}
        bgColor='#7C5DFA'
        color='#ffffff'
        padding='18px 28px 15px 27px'
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
