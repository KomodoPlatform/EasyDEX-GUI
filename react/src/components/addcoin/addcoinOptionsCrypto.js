import translate from '../../translate/translate';
import mainWindow from '../../util/mainWindow';
import config from '../../config';

const addCoinOptionsCrypto = () => {
  const availableKMDModes = mainWindow.arch === 'x64' ? 'spv|native' : 'spv';

  let _coins = [{
    label: 'Komodo (KMD)',
    icon: 'KMD',
    value: `KMD|${availableKMDModes}`,
  }, {
    label: 'Chips (CHIPS)',
    icon: 'CHIPS',
    value: `CHIPS|spv`,
  }];

  if (config.experimentalFeatures) {
    _coins.push(/*{
      label: 'ArtByte (ABY)',
      icon: 'ABY',
      value: `ABY|spv`,
    }, {
      label: 'VoteCoin (VOT)',
      icon: 'VOT',
      value: `VOT|spv`,
    }, {
      label: 'Bitdeal (BDL)',
      icon: 'BDL',
      value: `BDL|spv`,
    }, {
      label: 'BitcoinPrivate (BTCP)',
      icon: 'BTCP',
      value: `BTCP|spv`,
    }, {
      label: 'Machinecoin (MAC)',
      icon: 'MAC',
      value: `MAC|spv`,
    },
    {
      label: 'Whitecoin (XWC)',
      icon: 'XWC',
      value: `XWC|spv`,
    },
    {
      label: 'Vcash (XVC)',
      icon: 'XVC',
      value: `XVC|spv`,
    },
    {
      label: 'Smartcash (SMART)',
      icon: 'SMART',
      value: `SMART|spv`,
    },
    {
      label: 'Crave (CRAVE)',
      icon: 'CRAVE',
      value: `CRAVE|spv`,
    },
    {
      label: 'AdCoin (ACC)',
      icon: 'ACC',
      value: `ACC|spv`,
    }, {
      label: 'Auroracoin (AUR)',
      icon: 'AUR',
      value: `AUR|spv`,
    }, {
      label: 'Bitcoin Atom (BCA)',
      icon: 'BCA',
      value: `BCA|spv`,
    }, {
      label: 'Clams (CLAM)',
      icon: 'CLAM',
      value: `CLAM|spv`,
    }, {
      label: 'ClubCoin (CLUB)',
      icon: 'CLUB',
      value: `CLUB|spv`,
    }, {
      label: 'Diamond (DMD)',
      icon: 'DMD',
      value: `DMD|spv`,
    }, {
      label: 'ExclusiveCoin (EXCL)',
      icon: 'EXCL',
      value: `EXCL|spv`,
    }, {
      label: 'FeatherCoin (FTC)',
      icon: 'FTC',
      value: `FTC|spv`,
    }, {
      label: 'Flash (Flash)',
      icon: 'FLASH',
      value: `FLASH|spv`,
    }, {
      label: 'Fujicoin (FJC)',
      icon: 'FJC',
      value: `FJC|spv`,
    }, {
      label: 'Gulden (NLG)',
      icon: 'NLG',
      value: `NLG|spv`,
    }, {
      label: 'Litecoin Cash (LCC)',
      icon: 'LCC',
      value: `LCC|spv`,
    }, {
      label: 'MinexCoin (MNX)',
      icon: 'MNX',
      value: `MNX|spv`,
    }, {
      label: 'NavCoin (NAV)',
      icon: 'NAV',
      value: `NAV|spv`,
    }, {
      label: 'NeosCoin (NEOS)',
      icon: 'NEOS',
      value: `NEOS|spv`,
    }, {
      label: 'OKCash (OK)',
      icon: 'OK',
      value: `OK|spv`,
    }, {
      label: 'OmniLayer (OMNI)',
      icon: 'OMNI',
      value: `OMNI|spv`,
    }, {
      label: 'Pivx (PIVX)',
      icon: 'PIVX',
      value: `PIVX|spv`,
    }, {
      label: 'Reddcoin (RDD)',
      icon: 'RDD',
      value: `RDD|spv`,
    }, {
      label: 'Unobtanium (UNO)',
      icon: 'UNO',
      value: `UNO|spv`,
    }, {
      label: 'Verge (XVG)',
      icon: 'XVG',
      value: `XVG|spv`,
    }, {
      label: 'VIVO (VIVO)',
      icon: 'VIVO',
      value: `VIVO|spv`,
    }, {
      label: 'E-Gulden (EFL)',
      icon: 'EFL',
      value: `EFL|spv`,
    }, {
      label: 'GoByte (GBX)',
      icon: 'GBX',
      value: `GBX|spv`,
    }, {
      label: 'Bitsend (BSD)',
      icon: 'BSD',
      value: `BSD|spv`,
    }, {
      label: 'LBRY Credits (LBC)',
      icon: 'LBC',
      value: `LBC|spv`,
    }, {
      label: 'Europecoin (ERC)',
      icon: 'ERC',
      value: `ERC|spv`,
    }, {
      label: 'Bata (BTA)',
      icon: 'BTA',
      value: `BTA|spv`,
    }, {
      label: 'Einsteinium (EMC2)',
      icon: 'EMC2',
      value: `EMC2|spv`,
    }, {
      label: 'Syscoin (SYS)',
      icon: 'SYS',
      value: `SYS|spv`,
    }, {
      label: 'GameCredits (GAME)',
      icon: 'GAME',
      value: `GAME|spv`,
    }, {
      label: 'Internet of People (IOP)',
      icon: 'IOP',
      value: `IOP|spv`,
    }, {
      label: 'Zencashio (ZEN)',
      icon: 'ZEN',
      value: `ZEN|spv`,
    }, {
      label: 'Zcoin (XZC)',
      icon: 'XZC',
      value: `XZC|spv`,
    },*/ {
      label: 'BitcoinGold (BTG)',
      icon: 'BTG',
      value: `BTG|spv`,
    }, {
      label: 'BitcoinCash (BCH)',
      icon: 'BCH',
      value: `BCH|spv`,
    }, {
      label: 'Bitcoin (BTC)',
      icon: 'BTC',
      value: `BTC|spv`,
    }, {
      label: 'Crown (CRW)',
      icon: 'CRW',
      value: `CRW|spv`,
    }, {
      label: 'Dash (DASH)',
      icon: 'DASH',
      value: `DASH|spv`,
    }, {
      label: 'Denarius (DNR)',
      icon: 'DNR',
      value: `DNR|spv`,
    }, {
      label: 'DigiByte (DGB)',
      icon: 'DGB',
      value: `DGB|spv`,
    }, {
      label: 'Faircoin (FAIR)',
      icon: 'FAIR',
      value: `FAIR|spv`,
    }, {
      label: 'Argentum (ARG)',
      icon: 'ARG',
      value: `ARG|spv`,
    }, {
      label: 'Litecoin (LTC)',
      icon: 'LTC',
      value: `LTC|spv`,
    }, {
      label: 'Monacoin (MONA)',
      icon: 'MONA',
      value: `MONA|spv`,
    }, {
      label: 'Namecoin (NMC)',
      icon: 'NMC',
      value: `NMC|spv`,
    }, {
      label: 'Vertcoin (VTC)',
      icon: 'VTC',
      value: `VTC|spv`,
    }, {
      label: 'Viacoin (VIA)',
      icon: 'VIA',
      value: `VIA|spv`,
    }, {
      label: 'Sibcoin (SIB)',
      icon: 'SIB',
      value: `SIB|spv`,
    }, {
      label: 'Blackcoin (BLK)',
      icon: 'BLK',
      value: `BLK|spv`,
    }, {
      label: 'Dogecoin (DOGE)',
      icon: 'DOGE',
      value: `DOGE|spv`,
    }, {
      label: 'Zcash (ZEC)',
      icon: 'ZEC',
      value: `ZEC|spv`,
    }, {
      label: 'Hush (HUSH)',
      icon: 'HUSH',
      value: `HUSH|spv`,
    }, {
      label: 'SnowGem (SNG)',
      icon: 'sng',
      value: `SNG|spv`,
    }, {
      label: 'Zclassic (ZCL)',
      icon: 'ZCL',
      value: `ZCL|spv`,
    }, {
      label: 'Myriad (XMY)',
      icon: 'XMY',
      value: `XMY|spv`,
    },/* {
      label: 'Groestlcoin (GRS)',
      icon: 'GRS',
      value: `GRS|spv`,
    }, */{
      label: 'Hodlc (HODLC)',
      icon: 'HODLC',
      value: `HODLC|spv`,
    }, {
      label: 'Bitcore (BTX)',
      icon: 'BTX',
      value: `BTX|spv`,
    }, {
      label: 'Qtum (QTUM)',
      icon: 'QTUM',
      value: `QTUM|spv`,
    }, {
      label: 'BitcoinZ (BTCZ)',
      icon: 'BTCZ',
      value: `BTCZ|spv`,
    });
  }

  return _coins;
}

export default addCoinOptionsCrypto;
