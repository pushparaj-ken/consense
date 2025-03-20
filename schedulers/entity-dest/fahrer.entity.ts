import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Fahrer")
export class Fahrer {
  @PrimaryGeneratedColumn()
  FahrerId: number;

  @Column()
  Anrede: number;

  @Column({ type: "nvarchar", nullable: true })
  Vorname: string;

  @Column({ type: "nvarchar" })
  Nachname: string;

  @Column({ type: "nvarchar", nullable: true })
  KompletterName: string;

  @Column({ type: "nvarchar", nullable: true })
  Zusatz: string;

  @Column({ type: "datetime2", nullable: true })
  Geburtsdatum: Date;

  @Column({ type: "nvarchar", nullable: true })
  Fahrerlaubnis: string;

  @Column({ type: "nvarchar", nullable: true })
  Fahrerklasse: string;

  @Column({ type: "nvarchar", nullable: true })
  Kostenstelle1: string;

  @Column({ type: "nvarchar", nullable: true })
  Kostenstelle2: string;

  @Column({ type: "datetime2", nullable: true })
  Kostenstelle1GültigAb: Date;

  @Column({ type: "datetime2", nullable: true })
  Kostenstelle2GültigAb: Date;

  @Column({ type: "datetime2", nullable: true })
  NutzerVon: Date;

  @Column({ type: "datetime2", nullable: true })
  NutzerBis: Date;

  @Column({ type: "datetime2", nullable: true })
  DatumFührerschein: Date;

  @Column({ type: "bit", nullable: true })
  IstAktiv: boolean;

  @Column({ type: "datetime2", nullable: true })
  IstAktivGueltigAb: Date;

  @Column({ type: "datetime2", nullable: true })
  IstAktivGueltigBis: Date;

  @Column({ type: "int", nullable: true })
  EntfernungWohnungZuArbeitsplatz: number;

  @Column({ type: "datetime2", nullable: true })
  EntfernungWohnungZuArbeitsplatzGültigAb: Date;

  @Column({ type: "nvarchar", nullable: true })
  Abteilung: string;

  @Column({ type: "nvarchar", nullable: true })
  Position: string;

  @Column({ type: "nvarchar", nullable: true })
  Vorgesetzter: string;

  @Column({ type: "float", nullable: true })
  Unternehmenszuschuss: number;

  @Column({ type: "nvarchar", nullable: true })
  KontaktPersonalabteilung: string;

  @Column({ type: "nvarchar", nullable: true })
  AkademischerGrad: string;

  @Column({ type: "nvarchar", nullable: true })
  Personalnummer: string;

  @Column({ type: "datetime2", nullable: true })
  LetzteUnfallverhütungsvorschriftKontrolle: Date;

  @Column({ type: "datetime2", nullable: true })
  NaechsteUnfallverhütungsvorschriftKontrolle: Date;

  @Column({ type: "datetime2", nullable: true })
  LetzteFahrerunterweisung: Date;

  @Column({ type: "datetime2", nullable: true })
  NaechsteFahrerunterweisung: Date;

  @Column({ type: "datetime2", nullable: true })
  LetzteFuehrerscheinKontrolle: Date;

  @Column({ type: "datetime2", nullable: true })
  NaechsteFuehrerscheinkontrolle: Date;

  @Column({ type: "int", nullable: true })
  InNuceFahrerNummer: number;

  @Column({ type: "int", nullable: true })
  KundeTenantItemId: number;

  @Column({ type: "int", nullable: true })
  FahrzeugTenantItemId: number;

  @Column({ type: "nvarchar", nullable: true })
  FahrerklasseName: string;

  @Column({ type: "varchar", nullable: true })
  ExternalDataField: string;

  @Column({ type: "nvarchar", nullable: true })
  DriverCheckId: string;
}
