import { 숫자 } from 'constants/';
import PropTypes from 'prop-types';
import Input from 'components/@common/Input/styles';
import { COLORS } from 'styles/theme';
import Button from '../Button/styles';
import * as CommonStyle from '../CommonStyle/styles';

const isValidOrder = (value) => value > 숫자.최대_주문수량 || value < 숫자.최소_주문수량;

const Counter = ({ id, quantity, handleItemQuantity }) => {
  const onClickButton = (amount) => {
    const totalAmount = quantity + amount;
    if (isValidOrder(totalAmount)) {
      return;
    }

    handleItemQuantity(id, totalAmount);
  };

  const onInputCounter = (e) => {
    const inputNumber = Number(e.target.value);

    if (isValidOrder(inputNumber)) {
      return;
    }

    handleItemQuantity(id, inputNumber);
  };

  return (
    <CommonStyle.FlexWrapper>
      <Input
        width="80px"
        height="40px"
        type="number"
        size="1.2rem"
        textAlign="center"
        border={`1px solid ${COLORS.GRAY_500}`}
        margin="0"
        value={quantity}
        onChange={(e) => onInputCounter(e)}
      />
      <CommonStyle.FlexWrapper
        flexDirection="column"
        width="30%"
        margin="0"
        alignItems="flex-start"
      >
        <Button
          onClick={() => onClickButton(1)}
          width="40px"
          height="20px"
          margin="0"
          size="0.5rem"
        >
          ▲
        </Button>
        <Button
          onClick={() => onClickButton(-1)}
          width="40px"
          height="20px"
          margin="0"
          size="0.5rem"
        >
          ▼
        </Button>
      </CommonStyle.FlexWrapper>
    </CommonStyle.FlexWrapper>
  );
};

Counter.propTypes = {
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number,
  handleItemQuantity: PropTypes.func,
};

Counter.defaultProps = {
  quantity: 1,
  handleItemQuantity: () => {},
};

export default Counter;
