import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for managing navigation back to the manage hub page.
 * 
 * @returns An object with a navigateBack function that navigates to /manage
 */
export const useManageNavigation = (): { navigateBack: () => void } => {
  const navigate = useNavigate();

  return {
    navigateBack: () => navigate('/manage'),
  };
};
