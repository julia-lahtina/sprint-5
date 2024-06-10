import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponse } from "common/types/common.types";

/**
 * handleServerAppError bla bla
 * @param data
 * @param dispatch
 * @param isGlobalError - флаг, указывающий является ли ошибка глобальной. По умолчанию true
 * @returns функция ничего не возвращает
 */

export const handleServerAppError = <D>(data: BaseResponse<D>, dispatch: Dispatch, isGlobalError: boolean = true) => {
  if (isGlobalError) {
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] }));
    } else {
      dispatch(appActions.setAppError({ error: "Some error occurred" }));
    }
  }
  // dispatch(appActions.setAppStatus({ status: "failed" }));
};
