import frappe
from frappe import _


ALLOWED_THEMES = {"", "soft-blue", "mint", "warm-neutral", "soft-rose", "olive-gray", "calm-lavender-gray"}
ALLOWED_FONTS = {"", "system-ui", "serif", "mono", "nunito", "fredoka", "lora"}


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
