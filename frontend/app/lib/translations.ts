import {translations} from '~/constants';

export const translateIntoFrench = (english: string): string => {
    return translations.translations.find(translation => translation.english === english)?.french || english;
}