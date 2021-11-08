import { useState } from '#app';

export const useAppState = () => {
  const useMeta = useState('useMeta');

  const hasNavbar = useState('hasNavbar', () => false);
  const hasSidebar = useState('hasSidebar', () => false);
  const hasCollapsedSidebar = useState('hasCollapsedSidebar', () => false);
  
  return { hasNavbar, hasSidebar, hasCollapsedSidebar, useMeta };
};
