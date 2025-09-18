import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const translate = (key: string, options?: any): string => {
    return String(t(key, options));
  };

  const changeLanguage = (language: string) => {
    return i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return {
    t: translate,
    changeLanguage,
    currentLanguage,
    i18n,
  };
};
