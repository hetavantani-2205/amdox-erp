export const getRole = () => {

  if (typeof window === 'undefined')
    return null;

  return localStorage.getItem('role');

};

export const isEmployee = () =>
  getRole() === 'EMPLOYEE';

export const isManager = () =>
  getRole() === 'MANAGER';

export const isTenantAdmin = () =>
  getRole() === 'TENANT_ADMIN';

export const isSuperAdmin = () =>
  getRole() === 'SUPER_ADMIN';