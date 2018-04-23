import translate from '../../translate/translate';

const addCoinOptionsACFiat = () => {
  const _fiat = [
    'aud',
    'brl',
    'gbp',
    'bgn',
    'cad',
    'hrk',
    'czk',
    'cny',
    'dkk',
    'eur',
    'hkd',
    'huf',
    'inr',
    'idr',
    'ils',
    'jpy',
    'krw',
    'myr',
    'mxn',
    'nzd',
    'nok',
    'php',
    'pln',
    'ron',
    'rub',
    'sgd',
    'zar',
    'sek',
    'chf',
    'thb',
    'try',
    'usd'
  ];
  let _items = [];

  for (let i = 0; i < _fiat.length; i++) {
    _items.push({
      label: translate(`FIAT_CURRENCIES.${_fiat[i].toUpperCase()}`),
      icon: _fiat[i],
      value: `${_fiat[i].toUpperCase()}|native`,
    });
  }

  return _items;
}

export default addCoinOptionsACFiat;
