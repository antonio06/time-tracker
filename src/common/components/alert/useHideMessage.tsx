import * as React from 'react';

export const useHideMessage = () => {
  const [message, setMessage] = React.useState<string>('');
  const [isSuccess, setIsSuccess] = React.useState<boolean>(true);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const hideAlert = (message: string, isSuccess: boolean, isVisible: boolean) => {
    setMessage(message);
    setIsSuccess(isSuccess);
    setIsVisible(isVisible);

    setTimeout(() => setIsVisible(false), 3000);
  }

  return { message, isSuccess, isVisible, hideAlert };
};
