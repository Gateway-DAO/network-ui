export const errorMessages = {
  PAGE_NOT_FOUND: 'Page not found',
  NEED_PERMISSION: 'You need permission to access this data',
  NEED_PERMISSION_DESCRIPTION:
    'Request access or switch to an account that you have access to. Learn more.',
  PDA_NO_ACCESS: "You don't have access to this PDA",
  UNEXPECTED_ERROR: `There was an unexpected error, please, contact Gateway or try again.`,
  EMAIL_ALREADY_REGISTERED: `E-mail already registered`,
  EMAIL_ALREADY_REGISTERED_TO_USER: `E-mail already registered to current user`,
  GATEWAY_ID_ALREADY_REGISTERED: `Gateway ID already registered`,
  GATEWAY_ID_UPDATED_RECENTLY: 'You will be able to update in [days] days.',
  USERNAME_ID_ALREADY_EXISTS: `Username already registered`,
  ERROR_TRYING_TO_SEND_THE_CODE: `An error ocurred trying to send the code`,
  ERROR_TRYING_TO_CREATE_THE_CODE: `An error ocurred trying to create the code`,
  ERROR_TRYING_TO_ISSUE_A_PROOF: `An error ocurred trying to issue a proof`,
  ERROR_TRYING_TO_REJECT_A_REQUEST: `An error ocurred trying to reject Data Request`,
  EXPIRED_CODE: `Expired code`,
  INVALID_CODE_VERIFICATION: `Invalid code verification`,
  MAXIMUM_ATTEMPTS_REACHED: `Maximum attempts reached`,
  MAXIMUM_TIME_REACHED: `Expired token`,
  EMAIL_ALREADY_IN_USE: 'E-mail already in use',
  USERNAME_ALREADY_IN_USE: 'Username already in use',
  WALLET_ALREADY_REGISTERED: `Wallet already associated to another user`,
  WALLET_ALREADY_REGISTERED_TO_USER: `Wallet already associated to your user`,
  WALLET_ALREADY_ASSOCIATED: `Wallet already associated to another user`,
  WALLET_ALREADY_ASSOCIATED_TO_USER: `Wallet already associated to your user`,
  CANNOT_REMOVE_LAST_AUTH_METHOD: `You cannot remove the last authentication method of your account`,
  SOMETHING_WENT_WRONG: 'Something went wrong',
  REVOKE_ERROR: 'There was a problem performing the revoke. Try again later.',
  STATUS_CHANGE_ERROR:
    'There was a problem performing the status change. Try again later.',
  VERIFIER_NOT_FOUND: `Verifier doesn't exists`,
  USER_NOT_FOUND: `User doesn't exists`,
  DUPLICATED_MEMBERS: `Duplicated members`,
  INSUFFICIENT_BALANCE_TO_PROCEED: `You don't have enough balance to proceed`,
};

export type ErrorCode = keyof typeof errorMessages;

export type ErrorObject = {
  code: ErrorCode;
  message: string;
  rawError?: any;
};

const getCodeFromError = (error: any) =>
  (error?.message as ErrorCode) ?? 'UNEXPECTED_ERROR';

/**
 * Retrieves the error message from an error code
 * @param code
 * @returns string
 */
export const getErrorFromCode = (code: string) =>
  errorMessages[code as ErrorCode] ?? errorMessages.UNEXPECTED_ERROR;

export const parseErrorObject = (
  code: ErrorCode,
  rawError?: any
): ErrorObject => ({
  code,
  message: getErrorFromCode(code),
  rawError,
});

/**
 * Retrieves the error code and the message from an error object
 * @param error
 * @returns { code: ErrorMessage, message: string }
 */
export const getErrorMessage = (error: any): ErrorObject => {
  const code = getCodeFromError(error?.response?.errors?.[0]);

  return parseErrorObject(code, error?.response?.errors?.[0]);
};

export const getErrorsMessages = (error: any): ErrorCode[] =>
  error?.response?.errors?.map(getCodeFromError) ?? ['UNEXPECTED_ERROR'];
