let h5game_name = "";
let screen_horizontal = false;
let url_params = location.search;
if (url_params.indexOf("?") != -1) {
	let str = url_params.substr(1);
	let strs = str.split("&");
	for (var i = 0; i < strs.length; i++) {
		if (unescape(strs[i].split("=")[0]) == "whcj-h5game") {
			h5game_name = unescape(strs[i].split("=")[1]);
			break;
		}
	}
}

let pages = "";
switch (h5game_name) {
	case "my-territory-war":
		pages = "https://whcj-h5collection-1.pages.dev";
		screen_horizontal = true;
		//pages = "game/index.html";
		break;

	case "gourmet-together":
		pages = "https://whcj-h5collection-2.pages.dev";
		break;

	default:
		break;
}

if (screen_horizontal) {
	let content_page = parent.document.getElementById("content_page");
	let width = content_page.clientWidth;
	let height = content_page.clientHeight;
	if (width < height) {
		content_page.style.width = `${height}px`;
		content_page.style.height = `${width}px`;
		content_page.style.left = `${0 - (height - width) / 2}px`;
		content_page.style.top = `${(height - width) / 2}px`;
		content_page.style.transform = 'rotate(90deg)';
		content_page.style.transformOrigin = '50% 50%';
	}
}

if (pages != "") {
	let onloadEvent = () => {
		/* window.addEventListener('message', (event) => {
			if (pages.indexOf(event.origin) == -1 || !event.data.eventName) return;
			switch (event.data.eventName) {
				case 'closeLoading':
					closeLoadingMask();
					break;
			}
		}); */

		let content_page = parent.document.getElementById("content_page");
		let game_page = content_page.appendChild(document.createElement('iframe'));

		if (game_page.attachEvent) {
			game_page.attachEvent("onload", () => {
				setTimeout(() => {
					closeLoadingMask();
				}, 2000);
			});
		} else {
			game_page.onload = () => {
				setTimeout(() => {
					closeLoadingMask();
				}, 2000);
			};
		}

		game_page.style.cssText = "width: 100%;height: 100%;background-color: white;";
		game_page.id = "game_page";
		game_page.allow = "autoplay";
		game_page.frameBorder = "no";
		game_page.src = pages;
	}

	if (window.addEventListener) window.addEventListener("load", onloadEvent, false);
	else if (window.attachEvent) window.attachEvent("onload", onloadEvent);
	else window.onload = onloadEvent;

}