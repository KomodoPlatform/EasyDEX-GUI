import { translate } from '../../translate/translate';
import mainWindow from '../../util/mainWindow';

const addCoinOptionsCrypto = () => {
  const availableKMDModes = mainWindow.arch === 'x64' ? 'spv|native' : 'spv';

  return [{
    label: 'Komodo (KMD)',
    icon: 'KMD',
    value: `KMD|${availableKMDModes}`,
  },
  {
    label: 'Chips (CHIPS)',
    icon: 'CHIPS',
    value: `CHIPS|spv`,
  }];
}

export default addCoinOptionsCrypto;
