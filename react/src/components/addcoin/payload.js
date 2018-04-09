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
			coinVal === 'EQL' ||
			coinVal === 'HODL' ||
			coinVal === 'MSHARK' ||
			coinVal === 'BOTS' ||
			coinVal === 'MGW' ||
			coinVal === 'MVP' ||
			coinVal === 'KV' ||
			coinVal === 'CEAL' ||
			coinVal === 'MESH' ||
			coinVal === 'MNZ' ||
			coinVal === 'AXO' ||
			coinVal === 'ETOMIC' ||
			coinVal === 'BTCH' ||
			coinVal === 'BEER' ||
			coinVal === 'PIZZA' ||
	    		coinVal === 'OOT' ||
			coinVal === 'VOTE2018' ||
			coinVal === 'BNTN')	{
		return true;
	} else {
		return false;
	}
}

export function startCurrencyAssetChain(confpath, coin, mode) {
	const assetChainPorts = window.require('electron').remote.getCurrentWindow().assetChainPorts;

	return assetChainPorts[coin];
}

export function startAssetChain(confpath, coin, mode, getSuppyOnly) {
	const assetChainPorts = window.require('electron').remote.getCurrentWindow().assetChainPorts;

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
                EQL: {
                        supply: 500000000,
		},
		MNZ: {
			supply: 257142858,
		},
		AXO: {
			supply: 200000000,
		},
		ETOMIC: {
			supply: 100000000,
		},
		BTCH: {
			supply: 20998641,
		},
		BEER: {
			supply: 100000000,
		},
		PIZZA: {
			supply: 100000000,
		},
		OOT: {
			supply: 216000000,
		},
		VOTE2018: {
			supply: 600000000,
		},
		NINJA: {
			supply: 100000000,
		},
		BNTN: {
			supply: 500000000,
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

	coin = coin === 'KMD' ? 'komodod' : coin;
	return assetChainPorts[coin];
}
