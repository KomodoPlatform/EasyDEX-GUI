import { translate } from '../../translate/translate';
import mainWindow from '../../util/mainWindow';

const addCoinOptionsAC = () => {
  const _assetChains = [
    'bet',
    'bots',
    'ceal',
    'coqui',
    'crypto',
    'hodl',
    'dex',
    'jumblr',
    'kv',
    'mgw',
    'mnz',
    'pangea',
    'revs',
    'mshark',
    'supernet',
    'wlc',
    'axo',
    'etomic',
    'btch',
    'beer',
    'pizza',
    'vote2018',
    'ninja',
	'mgnx'
  ];
  let _items = [];

  for (let i = 0; i < _assetChains.length; i++) {
    let availableModes = _assetChains[i] !== 'kv' && _assetChains[i] !== 'axo' && _assetChains[i] !== 'etomic' ? 'spv|native' : 'native';

    if (mainWindow.arch !== 'x64') {
      availableModes = 'spv';
    }

    _items.push({
      label: translate(`ASSETCHAINS.${_assetChains[i].toUpperCase()}`),
      icon: _assetChains[i],
      value: `${_assetChains[i].toUpperCase()}|${availableModes}`,
    });
  }

  return _items;
}

export default addCoinOptionsAC;
