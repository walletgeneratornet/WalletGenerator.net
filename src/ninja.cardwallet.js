ninja.wallets.cardwallet = {
	open: function () {
		document.getElementById("cardarea").style.display = "block";
	},

	close: function () {
		document.getElementById("cardarea").style.display = "none";
	},

	// Verify that a self-entered key is valid, and compute the corresponding
	// public address, render the wallet.
	generate: function () {
		var suppliedKey = document.getElementById('suppliedPublicAddress').value;
		suppliedKey = suppliedKey.trim(); // in case any spaces or whitespace got pasted in
		document.getElementById('suppliedPublicAddress').value = suppliedKey;

		document.getElementById('cardkeyarea').innerHTML = "";

		//ninja.wallets.paperwallet.showArtisticWallet(1, suppliedKey);
		var i = 0;
		for(i=0;i<9;i++)
		{
			document.getElementById('cardkeyarea').innerHTML += ninja.wallets.cardwallet.templateArtisticHtml(i);
			ninja.wallets.cardwallet.showArtisticWallet(i, suppliedKey);
		}
		
	},

	templateArtisticHtml: function (i) {
		var keyelement = 'card_btcprivwif';
		var coinImgUrl = "logos/" + janin.selectedCurrency.name.toLowerCase() + ".png";
		var walletBackgroundUrl = "business_cards/" + janin.selectedCurrency.name.toLowerCase() + ".png";

		var walletHtml =
							"<div class='artcard' id='artcard" + i + "'><div class='cardCoinIcoin'> <img id='coinImg' src='" + coinImgUrl + "' alt='currency_logo' /></div>" +
								"<img id='cardsvg" + i + "' class='cardsvg' src='" + walletBackgroundUrl + "' />" +
								"<div id='card_qrcode_public" + i + "' class='card_qrcode_public'></div>" +
								"<div class='card_btcaddress' id='card_btcaddress" + i + "'></div>" +
							"</div>";
		return walletHtml;
	},

	showArtisticWallet: function (idPostFix, bitcoinAddress) {
		var keyValuePair = {};
		keyValuePair["card_qrcode_public" + idPostFix] = bitcoinAddress;
		ninja.qrCode.showQrCode(keyValuePair, 3);
        
        document.getElementById("card_btcaddress" + idPostFix).innerHTML = bitcoinAddress;
	},
};
