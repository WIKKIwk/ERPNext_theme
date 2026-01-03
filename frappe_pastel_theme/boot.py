import frappe


def add_pastel_theme_to_bootinfo(bootinfo):
	if frappe.session.user == "Guest":
		return

	theme = ""
	if frappe.db.has_column("User", "pastel_theme"):
		theme = frappe.db.get_value("User", frappe.session.user, "pastel_theme") or ""

	bootinfo.pastel_theme = theme

	font = ""
	if frappe.db.has_column("User", "pastel_font"):
		font = frappe.db.get_value("User", frappe.session.user, "pastel_font") or ""

	bootinfo.pastel_font = font
