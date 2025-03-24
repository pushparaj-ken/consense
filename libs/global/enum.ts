export enum RoleName {
  ADMIN = 'Admin',
  FLEET = 'Fleet',
  DRIVER = 'Driver',
  CUSTOMER = 'Customer',
}


export enum DamageStatus {
  Report_generated = "Meldung_erzeugt",
  Completed = "Abgeschlossen",
  Repair_completed = "Reparatur_abgeschlossen",
  Submission_to_VR = "Einreichung_bei_VR",
  Accounting = "Buchhaltung",
}

export enum VehicleStatus {
  Delivered_Customer = "Ausgeliefert_Kunde",
  Other = "Sonstiges",
}