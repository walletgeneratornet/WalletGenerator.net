ninja.wallets.manualwallet = {
	open: function () {
		document.getElementById("main").setAttribute("class", "manual"); // add 'manual' class to main div
		var manualArea = document.getElementById("manualarea");
		manualArea.style.display = "block";

		var pageBreakAt = ninja.wallets.manualwallet.pageBreakAtArtisticDefault;

		if (document.getElementById("manualkeyarea").innerHTML == "") {
			ninja.wallets.manualwallet.build();
		}
	},

	close: function () {
		document.getElementById("manualarea").style.display = "none";
		document.getElementById("main").setAttribute("class", ""); // remove 'manual' class from main div
	},

	remaining: null, // use to keep track of how many addresses are left to process when building the manual wallet
	count: 0,
	pageBreakAtDefault: 1,
	pageBreakAtArtisticDefault: 1,
	pageBreakAt: null,

	build: function () {
		var numWallets = 1;
		var pageBreakAt = 1;
		ninja.wallets.manualwallet.remaining = numWallets;
		ninja.wallets.manualwallet.count = 0;
		ninja.wallets.manualwallet.pageBreakAt = pageBreakAt;

		document.getElementById("manualkeyarea").innerHTML = "";

		ninja.wallets.manualwallet.batch;

	},

	batch: function () {
		if (ninja.wallets.manualwallet.remaining > 0) {
			var manualArea = document.getElementById("manualkeyarea");
			ninja.wallets.manualwallet.count++;
			var i = ninja.wallets.manualwallet.count;
			var pageBreakAt = ninja.wallets.manualwallet.pageBreakAt;
			var div = document.createElement("div");
			div.setAttribute("id", "keyarea" + i);

			div.innerHTML = ninja.wallets.manualwallet.templateArtisticHtml(i);
			div.setAttribute("class", "manualkeyarea art");

      if (manualArea.innerHTML != "") {
        // page break
        if ((i - 1) % pageBreakAt == 0 && i >= pageBreakAt) {
          var pBreak = document.createElement("div");
          pBreak.setAttribute("class", "pagebreak");
          document.getElementById("manualkeyarea").appendChild(pBreak);
          div.style.pageBreakBefore = "always";
        }
      }
      document.getElementById("manualkeyarea").appendChild(div);
      ninja.wallets.manualwallet.showArtisticWallet(1,"","","zcash")
      ninja.wallets.manualwallet.remaining--;
      setTimeout(ninja.wallets.manualwallet.batch, 0);


			var pBreak = document.createElement("div");
			pBreak.setAttribute("class", "pagebreak");
			document.getElementById("manualkeyarea").appendChild(pBreak);

			document.getElementById("manualkeyarea").appendChild(div);

		}
	},


	// Verify that a self-entered key is valid, and compute the corresponding
	// public address, render the wallet.

	templateArtisticHtml: function (i) {
		var keyelement = 'btcprivwif';
		var coinImgUrl = "logos/" + document.getElementById('manualCurrency').value + ".png";
		var walletBackgroundUrl = "wallets/" +  document.getElementById('manualCurrency').value + ".png";

		var walletHtml =
							"<div class='coinIcoinM'> <img id='coinImg' src='" + coinImgUrl + "' alt='currency_logo' /></div><div class='artwalletm' id='artwalletm" + i + "'>" +
								"<img id='manualsvg" + i + "' class='manualsvg' src='" + walletBackgroundUrl + "' />" +
								"<div id='qrcode_public" + i + "' class='qrcode_publicM'></div>" +
								"<div id='qrcode_private" + i + "' class='qrcode_privateM'></div>" +
								"<div class='btcaddressM' id='btcaddress" + i + "'></div>" +
								"<div class='" + keyelement + "' id='" + keyelement + i + "'></div>" +
								"<div class='manualWalletTextM'><img id='backLogo' class='backLogoM' src='" + coinImgUrl + "' alt='currency_logo' />" + ninja.translator.get("paperwalletback") + "</div>" +
							"</div>";
		return walletHtml;
	},
  genwal: function (idPostFix, bitcoinAddress, privateKey, currencyname){
    ninja.wallets.manualwallet.batch();
    ninja.wallets.manualwallet.showArtisticWallet(idPostFix, bitcoinAddress, privateKey, currencyname);
  },
	showArtisticWallet: function (idPostFix, bitcoinAddress, privateKey, currencyname) {
    var coinImgUrl = "logos/" + currencyname + ".png";
		var walletBackgroundUrl = "wallets/" + currencyname + ".png";
    var keyelement = 'btcprivwif';
    var i = idPostFix;
    var walletHtml =
							"<div class='coinIcoinM'> <img id='coinImg' src='" + coinImgUrl + "' alt='currency_logo' /></div><div class='artwalletm' id='artwalletm" + i + "'>" +
								"<img id='manualsvg" + i + "' class='manualsvgM' src='" + walletBackgroundUrl + "' />" +
								"<div id='qrcode_public" + i + "' class='qrcode_publicM'></div>" +
								"<div id='qrcode_private" + i + "' class='qrcode_privateM'></div>" +
								"<div class='btcaddressM' id='btcaddress" + i + "'></div>" +
								"<div class='" + keyelement + "' id='" + keyelement + i + "'></div>" +
								"<div class='manualWalletText'><img id='backLogo' class='backLogoM' src='" + coinImgUrl + "' alt='currency_logo' />" + ninja.translator.get("paperwalletback") + "</div>" +
							"</div>";

		var keyValuePair = {};
		keyValuePair["qrcode_public" + idPostFix] = bitcoinAddress;
		ninja.qrCode.showQrCode(keyValuePair, 3.5);

        var keyValuePair = {};
        keyValuePair["qrcode_private" + idPostFix] = privateKey;
        ninja.qrCode.showQrCode(keyValuePair, 2.8);

        document.getElementById("manualsvg"+i).src = walletBackgroundUrl;
        document.getElementById("coinImg").src = coinImgUrl;
        document.getElementById("backLogo").src= coinImgUrl;
        document.getElementById("btcaddress" + idPostFix).innerHTML = bitcoinAddress;
		document.getElementById("btcprivwif" + idPostFix).innerHTML = privateKey;
	},



	resetLimits: function () {
		var manualEncrypt = document.getElementById("manualencrypt");

		document.getElementById("manualkeyarea").style.fontSize = "100%";
		if (manualEncrypt.checked) {
			// reduce font size
			document.getElementById("manualkeyarea").style.fontSize = "95%";
		}
	}
};
