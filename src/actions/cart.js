import asyncDispatchAction from 'utils/asyncDispatchAction';
import {
  requestGetCartList,
  requestAddCartItem,
  requestDeleteCartItems,
  requestSetCartItemQuantity,
  requestOrderCartItem,
} from 'api/cart';
import { snackbar } from 'actions/snackbar';
import { 비동기_요청, 알림_메시지 } from 'constants/';
import { 장바구니_액션, 장바구니_불러오기_액션 } from './types';
import { hideSpinner, showSpinner } from './spinner';

const addCartList = (product) => async (dispatch) => {
  dispatch({ type: 장바구니_액션.PENDING });

  const response = await requestAddCartItem(product.id);

  if (response.content.redirect) {
    dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_추가_중복));
    dispatch({
      type: 장바구니_액션.FAILURE,
      payload: response.content,
    });
    return;
  }

  if (response.status === 비동기_요청.FAILURE) {
    dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_추가_오류));
    dispatch({
      type: 장바구니_액션.FAILURE,
      payload: response.content,
    });
    return;
  }

  dispatch({ type: 장바구니_액션.SUCCESS });
  dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_추가(product.name)));
};

const deleteCartItem =
  (productId, productName = null) =>
  async (dispatch) => {
    dispatch({
      type: 장바구니_액션.PENDING,
    });

    const response = await requestDeleteCartItems(productId);

    if (response.status === 비동기_요청.FAILURE) {
      dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_삭제_실패));
      dispatch({
        type: 장바구니_액션.FAILURE,
        payload: response.content,
      });
    }

    dispatch({ type: 장바구니_액션.SUCCESS });
    dispatch({ type: 장바구니_액션.DELETE_PRODUCT, payload: productId });

    if (productName) {
      dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_개별_삭제(productName)));
      return;
    }

    dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_다중_삭제));
  };

const modifyCartItemQuantity = (productId, quantity) => async (dispatch) => {
  dispatch({ type: 장바구니_액션.PENDING });

  const response = await requestSetCartItemQuantity(productId, quantity);

  if (response.status === 비동기_요청.FAILURE) {
    return {
      type: 장바구니_액션.FAILURE,
      payload: response.content,
    };
  }

  dispatch({ type: 장바구니_액션.SUCCESS });
  dispatch({
    type: 장바구니_액션.SET_PRODUCT_QUANTITY,
    payload: { productId, quantity },
  });
};

const getCartList = () => async (dispatch) => {
  dispatch({
    type: 장바구니_불러오기_액션.PENDING,
  });

  const response = await requestGetCartList();

  asyncDispatchAction(dispatch, response, 장바구니_불러오기_액션);
};

const orderCartItem = (productId) => async (dispatch) => {
  dispatch({
    type: 장바구니_액션.PENDING,
  });

  dispatch(showSpinner());

  const response = await requestOrderCartItem(productId);

  dispatch(hideSpinner());

  if (response.status === 비동기_요청.FAILURE) {
    dispatch(snackbar.pushMessageSnackbar(알림_메시지.상품_주문_실패));
    dispatch({
      type: 장바구니_액션.FAILURE,
      payload: response.content,
    });
    return;
  }

  dispatch({ type: 장바구니_액션.SUCCESS });
  dispatch(snackbar.pushMessageSnackbar(알림_메시지.상품_주문_성공));
  dispatch({ type: 장바구니_액션.ORDER_PRODUCT, payload: productId });
};

export { addCartList, deleteCartItem, modifyCartItemQuantity, getCartList, orderCartItem };
