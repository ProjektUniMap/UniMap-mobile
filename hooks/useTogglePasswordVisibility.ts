import { useState } from 'react';

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [eyeIcon, setEyeIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    if (eyeIcon === 'eye') {
      setEyeIcon('eye-off');
    } else if (eyeIcon === 'eye-off') {
      setEyeIcon('eye');
    }
    setPasswordVisibility(!passwordVisibility);
  };

  return {
    passwordVisibility,
    eyeIcon,
    handlePasswordVisibility,
  };
};
