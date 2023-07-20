interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Trader'],
  customerRoles: ['Guest User'],
  tenantRoles: ['Trader'],
  tenantName: 'Trader',
  applicationName: 'tradite',
  addOns: ['notifications'],
};
