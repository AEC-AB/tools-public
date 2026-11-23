// The 404 page runs this to send a link that misses a page on to the page it means:
// - other capitals, such as the old /Tasks/loop for /Tasks/Loop, since the host matches exactly,
// - no language, such as /Assistant/Agent, which Wiki.js served in English.
// The page stays hidden while the lookup runs, so a link that has a page never shows the 404.
// The site's folder, when it has one, comes from where this script was loaded.
const base = new URL(document.currentScript.src).pathname.replace(/\/case-redirect\.js$/, '');
const root = document.documentElement;
root.style.visibility = 'hidden';
fetch(`${base}/case-map.json`)
	.then((res) => (res.ok ? res.json() : {}))
	.catch(() => ({}))
	.then((map) => {
		const current = decodeURIComponent(location.pathname).replace(/\/$/, '');
		if (current.startsWith(base)) {
			const page = current.slice(base.length);
			const target = map[page.toLowerCase()] ?? map[`/en${page}`.toLowerCase()];
			if (target && target !== page) {
				location.replace(base + target + location.search + location.hash);
				return;
			}
		}
		root.style.visibility = '';
	});
