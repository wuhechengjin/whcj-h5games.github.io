let h5game_name = "";
let screen_horizontal = false; /* Manual screen orientation */
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
	let game_page = parent.document.getElementById("game_page");
	let onloadEvent = () => {
		parent.document.getElementById("loading_img").style.animationPlayState = "paused";
		parent.document.getElementById("loading_content").style.display = "none";
	}
	if (game_page.attachEvent) {
		game_page.attachEvent("onload", () => {
			onloadEvent();
		});
	} else {
		game_page.onload = () => {
			onloadEvent();
		};
	}
	game_page.src = pages;
}