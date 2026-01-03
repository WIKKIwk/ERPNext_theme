import frappe


def execute():
	# Older versions shipped a workspace named "Pastel Theme".
	# Hide it to avoid duplicates after the new "Theme Settings" workspace is added.
	if frappe.db.exists("Workspace", "Pastel Theme"):
		frappe.db.set_value("Workspace", "Pastel Theme", "is_hidden", 1, update_modified=False)

