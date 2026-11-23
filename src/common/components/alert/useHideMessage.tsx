import * as React from 'react';

export const useHideMessage = () => {
  const [message, setMessage] = React.useState<string>('');
  const [isSuccess, setIsSuccess] = React.useState<boolean>(true);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Clear the pending timer when the component using the hook unmounts
  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const hideAlert = React.useCallback((message: string, isSuccess: boolean, isVisible: boolean) => {
    setMessage(message);
    setIsSuccess(isSuccess);
    setIsVisible(isVisible);

    // Cancel the previous timer so it can't hide this new alert too early
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(false), 3000);
  }, []);

  return { message, isSuccess, isVisible, hideAlert };
};
