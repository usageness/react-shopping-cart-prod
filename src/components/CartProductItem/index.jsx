import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import IconButton from 'components/@common/IconButton';
import CheckBox from 'components/@common/CheckBox';
import Counter from 'components/@common/Counter';

import { deleteCartItem } from 'actions/cart';

import noImage from 'assets/no_image.png';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import { 아이콘_코드 } from 'constants/';
import * as Styled from './styles';

const CartProducItem = ({
  id,
  thumbnail,
  name,
  price,
  quantity,
  isChecked,
  handleChecked,
  handleItemQuantity,
}) => {
  const dispatch = useDispatch();
  const onClickDeleteButton = () => {
    if (isChecked(id)) {
      handleChecked(id);
    }

    dispatch(deleteCartItem([id], name));
  };

  return (
    <>
      <CommonStyled.Container width="100%" margin="0">
        <CheckBox checkState={isChecked(id)} handleChecked={() => handleChecked(id)} />
        <Styled.ImageWrapper>
          <img src={thumbnail} alt="product thumbnail" />
        </Styled.ImageWrapper>
        <CommonStyled.Container
          width="100%"
          height="100px"
          justifyContent="flex-end"
          alignItems="flex-end"
          flexDirection="column"
          margin="0"
          padding="0 1rem"
        >
          <CommonStyled.Container width="100%" margin="0" justifyContent="space-between">
            <Styled.Title>{name}</Styled.Title>
            <IconButton onClick={onClickDeleteButton} icon={아이콘_코드.DELETE} />
          </CommonStyled.Container>
          <CommonStyled.FlexWrapper margin="0" width="120px" justifyContent="flex-end">
            <Counter id={id} quantity={quantity} handleItemQuantity={handleItemQuantity()} />
          </CommonStyled.FlexWrapper>
          <Styled.Container margin="0" width="100%" justifyContent="flex-end">
            <CommonStyled.Text padding="0.5rem 0">
              {price.toLocaleString('ko-KR')}원
            </CommonStyled.Text>
          </Styled.Container>
        </CommonStyled.Container>
      </CommonStyled.Container>
      <CommonStyled.HR size="1px" />
    </>
  );
};

CartProducItem.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  isChecked: PropTypes.func,
  handleChecked: PropTypes.func,
  handleItemQuantity: PropTypes.func,
};

CartProducItem.defaultProps = {
  thumbnail: noImage,
  name: '이름이 지정되지 않았습니다.',
  price: -1,
  quantity: 1,
  isChecked: () => true,
  handleChecked: () => {},
  handleItemQuantity: () => {},
};

export default CartProducItem;
