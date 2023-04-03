import { FC } from 'react';
import styled from 'styled-components';
import { InvoiceType } from '../../types/dbTypes';
import {
  BodyTextVariant,
  SmallHeadingVariant,
} from '../../styles/globalStyles';
import { formatPrice } from '../../helpers/formatPrice';

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
    return acc + item.total;
  }, 0);

  return (
    <Container>
      <TotalWrapper>
        {invoice.map(item => (
          <>
            <BannerDesign>
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
          </>
        ))}
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
`;

const BannerDesign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin bottom only for first child
  &:not(:first-child) {
    margin-top: 24px;
  }
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

export default TotalCard;
