import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import GoBack from '../components/Buttons/GoBack';
import styled from 'styled-components';
import DetailFooter from '../components/page/DetailFooter';
import { ArrowLeft } from '../assets';
import { setisEditing } from '../features/invoiceSlice';
import { useAppDispatch } from '../app/hooks';

const DetailLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    // navigate back
    navigate(-1);

    // reset isEditing
    dispatch(setisEditing(false));
  };
  return (
    <Container>
      <GoBack title='Go Back' onClick={handleClick} icon={ArrowLeft} />
      <Main>
        <Outlet />
      </Main>
      <DetailFooter />
    </Container>
  );
};

const Container = styled.div``;

const Main = styled.main``;

export default DetailLayout;
