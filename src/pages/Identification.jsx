import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'components/@common/Button/styles';
import Input from 'components/@common/Input/styles';
import PageHeader from 'components/@common/PageHeader';

import { requestLogin } from 'api';
import { snackbar } from 'actions/snackbar';
import { COLORS } from 'styles/theme';
import { 비동기_요청, 알림_메시지 } from 'constants/';
import * as CommonStyled from 'components/@common/CommonStyle/styles';

const Identification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);

  const handleCheckUserPassword = async (e) => {
    e.preventDefault();
    const password = e.target.elements['input-password'].value;
    const response = await requestLogin(userId, password);

    if (response.status === 비동기_요청.SUCCESS) {
      navigate('/edit/userInfo');
      return;
    }

    dispatch(snackbar.pushMessageSnackbar(알림_메시지.잘못된_비밀번호));
  };

  return (
    <>
      <PageHeader color={COLORS.GRAY_300}>회원 정보 수정</PageHeader>
      <form style={{ width: '100%' }} onSubmit={handleCheckUserPassword}>
        <CommonStyled.FlexWrapper
          alignItems="center"
          justifyContent="space-between"
          margin="2rem 0"
        >
          <label html-for="input-password">비밀번호</label>
          <Input
            id="input-password"
            type="password"
            width="80%"
            placeholder="비밀번호를 입력해주세요"
            minLength={8}
            maxLength={20}
            margin="0.5rem 0"
            border={`1px solid ${COLORS.GRAY_400}`}
          />
        </CommonStyled.FlexWrapper>

        <Button margin="0.5rem 0" backgroundColor={COLORS.MINT_200} hoverColor={COLORS.MINT_100}>
          확인
        </Button>
      </form>
    </>
  );
};

export default Identification;
