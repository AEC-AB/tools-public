// Page URLs keep their capitals, and the host matches them exactly. A link with other capitals,
// such as the old /Tasks/loop for /Tasks/Loop, is sent on to the page it means. The site's
// folder, when it has one, comes from where this script was loaded.
const base = new URL(document.currentScript.src).pathname.replace(/\/case-redirect\.js$/, '');
fetch(`${base}/case-map.json`)
	.then((res) => (res.ok ? res.json() : {}))
	.then((map) => {
		const current = decodeURIComponent(location.pathname).replace(/\/$/, '');
		if (!current.startsWith(base)) return;
		const page = current.slice(base.length);
		const target = map[page.toLowerCase()];
		if (target && target !== page) location.replace(base + target + location.search + location.hash);
	});
