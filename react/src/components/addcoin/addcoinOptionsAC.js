import translate from '../../translate/translate';
import mainWindow from '../../util/mainWindow';

const addCoinOptionsAC = () => {
  const _assetChains = [
    'bet',
    'bots',
    'ceal',
    'mesh',
    'coqui',
    'glxt',
    'eql',
    'crypto',
    'hodl',
    'dex',
    'jumblr',
    'kv',
    'mgw',
    'mnz',
    'pangea',
    'oot',
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
    'bntn'
  ];
  let _items = [];

  for (let i = 0; i < _assetChains.length; i++) {
    let availableModes = _assetChains[i] !== 'kv' && _assetChains[i] !== 'axo' && _assetChains[i] !== 'etomic' && _assetChains[i] !== 'mesh' && _assetChains[i] !== 'ceal' ? 'spv|native' : 'native';

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
