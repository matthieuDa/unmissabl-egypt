import fr from '../i18n/fr.json';
import en from '../i18n/en.json';
export const site = { name:'Unmissabl', url:'https://unmissabl.com', email:'dalle.matthieu@gmail.com', whatsapp:'33781727689', demo:true };
export type Lang = keyof typeof uiMessages;
export const locales:readonly Lang[] = ['fr','en'];
export const defaultLocale:Lang=locales[0];
export const languageNames = { fr:'Français', en:'English' };
export const uiMessages = {fr,en};
export type MessageKey=keyof typeof fr;
export const tx=(lang:Lang,key:MessageKey):string => uiMessages[lang][key];
export const href = (lang:Lang,path='') => `/${lang}/${path ? path.replace(/^\/+|\/+$/g,'')+'/' : ''}`;
export const navigation = {
 fr:{work:'Réalisations',atlas:'Destinations',collective:'Collectif',destinations:'Prochains tournages',contact:'Parlons de votre projet',sector:'Secteurs',film:'Voir le film',project:'Découvrir le projet',all:'Toutes les références',back:'Retour aux références'},
 en:{work:'Work',atlas:'Destinations',collective:'Collective',destinations:'Upcoming productions',contact:'Let’s talk about your project',sector:'Industries',film:'Watch the film',project:'Explore the project',all:'All work',back:'Back to selected work'}
};
