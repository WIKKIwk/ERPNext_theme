import frappe
from frappe.model.rename_doc import rename_doc


def execute():
	# Old workspace name ("Pastel Theme") clashes with the page route `/app/pastel-theme`.
	# Rename the workspace so the Page loads (and theme switching works).
	workspace_name = "Pastel Theme"

	if not frappe.db.exists("Workspace", workspace_name):
		return

	module = frappe.db.get_value("Workspace", workspace_name, "module")
	if module != "Frappe Pastel Theme":
		return

	base = "Pastel Theme Legacy"
	new_name = base
	if frappe.db.exists("Workspace", new_name):
		if frappe.db.get_value("Workspace", new_name, "module") == "Frappe Pastel Theme":
			frappe.db.set_value("Workspace", new_name, "is_hidden", 1, update_modified=False)
			return

		for i in range(2, 100):
			candidate = f"{base} {i}"
			if not frappe.db.exists("Workspace", candidate):
				new_name = candidate
				break

	rename_doc("Workspace", workspace_name, new_name, force=True, ignore_permissions=True, show_alert=False)
	frappe.db.set_value("Workspace", new_name, "is_hidden", 1, update_modified=False)

