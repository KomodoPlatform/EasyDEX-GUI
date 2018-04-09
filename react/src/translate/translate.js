import { LANG_EN } from './en';
import { LANG_DE } from './de';
import Config from '../config';

const _lang = {
  EN: LANG_EN,
  DE: LANG_DE,
};

const translate = (langID, interpolateStr) => {
  let defaultLang = Config.lang || 'EN';

  if (langID &&
      langID.indexOf('.') > -1) {
    let langIDComponents = langID.split('.');

    if (_lang &&
        langIDComponents &&
        _lang[defaultLang][langIDComponents[0]][langIDComponents[1]]) {
      if (interpolateStr) {
        return _lang[defaultLang][langIDComponents[0]][langIDComponents[1]].replace('@template@', interpolateStr);
      } else {
        return _lang[defaultLang][langIDComponents[0]][langIDComponents[1]];
      }
    } else {
      console.warn(`Missing translation ${langID} in js/${defaultLang.toLowerCase()}.js`);
      return `--> ${langID} <--`;
    }
  } else {
    if (langID.length) {
      console.warn(`Missing translation ${langID} in js/${defaultLang.toLowerCase()}.js`);
      return `--> ${langID} <--`;
    }
  }
}

export default translate;