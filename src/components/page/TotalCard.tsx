import React, { FC } from 'react';
import styled from 'styled-components';
import { SmallHeadingVariant } from '../../styles/globalStyles';
import { formatPrice } from '../../helpers/formatPrice';
import { device } from '../../styles/mediaQureis';

type Props = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

interface TotalCardProps {
  invoice: Props[];
}

const TotalCard: FC<TotalCardProps> = ({ invoice }) => {
  const total = invoice.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const TableComponent = () => {
    return (
      <StyledTable>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td className='qty'>{item.quantity}</td>
              <td className='price'>{formatPrice(item.price)}</td>
              <td className='total'>{formatPrice(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    );
  };

  return (
    <Container>
      <TotalWrapper>
        <TabletHide>
          {invoice.map((item, idx) => (
            <BannerDesign key={idx}>
              <Banner>
                <SmallHeadingVariant>{item.name}</SmallHeadingVariant>

                <PriceText>
                  {item.quantity} x {formatPrice(item.price)}
                </PriceText>
              </Banner>
              <Price>
                <SmallHeadingVariant>
                  {formatPrice(item.total)}
                </SmallHeadingVariant>
              </Price>
            </BannerDesign>
          ))}
        </TabletHide>

        <TabletWrapper>
          <TableComponent />
        </TabletWrapper>
      </TotalWrapper>
      <GrandTotal>
        <TotalText>Grand Total</TotalText>
        <TotalPrice>{formatPrice(total)}</TotalPrice>
      </GrandTotal>
    </Container>
  );
};

const Container = styled.div``;

const TotalWrapper = styled.div`
  margin-top: 38px;
  background: ${({ theme }) => theme.colors.bannerBG};
  border-radius: 8px 8px 0px 0px;
  padding: 25px 24px;

  @media ${device.tablet} {
    margin-top: 47px;
    padding: 0px 32px 39px 32px;
  }
`;

const BannerDesign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin bottom only for first child

  &:not(:first-child) {
    margin-top: 24px;
  }

  @media ${device.tablet} {
    justify-content: flex-start;

    &:not(:first-child) {
      margin-top: 32px;
    }
  }
`;

const TabletWrapper = styled.div`
  display: none;

  @media ${device.tablet} {
    display: flex;
    width: 100%;
  }
`;

const TabletHide = styled.div`
  display: block;

  @media ${device.tablet} {
    display: none;
  }
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const Price = styled.div``;

const PriceText = styled(SmallHeadingVariant)`
  color: ${({ theme }) => theme.colors.secondary};
`;

const GrandTotal = styled.div`
  background: ${({ theme }) => theme.colors.totalBG};
  border-radius: 0px 0px 8px 8px;
  padding: 26px 24px 22px 24px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalText = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height, or 138% */

  letter-spacing: -0.1px;

  color: #ffffff;
`;

const TotalPrice = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 133% */

  text-align: right;
  letter-spacing: -0.5px;

  color: ${({ theme }) => theme.colors.white};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 32px;
  /* margin-top: 32px; */
  display: none;

  @media ${device.tablet} {
    display: table;
  }

  th {
    font-weight: bold;
    padding: 8px;
    text-align: left;
    color: ${({ theme }) => theme.colors.paragraph};
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    /* identical to box height, or 138% */

    letter-spacing: -0.1px;
  }

  th:nth-child(2),
  td:nth-child(2),
  th:nth-child(3),
  td:nth-child(3),
  th:nth-child(4),
  td:nth-child(4) {
    text-align: right;
  }

  td {
    padding: 8px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    font-size: 15px;
    line-height: 15px;
    /* identical to box height, or 100% */

    letter-spacing: -0.25px;
  }

  td,
  th {
    border: none;
  }

  td.qty,
  td.price {
    color: ${({ theme }) => theme.colors.paragraph};
  }

  td.qty,
  td.price,
  td.total {
    text-align: right;
  }
`;

const StyledTableHeader = styled.th`
  text-align: left;
`;

export default TotalCard;
