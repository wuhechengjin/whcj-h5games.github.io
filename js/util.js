var closeLoadingMask = () => {
	parent.document.getElementById("loading_img").style.animationPlayState = "paused";
	parent.document.getElementById("loading_content").style.display = "none";
}