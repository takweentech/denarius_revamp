export interface AppConfig {
  name: string;
  logoPath: string;
  logoLight: string;
  logoDark: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    dangerColor: string;
    successColor: string;
    warningColor: string;
  };
}
