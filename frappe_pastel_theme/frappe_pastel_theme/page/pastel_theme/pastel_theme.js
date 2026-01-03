frappe.pages["pastel-theme"].on_page_load = function (wrapper) {
	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: __("Theme Settings"),
		single_column: true,
	});

	frappe.breadcrumbs.add("Settings");

	$(frappe.render_template("pastel_theme")).appendTo(page.body);

	const api = window.frappe_pastel_theme;
	const root = page.body.get(0);

	const STORAGE_KEY = "frappe_pastel_theme.settings_tab";
	const VALID_TABS = new Set(["theme", "font"]);

	const set_active_tab = (tab) => {
		tab = (tab || "theme").trim() || "theme";
		if (!VALID_TABS.has(tab)) tab = "theme";

		if (!root?.querySelectorAll) return;

		root.querySelectorAll(".pastel-settings-tab").forEach((btn) => {
			const is_active = (btn.getAttribute("data-tab") || "") === tab;
			btn.classList.toggle("active", is_active);
			btn.setAttribute("aria-selected", is_active ? "true" : "false");
		});

		root.querySelectorAll(".pastel-settings-panel").forEach((panel) => {
			panel.hidden = (panel.getAttribute("data-panel") || "") !== tab;
		});

		try {
			localStorage.setItem(STORAGE_KEY, tab);
		} catch (e) {
			// ignore
		}
	};

	const setup_tabs = () => {
		if (!root?.querySelectorAll) return;
		if (root.__pastelTabsReady) return;
		root.__pastelTabsReady = true;

		root.querySelectorAll(".pastel-settings-tab").forEach((btn) => {
			btn.addEventListener("click", () => set_active_tab(btn.getAttribute("data-tab")));
		});

		let initial = "theme";
		try {
			const saved = (localStorage.getItem(STORAGE_KEY) || "").trim();
			if (VALID_TABS.has(saved)) initial = saved;
		} catch (e) {
			// ignore
		}

		set_active_tab(initial);
	};

	setup_tabs();

	api?.render_theme_picker?.(root, { include_default: true });
	api?.render_font_picker?.(root, { include_default: true });

	const get_first_url_arg = (keys) => {
		if (!window.get_url_arg) return "";
		for (const key of keys) {
			const value = (get_url_arg(key) || "").trim();
			if (value) return value;
		}
		return "";
	};

	const clear_url_args = (keys) => {
		try {
			const url = new URL(window.location.href);
			keys.forEach((key) => url.searchParams.delete(key));
			window.history.replaceState({}, document.title, url.toString());
		} catch (e) {
			// ignore
		}
	};

	const apply_from_url = () => {
		const theme = get_first_url_arg(["theme", "preset"]);
		const font = get_first_url_arg(["font"]);

		if (theme) set_active_tab("theme");
		else if (font) set_active_tab("font");

		const theme_keys = new Set(["", ...((api?.THEMES || []).map((t) => t.key) || [])]);
		const font_keys = new Set(["", ...((api?.FONTS || []).map((t) => t.key) || [])]);

		const actions = [];

		if (theme && api?.set_theme && theme_keys.has(theme) && theme !== (frappe.boot?.pastel_theme || "")) {
			actions.push(
				api.set_theme(theme).then(() => {
					frappe.show_alert(__("Theme saved"), 2);
					api?.render_theme_picker?.(root, { include_default: true });
				})
			);
		}

		if (font && api?.set_font && font_keys.has(font) && font !== (frappe.boot?.pastel_font || "")) {
			actions.push(
				api.set_font(font).then(() => {
					frappe.show_alert(__("Font saved"), 2);
					api?.render_font_picker?.(root, { include_default: true });
				})
			);
		}

		if (theme || font) {
			Promise.allSettled(actions).finally(() => clear_url_args(["theme", "preset", "font"]));
		}
	};

	apply_from_url();
};
