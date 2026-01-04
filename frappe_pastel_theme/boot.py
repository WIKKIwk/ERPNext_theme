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

	enable_animations = 1
	if frappe.db.has_column("User", "pastel_enable_animations"):
		enable_animations = frappe.db.get_value("User", frappe.session.user, "pastel_enable_animations") or 0

	bootinfo.pastel_enable_animations = int(enable_animations)

	page_transitions = 0
	if frappe.db.has_column("User", "pastel_page_transitions"):
		page_transitions = frappe.db.get_value("User", frappe.session.user, "pastel_page_transitions") or 0

	bootinfo.pastel_page_transitions = int(page_transitions)

	page_transition_style = ""
	if frappe.db.has_column("User", "pastel_page_transition_style"):
		page_transition_style = (
			frappe.db.get_value("User", frappe.session.user, "pastel_page_transition_style") or ""
		)

	bootinfo.pastel_page_transition_style = page_transition_style

	startup_animation = 1
	if frappe.db.has_column("User", "pastel_startup_animation"):
		startup_animation = frappe.db.get_value("User", frappe.session.user, "pastel_startup_animation") or 0

	bootinfo.pastel_startup_animation = int(startup_animation)
