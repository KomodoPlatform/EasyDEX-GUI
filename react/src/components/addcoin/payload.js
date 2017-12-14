// TODO: merge check functions
//			 move to nodejs
//			 cleanup

export function checkAC(coinVal) {
	if (coinVal === 'SUPERNET' ||
			coinVal === 'REVS' ||
			coinVal === 'WLC' ||
			coinVal === 'DEX' ||
			coinVal === 'PANGEA' ||
			coinVal === 'JUMBLR' ||
			coinVal === 'BET' ||
			coinVal === 'CRYPTO' ||
			coinVal === 'COQUI' ||
			coinVal === 'HODL' ||
			coinVal === 'MSHARK' ||
			coinVal === 'BOTS' ||
			coinVal === 'MGW' ||
			coinVal === 'MVP' ||
			coinVal === 'KV' ||
			coinVal === 'CEAL' ||
			coinVal === 'MESH' ||
			coinVal === 'USD' ||
			coinVal === 'RON' ||
			coinVal === 'EUR' ||
			coinVal === 'JPY' ||
			coinVal === 'GBP' ||
			coinVal === 'AUD' ||
			coinVal === 'CAD' ||
			coinVal === 'CHF' ||
			coinVal === 'NZD' ||
			coinVal === 'CNY' ||
			coinVal === 'RUB' ||
			coinVal === 'MXN' ||
			coinVal === 'BRL' ||
			coinVal === 'INR' ||
			coinVal === 'HKD' ||
			coinVal === 'TRY' ||
			coinVal === 'ZAR' ||
			coinVal === 'PLN' ||
			coinVal === 'NOK' ||
			coinVal === 'SEK' ||
			coinVal === 'DKK' ||
			coinVal === 'CZK' ||
			coinVal === 'HUF' ||
			coinVal === 'ILS' ||
			coinVal === 'KRW' ||
			coinVal === 'MYR' ||
			coinVal === 'PHP' ||
			coinVal === 'SGD' ||
			coinVal === 'THB' ||
			coinVal === 'BGN' ||
			coinVal === 'IDR' ||
			coinVal === 'MNZ' ||
			coinVal === 'HRK')	{
		return true;
	} else {
		return false;
	}
}

export function checkCoinType(coin) {
	if (coin === 'USD' ||
			coin === 'RON' ||
			coin === 'RUB' ||
			coin === 'SEK' ||
			coin === 'SGD' ||
			coin === 'THB' ||
			coin === 'TRY' ||
			coin === 'ZAR' ||
			coin === 'CNY' ||
			coin === 'CZK' ||
			coin === 'DKK' ||
			coin === 'EUR' ||
			coin === 'GBP' ||
			coin === 'HKD' ||
			coin === 'HUF' ||
			coin === 'IDR' ||
			coin === 'ILS' ||
			coin === 'INR' ||
			coin === 'JPY' ||
			coin === 'KRW' ||
			coin === 'MXN' ||
			coin === 'MYR' ||
			coin === 'NOK' ||
			coin === 'NZD' ||
			coin === 'PHP' ||
			coin === 'PLN' ||
			coin === 'AUD' ||
			coin === 'BGN' ||
			coin === 'BRL' ||
			coin === 'CAD' ||
			coin === 'CHF') {
		return 'currency_ac';
	}

	if (coin === 'SUPERNET' ||
			coin === 'REVS' ||
			coin === 'SUPERNET' ||
			coin === 'PANGEA' ||
			coin === 'DEX' ||
			coin === 'JUMBLR' ||
			coin === 'BET' ||
			coin === 'CRYPTO' ||
			coin === 'COQUI' ||
			coin === 'HODL' ||
			coin === 'MSHARK' ||
			coin === 'BOTS' ||
			coin === 'MGW' ||
			coin === 'MVP' ||
			coin === 'KV' ||
			coin === 'CEAL' ||
			coin === 'MESH' ||
			coin === 'WLC' ||
			coin === 'MNZ') {
		return 'ac';
	}

	if (coin === 'BTC' ||
			coin === 'BTCD' ||
			coin === 'LTC' ||
			coin === 'DOGE' ||
			coin === 'DGB' ||
			coin === 'MZC' ||
			coin === 'SYS' ||
			coin === 'UNO' ||
			coin === 'BTM' ||
			coin === 'CARB' ||
			coin === 'ANC' ||
			coin === 'FRK' ||
			coin === 'GAME' ||
			coin === 'ZEC' ||
			coin === 'KMD' ||
			coin === 'ZET') {
		return 'crypto';
	}
}

export function startCurrencyAssetChain(confpath, coin, mode) {
	const assetChainPorts = window.require('electron').remote.getCurrentWindow().assetChainPorts;

	return assetChainPorts[coin];
}

export function startAssetChain(confpath, coin, mode, getSuppyOnly) {
	let assetChainPorts = window.require('electron').remote.getCurrentWindow().assetChainPorts;

	const acConfig = {
		SUPERNET: {
			supply: 816061,
		},
		REVS: {
			supply: 1300000,
		},
		WLC: {
			supply: 210000000,
		},
		PANGEA: {
			supply: 999999,
		},
		DEX: {
			supply: 999999,
		},
		JUMBLR: {
			supply: 999999,
		},
		BET: {
			supply: 999999,
		},
		CRYPTO: {
			supply: 999999,
		},
		HODL: {
			supply: 9999999,
		},
		MSHARK: {
			supply: 1400000,
		},
		BOTS: {
			supply: 999999,
		},
		MGW: {
			supply: 999999,
		},
		MVP: {
			supply: 1000000,
		},
		KV: {
			supply: 1000000,
		},
		CEAL: {
			supply: 366666666,
		},
		MESH: {
			supply: 1000007,
		},
		COQUI: {
			supply: 72000000,
		},
		MNZ: {
			supply: 257142858,
		},
	};

	if (mode === '-1') {
		if (getSuppyOnly) {
			return acConfig[coin].supply;
		} else {
			return assetChainPorts[coin];
		}
	}
}

export function startCrypto(confpath, coin, mode) {
	const assetChainPorts = window.require('electron').remote.getCurrentWindow().assetChainPorts;

	return assetChainPorts[coin];
}