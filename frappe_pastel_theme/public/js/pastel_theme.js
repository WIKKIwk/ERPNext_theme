(() => {
	"use strict";

	const THEMES = [
		{ key: "soft-blue", label: __("Soft Blue") },
		{ key: "mint", label: __("Mint") },
		{ key: "warm-neutral", label: __("Warm Neutral (Beige)") },
		{ key: "soft-rose", label: __("Soft Rose") },
		{ key: "olive-gray", label: __("Olive Gray") },
		{ key: "calm-lavender-gray", label: __("Calm Lavender Gray") },
		{ key: "peach-cream", label: __("Peach Cream") },
		{ key: "aqua-breeze", label: __("Aqua Breeze") },
		{ key: "butter-yellow", label: __("Butter Yellow") },
	];

	const PALETTE = {
		"": {
			bg: "var(--bg-color)",
			navbar: "var(--navbar-bg)",
			subtle: "var(--subtle-fg)",
			primary: "var(--primary)",
		},
		"soft-blue": { bg: "#f5f9ff", navbar: "#eef4ff", subtle: "#dbe8ff", primary: "#2563eb" },
		mint: { bg: "#f3fff8", navbar: "#e8fff2", subtle: "#c9f0dd", primary: "#059669" },
		"warm-neutral": { bg: "#fffbf5", navbar: "#fff3e3", subtle: "#f0dcc2", primary: "#b45309" },
		"soft-rose": { bg: "#fff7fa", navbar: "#ffeaf3", subtle: "#f8cfe0", primary: "#db2777" },
		"olive-gray": { bg: "#f7f7f2", navbar: "#eef0e6", subtle: "#d6dbc7", primary: "#6b7b3a" },
		"calm-lavender-gray": {
			bg: "#f8f7ff",
			navbar: "#f0effb",
			subtle: "#dcd7f2",
			primary: "#7c3aed",
		},
		"peach-cream": { bg: "#fff7f2", navbar: "#ffeadf", subtle: "#ffd1bf", primary: "#f97316" },
		"aqua-breeze": { bg: "#f3fffe", navbar: "#e6fffd", subtle: "#b6f2ea", primary: "#0f766e" },
		"butter-yellow": { bg: "#fffef5", navbar: "#fff7cc", subtle: "#fde7a6", primary: "#ca8a04" },
	};

	const FONTS = [
		{ key: "system-ui", label: __("System UI") },
		{ key: "serif", label: __("Serif") },
		{ key: "mono", label: __("Monospace") },
		{ key: "nunito", label: __("Nunito (Rounded)") },
		{ key: "fredoka", label: __("Fredoka (Playful)") },
		{ key: "lora", label: __("Lora (Serif)") },
		{ key: "manrope", label: __("Manrope (Modern)") },
		{ key: "quicksand", label: __("Quicksand (Soft)") },
		{ key: "lexend", label: __("Lexend (Readable)") },
	];

	const FONT_STACKS = {
		"": "var(--font-stack)",
		"system-ui":
			'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Helvetica Neue", Arial, sans-serif',
		serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		nunito: `"Nunito", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Helvetica Neue", Arial, sans-serif`,
		fredoka: `"Fredoka", "Nunito", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Helvetica Neue", Arial, sans-serif`,
		lora: `"Lora", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`,
		manrope: `"Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Helvetica Neue", Arial, sans-serif`,
		quicksand: `"Quicksand", "Nunito", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Helvetica Neue", Arial, sans-serif`,
		lexend: `"Lexend", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Helvetica Neue", Arial, sans-serif`,
	};

	const apply_theme = (key) => {
		const root = document.documentElement;
		if (key) {
			root.setAttribute("data-pastel-theme", key);
		} else {
			root.removeAttribute("data-pastel-theme");
		}
	};

	const apply_font = (key) => {
		const root = document.documentElement;
		if (key) {
			root.setAttribute("data-pastel-font", key);
		} else {
			root.removeAttribute("data-pastel-font");
		}
	};

	const get_boot_theme = () => {
		if (!window.frappe?.boot) return "";
		return frappe.boot.pastel_theme || "";
	};

	const get_boot_font = () => {
		if (!window.frappe?.boot) return "";
		return frappe.boot.pastel_font || "";
	};

	const set_theme = (key) => {
		apply_theme(key);

		return frappe
			.xcall("frappe_pastel_theme.api.set_pastel_theme", { theme: key })
			.then((r) => {
				frappe.boot.pastel_theme = r?.pastel_theme || "";
				return r?.pastel_theme || "";
			});
	};

	const set_font = (key) => {
		apply_font(key);

		return frappe.xcall("frappe_pastel_theme.api.set_pastel_font", { font: key }).then((r) => {
			frappe.boot.pastel_font = r?.pastel_font || "";
			return r?.pastel_font || "";
		});
	};

	const render_theme_picker = (root, opts = {}) => {
		const include_default = Boolean(opts.include_default);
		if (!root?.querySelector) return;

		const description_el = root.querySelector(".pastel-theme-description");
		if (description_el && !description_el.textContent) {
			description_el.textContent = __("Choose a theme preset for your account.");
		}

		const grid = root.querySelector(".pastel-theme-grid");
		if (!grid) return;

		const themes = include_default
			? [{ key: "", label: __("Default (Frappe)") }, ...THEMES]
			: [...THEMES];

		const get_current = () => frappe?.boot?.pastel_theme || "";

		const render = (selected_key) => {
			if (grid.replaceChildren) grid.replaceChildren();
			else while (grid.firstChild) grid.removeChild(grid.firstChild);

			themes.forEach((theme) => {
				const swatch = PALETTE[theme.key] || PALETTE[""];
				const card = document.createElement("div");
				card.className = `pastel-theme-card${theme.key === selected_key ? " selected" : ""}`;
				card.style.setProperty("--pt-bg", swatch.bg);
				card.style.setProperty("--pt-navbar", swatch.navbar);
				card.style.setProperty("--pt-subtle", swatch.subtle);
				card.style.setProperty("--pt-primary", swatch.primary);

				const title = document.createElement("div");
				title.className = "pastel-theme-card-title";

				const title_text = document.createElement("div");
				title_text.textContent = theme.label || theme.key;

				const key_text = document.createElement("div");
				key_text.className = "text-muted";
				key_text.textContent = theme.key || "";

				title.appendChild(title_text);
				title.appendChild(key_text);
				card.appendChild(title);

				const preview = document.createElement("div");
				preview.className = "pastel-theme-preview";

				const navbar = document.createElement("div");
				navbar.className = "navbar";

				const body = document.createElement("div");
				body.className = "body";

				const chip = document.createElement("div");
				chip.className = "chip";

				const button = document.createElement("div");
				button.className = "button";

				body.appendChild(chip);
				body.appendChild(button);
				preview.appendChild(navbar);
				preview.appendChild(body);
				card.appendChild(preview);

				card.addEventListener("click", () => {
					if (theme.key === get_current()) return;
					card.classList.add("loading");
					set_theme(theme.key)
						.then((key) => {
							frappe.show_alert(__("Theme saved"), 2);
							render(key);
						})
						.catch((e) => frappe.msgprint(e?.message || e))
						.finally(() => card.classList.remove("loading"));
				});

				grid.appendChild(card);
			});
		};

		render(get_current());
	};

	const render_font_picker = (root, opts = {}) => {
		const include_default = Boolean(opts.include_default);
		if (!root?.querySelector) return;

		const description_el = root.querySelector(".pastel-font-description");
		if (description_el && !description_el.textContent) {
			description_el.textContent = __("Choose a font preset for your account.");
		}

		const grid = root.querySelector(".pastel-font-grid");
		if (!grid) return;

		const fonts = include_default
			? [{ key: "", label: __("Default (Frappe)") }, ...FONTS]
			: [...FONTS];

		const get_current = () => frappe?.boot?.pastel_font || "";

		const render = (selected_key) => {
			if (grid.replaceChildren) grid.replaceChildren();
			else while (grid.firstChild) grid.removeChild(grid.firstChild);

			fonts.forEach((font) => {
				const card = document.createElement("div");
				card.className = `pastel-theme-card${font.key === selected_key ? " selected" : ""}`;

				const title = document.createElement("div");
				title.className = "pastel-theme-card-title";

				const title_text = document.createElement("div");
				title_text.textContent = font.label || font.key;

				const key_text = document.createElement("div");
				key_text.className = "text-muted";
				key_text.textContent = font.key || "";

				title.appendChild(title_text);
				title.appendChild(key_text);
				card.appendChild(title);

				const preview = document.createElement("div");
				preview.className = "pastel-font-preview";

				const sample = document.createElement("div");
				sample.className = "sample";
				sample.textContent = __("Aa Bb Cc 123");
				const stack = FONT_STACKS[font.key] || "";
				if (stack) sample.style.fontFamily = stack;

				const caption = document.createElement("div");
				caption.className = "caption text-muted";
				caption.textContent = __("Sample text");
				if (stack) caption.style.fontFamily = stack;

				preview.appendChild(sample);
				preview.appendChild(caption);
				card.appendChild(preview);

				card.addEventListener("click", () => {
					if (font.key === get_current()) return;
					card.classList.add("loading");
					set_font(font.key)
						.then((key) => {
							frappe.show_alert(__("Font saved"), 2);
							render(key);
						})
						.catch((e) => frappe.msgprint(e?.message || e))
						.finally(() => card.classList.remove("loading"));
				});

				grid.appendChild(card);
			});
		};

		render(get_current());
	};

	window.frappe_pastel_theme = window.frappe_pastel_theme || {};
	window.frappe_pastel_theme.THEMES = THEMES;
	window.frappe_pastel_theme.PALETTE = PALETTE;
	window.frappe_pastel_theme.FONTS = FONTS;
	window.frappe_pastel_theme.FONT_STACKS = FONT_STACKS;
	window.frappe_pastel_theme.apply_theme = apply_theme;
	window.frappe_pastel_theme.apply_font = apply_font;
	window.frappe_pastel_theme.set_theme = set_theme;
	window.frappe_pastel_theme.set_font = set_font;
	window.frappe_pastel_theme.render_theme_picker = render_theme_picker;
	window.frappe_pastel_theme.render_font_picker = render_font_picker;

	apply_theme(get_boot_theme());
	apply_font(get_boot_font());

	frappe.ready(() => {
		if (!frappe?.ui?.toolbar?.add_dropdown_button) return;
		if (frappe.session.user === "Guest") return;

		frappe.ui.toolbar.add_dropdown_button(
			"User",
			__("Theme Settings"),
			() => frappe.set_route("Workspaces", "Theme Settings"),
			"fa fa-paint-brush"
		);
	});
})();
