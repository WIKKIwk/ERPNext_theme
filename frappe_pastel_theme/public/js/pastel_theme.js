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

	const ICONS = {
		animations: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M12 2l1.4 4.2L18 8l-4.6 1.8L12 14l-1.4-4.2L6 8l4.6-1.8L12 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M19 13l.9 2.6L22 16.5l-2.1.9L19 20l-.9-2.6L16 16.5l2.1-.9L19 13z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
		transitions: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M4 12h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M14 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
		startup: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M21 12a9 9 0 11-3.1-6.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M21 3v6h-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	};

	const PAGE_TRANSITION_STYLES = [
		{ key: "soft", label: __("Soft") },
		{ key: "slide", label: __("Slide") },
		{ key: "zoom", label: __("Zoom") },
		{ key: "glide", label: __("Glide") },
		{ key: "stack", label: __("Stack") },
	];

	const to_bool = (value, default_value = false) => {
		if (value === null || value === undefined) return Boolean(default_value);
		if (typeof value === "boolean") return value;
		const s = String(value).trim().toLowerCase();
		if (!s) return Boolean(default_value);
		return s === "1" || s === "true" || s === "yes" || s === "on";
	};

	const prefers_reduced_motion = () => {
		try {
			return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		} catch (e) {
			return false;
		}
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

	const apply_enable_animations = (enabled) => {
		document.documentElement.setAttribute("data-pastel-animations", enabled ? "1" : "0");
	};

	const apply_page_transitions = (enabled) => {
		document.documentElement.setAttribute("data-pastel-page-transitions", enabled ? "1" : "0");
	};

	const apply_startup_animation = (enabled) => {
		document.documentElement.setAttribute("data-pastel-startup-animation", enabled ? "1" : "0");
	};

	const apply_page_transition_style = (key) => {
		const valid = new Set(PAGE_TRANSITION_STYLES.map((s) => s.key));
		const style = valid.has(key) ? key : "soft";
		document.documentElement.setAttribute("data-pastel-page-transition-style", style);
	};

	const get_boot_theme = () => {
		if (!window.frappe?.boot) return "";
		return frappe.boot.pastel_theme || "";
	};

	const get_boot_font = () => {
		if (!window.frappe?.boot) return "";
		return frappe.boot.pastel_font || "";
	};

	const get_boot_enable_animations = () => {
		if (!window.frappe?.boot) return true;
		return to_bool(frappe.boot.pastel_enable_animations, true);
	};

	const get_boot_page_transitions = () => {
		if (!window.frappe?.boot) return false;
		return to_bool(frappe.boot.pastel_page_transitions, false);
	};

	const get_boot_startup_animation = () => {
		if (!window.frappe?.boot) return true;
		return to_bool(frappe.boot.pastel_startup_animation, true);
	};

	const get_boot_page_transition_style = () => {
		if (!window.frappe?.boot) return "soft";
		const key = (frappe.boot.pastel_page_transition_style || "").trim();
		const valid = new Set(PAGE_TRANSITION_STYLES.map((s) => s.key));
		return valid.has(key) ? key : "soft";
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

	const set_enable_animations = (enabled) => {
		const next = Boolean(enabled);
		const prev = get_boot_enable_animations();
		apply_enable_animations(next);

		return frappe
			.xcall("frappe_pastel_theme.api.set_pastel_enable_animations", { enabled: next ? 1 : 0 })
			.then((r) => {
				const value = to_bool(r?.pastel_enable_animations, next);
				frappe.boot.pastel_enable_animations = value ? 1 : 0;
				return value;
			})
			.catch((e) => {
				apply_enable_animations(prev);
				throw e;
			});
	};

	const set_page_transitions = (enabled) => {
		const next = Boolean(enabled);
		const prev = get_boot_page_transitions();
		apply_page_transitions(next);

		return frappe
			.xcall("frappe_pastel_theme.api.set_pastel_page_transitions", { enabled: next ? 1 : 0 })
			.then((r) => {
				const value = to_bool(r?.pastel_page_transitions, next);
				frappe.boot.pastel_page_transitions = value ? 1 : 0;
				return value;
			})
			.catch((e) => {
				apply_page_transitions(prev);
				throw e;
			});
	};

	const set_startup_animation = (enabled) => {
		const next = Boolean(enabled);
		const prev = get_boot_startup_animation();
		apply_startup_animation(next);

		return frappe
			.xcall("frappe_pastel_theme.api.set_pastel_startup_animation", { enabled: next ? 1 : 0 })
			.then((r) => {
				const value = to_bool(r?.pastel_startup_animation, next);
				frappe.boot.pastel_startup_animation = value ? 1 : 0;
				return value;
			})
			.catch((e) => {
				apply_startup_animation(prev);
				throw e;
			});
	};

	const set_page_transition_style = (key) => {
		const valid = new Set(PAGE_TRANSITION_STYLES.map((s) => s.key));
		const next = valid.has(key) ? key : "soft";
		const prev = get_boot_page_transition_style();
		apply_page_transition_style(next);

		return frappe
			.xcall("frappe_pastel_theme.api.set_pastel_page_transition_style", { style: next })
			.then((r) => {
				const stored = (r?.pastel_page_transition_style || "").trim();
				const value = valid.has(stored) ? stored : next;
				frappe.boot.pastel_page_transition_style = value;
				apply_page_transition_style(value);
				return value;
			})
			.catch((e) => {
				apply_page_transition_style(prev);
				throw e;
			});
	};

	const apply_local_preferences = (root) => {
		const page = root?.classList?.contains?.("pastel-theme-page")
			? root
			: root?.querySelector?.(".pastel-theme-page");
		if (!page) return;

		page.setAttribute("data-pt-animations", get_boot_enable_animations() ? "1" : "0");
		page.setAttribute("data-pt-page-transitions", get_boot_page_transitions() ? "1" : "0");
		page.setAttribute("data-pt-transition-style", get_boot_page_transition_style());
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

	const render_animations_picker = (root) => {
		if (!root?.querySelector) return;

		const description_el = root.querySelector(".pastel-animations-description");
		if (description_el && !description_el.textContent) {
			description_el.textContent = __("Control motion and page transitions.");
		}

		const grid = root.querySelector(".pastel-animations-grid");
		if (!grid) return;

		const render = ({ enable_animations, page_transitions, transition_style, startup_animation }) => {
			if (grid.replaceChildren) grid.replaceChildren();
			else while (grid.firstChild) grid.removeChild(grid.firstChild);

			const cards = [
				{
					key: "enable_animations",
					label: __("Animations"),
					desc: __("Smooth UI micro-interactions."),
					enabled: enable_animations,
					setter: (next) => set_enable_animations(next),
					icon: ICONS.animations,
				},
				{
					key: "page_transitions",
					label: __("Page transitions"),
					desc: __("Animate page-to-page navigation."),
					enabled: page_transitions,
					setter: (next) => set_page_transitions(next),
					disabled: !enable_animations,
					disabled_hint: __("Enable Animations first."),
					icon: ICONS.transitions,
				},
				{
					key: "startup_animation",
					label: __("Refresh animation"),
					desc: __("Show a nice intro on page reload."),
					enabled: startup_animation,
					setter: (next) => set_startup_animation(next),
					disabled: !enable_animations,
					disabled_hint: __("Enable Animations first."),
					icon: ICONS.startup,
				},
			];

			cards.forEach((cfg) => {
				const card = document.createElement("div");
				card.className = `pastel-option-card${cfg.enabled ? " selected" : ""}${
					cfg.disabled ? " disabled" : ""
				}`;

				const title = document.createElement("div");
				title.className = "pastel-option-card-title";

				const left = document.createElement("div");
				left.className = "pastel-option-left";

				const icon = document.createElement("div");
				icon.className = "pastel-option-icon";
				icon.innerHTML = cfg.icon || ICONS.animations;

				const text = document.createElement("div");
				const label = document.createElement("div");
				label.textContent = cfg.label;
				const desc = document.createElement("div");
				desc.className = "text-muted";
				desc.textContent = cfg.disabled ? cfg.disabled_hint : cfg.desc;

				text.appendChild(label);
				text.appendChild(desc);
				left.appendChild(icon);
				left.appendChild(text);

				const toggle = document.createElement("button");
				toggle.type = "button";
				toggle.className = `pastel-switch${cfg.enabled ? " on" : ""}`;
				toggle.setAttribute("role", "switch");
				toggle.setAttribute("aria-checked", cfg.enabled ? "true" : "false");
				toggle.disabled = Boolean(cfg.disabled);

				title.appendChild(left);
				title.appendChild(toggle);
				card.appendChild(title);

				const do_toggle = () => {
					if (cfg.disabled) return;
					if (card.classList.contains("loading")) return;
					card.classList.add("loading");
					cfg.setter(!cfg.enabled)
						.then((next) => {
							const updated = {
								enable_animations:
									cfg.key === "enable_animations" ? Boolean(next) : Boolean(enable_animations),
								page_transitions:
									cfg.key === "page_transitions" ? Boolean(next) : Boolean(page_transitions),
								startup_animation:
									cfg.key === "startup_animation" ? Boolean(next) : Boolean(startup_animation),
								transition_style,
							};
							frappe.show_alert(__("Saved"), 2);
							render(updated);
							apply_local_preferences(root);
						})
						.catch((e) => frappe.msgprint(e?.message || e))
						.finally(() => card.classList.remove("loading"));
				};

				card.addEventListener("click", do_toggle);
				toggle.addEventListener("click", (e) => {
					e.stopPropagation();
					do_toggle();
				});

				grid.appendChild(card);
			});

			const style_section = document.createElement("div");
			style_section.className = "pastel-transition-style";
			style_section.style.gridColumn = "1 / -1";

			const style_head = document.createElement("div");
			style_head.className = "pastel-transition-style-head";

			const style_title = document.createElement("div");
			style_title.className = "pastel-transition-style-title";
			style_title.textContent = __("Transition style");

			const style_hint = document.createElement("div");
			style_hint.className = "text-muted pastel-transition-style-hint";

			const style_disabled = !enable_animations || !page_transitions;
			style_hint.textContent = style_disabled
				? __("Enable Page transitions to pick a style.")
				: __("Pick the feel you like.");

			style_head.appendChild(style_title);
			style_head.appendChild(style_hint);

			const style_grid = document.createElement("div");
			style_grid.className = `pastel-transition-style-grid${style_disabled ? " disabled" : ""}`;

			PAGE_TRANSITION_STYLES.forEach((s) => {
				const card = document.createElement("div");
				card.className = `pastel-transition-card${s.key === transition_style ? " selected" : ""}${
					style_disabled ? " disabled" : ""
				}`;
				card.setAttribute("data-style", s.key);

				const label = document.createElement("div");
				label.className = "pastel-transition-card-label";
				label.textContent = s.label;

				const preview = document.createElement("div");
				preview.className = "pastel-transition-preview";

				const preview_page = document.createElement("div");
				preview_page.className = "pt-preview-page";

				const preview_bar = document.createElement("div");
				preview_bar.className = "pt-preview-bar";

				preview.appendChild(preview_bar);
				preview.appendChild(preview_page);

				card.appendChild(label);
				card.appendChild(preview);

				card.addEventListener("click", () => {
					if (style_disabled) return;
					if (s.key === transition_style) return;
					card.classList.add("loading");
					set_page_transition_style(s.key)
						.then((next) => {
							frappe.show_alert(__("Saved"), 2);
							render({ enable_animations, page_transitions, transition_style: next, startup_animation });
							apply_local_preferences(root);
						})
						.catch((e) => frappe.msgprint(e?.message || e))
						.finally(() => card.classList.remove("loading"));
				});

				style_grid.appendChild(card);
			});

			style_section.appendChild(style_head);
			style_section.appendChild(style_grid);
			grid.appendChild(style_section);
		};

		render({
			enable_animations: get_boot_enable_animations(),
			page_transitions: get_boot_page_transitions(),
			transition_style: get_boot_page_transition_style(),
			startup_animation: get_boot_startup_animation(),
		});
	};

	const setup_startup_overlay = () => {
		if (window.__frappe_pastel_theme_startup_overlay) return;
		window.__frappe_pastel_theme_startup_overlay = true;

		const is_app_path = () => {
			const path = window.location?.pathname || "";
			return path === "/app" || path.startsWith("/app/");
		};

		const should_show = () => {
			const root = document.documentElement;
			if (!is_app_path()) return false;
			if (prefers_reduced_motion()) return false;
			if (!to_bool(root.getAttribute("data-pastel-animations"), true)) return false;
			if (!to_bool(root.getAttribute("data-pastel-startup-animation"), true)) return false;
			if (window.Cypress) return false;
			return true;
		};

		const create_overlay = () => {
			if (!should_show()) return null;
			if (document.getElementById("pt-startup-overlay")) return null;

			const overlay = document.createElement("div");
			overlay.id = "pt-startup-overlay";
			overlay.className = "pt-startup-overlay";
			overlay.setAttribute("role", "status");
			overlay.setAttribute("aria-live", "polite");
			overlay.innerHTML = `
				<div class="pt-startup-card">
					<div class="pt-startup-mark" aria-hidden="true"></div>
					<div class="pt-startup-title">${__("Loading")}</div>
					<div class="pt-startup-dots" aria-hidden="true">
						<span></span><span></span><span></span>
					</div>
				</div>
			`;

			const attach = () => {
				if (!document.body) return false;
				document.body.appendChild(overlay);
				return true;
			};

			if (!attach()) {
				document.addEventListener("DOMContentLoaded", () => attach(), { once: true });
			}

			return overlay;
		};

		const hide_overlay = () => {
			const overlay = document.getElementById("pt-startup-overlay");
			if (!overlay) return;
			if (overlay.classList.contains("pt-startup-overlay--hide")) return;

			overlay.classList.add("pt-startup-overlay--hide");
			try {
				document.body?.classList?.add("pt-startup-reveal");
				setTimeout(() => document.body?.classList?.remove("pt-startup-reveal"), 700);
			} catch (e) {
				// ignore
			}

			const remove = () => {
				try {
					overlay.remove();
				} catch (e) {
					// ignore
				}
			};

			overlay.addEventListener("transitionend", remove, { once: true });
			setTimeout(remove, 900);
		};

		const overlay = create_overlay();
		if (!overlay) return;

		const bind = () => {
			if (window.jQuery) {
				const $doc = window.jQuery(document);
				const done = () => {
					$doc.off("page-change", done);
					$doc.off("app_ready", done);
					hide_overlay();
				};
				$doc.on("page-change", done);
				$doc.on("app_ready", done);
			} else {
				window.addEventListener("load", () => setTimeout(hide_overlay, 100), { once: true });
			}

			setTimeout(hide_overlay, 2500);
		};

		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", bind, { once: true });
		} else {
			bind();
		}
	};

	const setup_page_transitions = () => {
		if (window.__frappe_pastel_theme_page_transitions) return;
		window.__frappe_pastel_theme_page_transitions = true;

		const should_animate = () => {
			const root = document.documentElement;
			if (prefers_reduced_motion()) return false;
			if (!to_bool(root.getAttribute("data-pastel-animations"), true)) return false;
			if (!to_bool(root.getAttribute("data-pastel-page-transitions"), false)) return false;
			return true;
		};

		const animate_page_enter = (page) => {
			if (!page?.classList) return;
			page.classList.remove("pt-page-enter");
			requestAnimationFrame(() => {
				page.classList.add("pt-page-enter");
			});
			page.addEventListener(
				"animationend",
				() => {
					page.classList.remove("pt-page-enter");
				},
				{ once: true }
			);
		};

		const patch = () => {
			const proto = window.frappe?.views?.Container?.prototype;
			if (!proto?.change_to) return false;
			if (proto.__pastel_patched_change_to) return true;
			proto.__pastel_patched_change_to = true;

			const original = proto.change_to;
			proto.change_to = function (label) {
				if (should_animate() && typeof document.startViewTransition === "function") {
					let result;
					try {
						document.startViewTransition(() => {
							result = original.call(this, label);
						});
						return result;
					} catch (e) {
						// fall back below
					}
				}

				const page = original.call(this, label);
				if (should_animate()) animate_page_enter(page);
				return page;
			};

			return true;
		};

		if (patch()) return;
		let tries = 0;
		const timer = setInterval(() => {
			tries += 1;
			if (patch() || tries > 50) clearInterval(timer);
		}, 100);
	};

	window.frappe_pastel_theme = window.frappe_pastel_theme || {};
	window.frappe_pastel_theme.THEMES = THEMES;
	window.frappe_pastel_theme.PALETTE = PALETTE;
	window.frappe_pastel_theme.FONTS = FONTS;
	window.frappe_pastel_theme.FONT_STACKS = FONT_STACKS;
	window.frappe_pastel_theme.apply_theme = apply_theme;
	window.frappe_pastel_theme.apply_font = apply_font;
	window.frappe_pastel_theme.apply_enable_animations = apply_enable_animations;
	window.frappe_pastel_theme.apply_page_transitions = apply_page_transitions;
	window.frappe_pastel_theme.apply_startup_animation = apply_startup_animation;
	window.frappe_pastel_theme.apply_page_transition_style = apply_page_transition_style;
	window.frappe_pastel_theme.set_theme = set_theme;
	window.frappe_pastel_theme.set_font = set_font;
	window.frappe_pastel_theme.set_enable_animations = set_enable_animations;
	window.frappe_pastel_theme.set_page_transitions = set_page_transitions;
	window.frappe_pastel_theme.set_startup_animation = set_startup_animation;
	window.frappe_pastel_theme.set_page_transition_style = set_page_transition_style;
	window.frappe_pastel_theme.render_theme_picker = render_theme_picker;
	window.frappe_pastel_theme.render_font_picker = render_font_picker;
	window.frappe_pastel_theme.render_animations_picker = render_animations_picker;
	window.frappe_pastel_theme.apply_local_preferences = apply_local_preferences;
	window.frappe_pastel_theme.PAGE_TRANSITION_STYLES = PAGE_TRANSITION_STYLES;

	apply_theme(get_boot_theme());
	apply_font(get_boot_font());
	apply_enable_animations(get_boot_enable_animations());
	apply_page_transitions(get_boot_page_transitions());
	apply_startup_animation(get_boot_startup_animation());
	apply_page_transition_style(get_boot_page_transition_style());
	setup_startup_overlay();
	setup_page_transitions();

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
