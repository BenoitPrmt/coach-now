import {TRANSLATIONS} from '~/constants';

export const translateIntoFrench = (english: string): string => {
    return TRANSLATIONS.TRANSLATIONS.find(translation => translation.english === english)?.french || english;
}