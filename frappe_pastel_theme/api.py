import frappe
from frappe import _


ALLOWED_THEMES = {
	"",
	"soft-blue",
	"mint",
	"warm-neutral",
	"soft-rose",
	"olive-gray",
	"calm-lavender-gray",
	"peach-cream",
	"aqua-breeze",
	"butter-yellow",
}
ALLOWED_FONTS = {"", "system-ui", "serif", "mono", "nunito", "fredoka", "lora", "manrope", "quicksand", "lexend"}


def _to_check(value, default=0) -> int:
	try:
		return 1 if int(value or 0) else 0
	except (TypeError, ValueError):
		return int(default)


@frappe.whitelist()
def set_pastel_theme(theme: str | None = ""):
	if frappe.session.user == "Guest":
		frappe.throw(_("Not permitted"), frappe.PermissionError)

	theme = (theme or "").strip()
	if theme not in ALLOWED_THEMES:
		frappe.throw(_("Invalid pastel theme."), frappe.ValidationError)

	if not frappe.db.has_column("User", "pastel_theme"):
		frappe.throw(_("Pastel Theme field is missing. Please run `bench migrate`."), frappe.ValidationError)

	frappe.db.set_value("User", frappe.session.user, "pastel_theme", theme, update_modified=False)
	return {"pastel_theme": theme}


@frappe.whitelist()
def set_pastel_font(font: str | None = ""):
	if frappe.session.user == "Guest":
		frappe.throw(_("Not permitted"), frappe.PermissionError)

	font = (font or "").strip()
	if font not in ALLOWED_FONTS:
		frappe.throw(_("Invalid pastel font."), frappe.ValidationError)

	if not frappe.db.has_column("User", "pastel_font"):
		frappe.throw(_("Pastel Font field is missing. Please run `bench migrate`."), frappe.ValidationError)

	frappe.db.set_value("User", frappe.session.user, "pastel_font", font, update_modified=False)
	return {"pastel_font": font}


@frappe.whitelist()
def set_pastel_enable_animations(enabled: int | None = 1):
	if frappe.session.user == "Guest":
		frappe.throw(_("Not permitted"), frappe.PermissionError)

	if not frappe.db.has_column("User", "pastel_enable_animations"):
		frappe.throw(_("Animations field is missing. Please run `bench migrate`."), frappe.ValidationError)

	value = _to_check(enabled, default=1)
	frappe.db.set_value("User", frappe.session.user, "pastel_enable_animations", value, update_modified=False)
	return {"pastel_enable_animations": value}


@frappe.whitelist()
def set_pastel_page_transitions(enabled: int | None = 0):
	if frappe.session.user == "Guest":
		frappe.throw(_("Not permitted"), frappe.PermissionError)

	if not frappe.db.has_column("User", "pastel_page_transitions"):
		frappe.throw(_("Page transitions field is missing. Please run `bench migrate`."), frappe.ValidationError)

	value = _to_check(enabled, default=0)
	frappe.db.set_value("User", frappe.session.user, "pastel_page_transitions", value, update_modified=False)
	return {"pastel_page_transitions": value}


@frappe.whitelist()
def set_pastel_page_transition_style(style: str | None = ""):
	if frappe.session.user == "Guest":
		frappe.throw(_("Not permitted"), frappe.PermissionError)

	style = (style or "").strip()
	allowed = {"", "soft", "slide", "zoom", "glide", "stack"}
	if style not in allowed:
		frappe.throw(_("Invalid page transition style."), frappe.ValidationError)

	if not frappe.db.has_column("User", "pastel_page_transition_style"):
		frappe.throw(_("Page transition style field is missing. Please run `bench migrate`."), frappe.ValidationError)

	frappe.db.set_value("User", frappe.session.user, "pastel_page_transition_style", style, update_modified=False)
	return {"pastel_page_transition_style": style}


@frappe.whitelist()
def set_pastel_startup_animation(enabled: int | None = 1):
	if frappe.session.user == "Guest":
		frappe.throw(_("Not permitted"), frappe.PermissionError)

	if not frappe.db.has_column("User", "pastel_startup_animation"):
		frappe.throw(_("Startup animation field is missing. Please run `bench migrate`."), frappe.ValidationError)

	value = _to_check(enabled, default=1)
	frappe.db.set_value("User", frappe.session.user, "pastel_startup_animation", value, update_modified=False)
	return {"pastel_startup_animation": value}
