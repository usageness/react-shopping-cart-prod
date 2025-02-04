import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useInput from 'hooks/useInput';

import PageHeader from 'components/@common/PageHeader';
import Button from 'components/@common/Button/styles';
import Input from 'components/@common/Input/styles';
import ErrorMessage from 'components/@common/ErrorMessage';

import { COLORS } from 'styles/theme';
import { requestEditUserInfo, requestWithDrawUser } from 'api';
import {
  editUserInfoFailure,
  editUserInfoSuccess,
  withDrawUserFailure,
  withDrawUserSuccess,
} from 'actions/user';
import { 비동기_요청, 알림_메시지 } from 'constants/';
import * as Validate from 'utils/validate';

const EditUserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);

  const {
    value: userNickName,
    setValue: setUserNickName,
    checkValue: checkUserNickName,
  } = useInput(Validate.userNickName);
  const {
    value: userAge,
    setValue: setUserAge,
    checkValue: checkUserAge,
  } = useInput(Validate.userAge);

  const isValidForm = checkUserAge && checkUserNickName;

  const handleEditUserInfo = async (e) => {
    e.preventDefault();
    const response = await requestEditUserInfo({
      username: userId,
      nickname: userNickName,
      age: userAge,
    });

    if (response.status === 비동기_요청.SUCCESS) {
      dispatch(editUserInfoSuccess()(navigate));
      return;
    }

    dispatch(editUserInfoFailure());
  };

  const handleWithDrawUser = async (e) => {
    e.preventDefault();
    const withDrawConfrim = confirm(알림_메시지.회원_탈퇴_확인);
    if (withDrawConfrim) {
      const response = await requestWithDrawUser();
      if (response.status === 비동기_요청.SUCCESS) {
        dispatch(withDrawUserSuccess()(navigate));
        return;
      }

      dispatch(withDrawUserFailure());
    }
  };

  return (
    <>
      <PageHeader color={COLORS.GRAY_300}>회원 정보 수정</PageHeader>
      <form style={{ width: '100%' }} onSubmit={handleEditUserInfo}>
        <label html-for="input-user-name">
          아이디
          <Input
            id="input-user-name"
            value={userId}
            type="text"
            width="100%"
            margin="1rem 0"
            border={`1px solid ${COLORS.GRAY_400}`}
            focusBorderColor={COLORS.MINT_200}
            disabled
          />
        </label>

        <label html-for="input-user-nickname">
          이름
          <Input
            id="input-user-nickname"
            value={userNickName}
            onChange={(e) => setUserNickName(e.target.value)}
            placeholder="이름을 입력해주세요"
            type="text"
            minLength={1}
            maxLegnth={10}
            margin="1rem 0"
            border={`1px solid ${COLORS.GRAY_400}`}
          />
        </label>
        {checkUserNickName || <ErrorMessage>1~10글자 이내로 입력해주세요</ErrorMessage>}

        <label html-for="input-user-age">
          나이
          <Input
            id="input-user-age"
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
            placeholder="나이를 입력해주세요"
            type="number"
            min={0}
            max={200}
            margin="1rem 0"
            border={`1px solid ${COLORS.GRAY_400}`}
          />
        </label>

        {checkUserAge || <ErrorMessage>0살 이상의 숫자를 입력해주세요</ErrorMessage>}
        <Button
          margin="0.5rem 0"
          backgroundColor={COLORS.MINT_200}
          hoverColor={COLORS.MINT_100}
          disabled={!isValidForm}
        >
          수정하기
        </Button>
        <Link to="/edit/userPassword">
          <Button
            type="button"
            margin="0.5rem 0"
            backgroundColor={COLORS.MINT_200}
            hoverColor={COLORS.MINT_100}
          >
            비밀번호 변경하기
          </Button>
        </Link>
        <Button
          type="button"
          margin="0.5rem 0"
          color={COLORS.RED_100}
          border={`1px solid ${COLORS.RED_100}`}
          backgroundColor={COLORS.WHITE}
          hoverColor={COLORS.RED_100}
          onClick={handleWithDrawUser}
        >
          회원탈퇴
        </Button>
      </form>
    </>
  );
};

export default EditUserInfo;
