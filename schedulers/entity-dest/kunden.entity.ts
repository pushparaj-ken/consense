import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Kunden {
  @PrimaryGeneratedColumn()
  TenantItemId: number;

  @Column({ type: "int", nullable: true })
  Anrede: number;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  Vorname: string;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  Nachname: string;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  Firmenbezeichnung: string;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  NameNiederlassung: string;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  Vertragsnummer: string;

  @Column({ type: "bit", nullable: false })
  OnlineZugang: boolean;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  Domain: string;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  BetreuendeEinheit: string;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  InNuceKndNr: string;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  InNuceMatchCode: string;

  @Column({ type: "bit", nullable: true })
  IstAktiv: boolean;

  @Column({ type: "datetime2", precision: 7, nullable: true })
  IstAktivGueltigAb: Date;

  @Column({ type: "datetime2", precision: 7, nullable: true })
  IstAktivGueltigBis: Date;

  @Column({ type: "int", nullable: true })
  KonzernId: number;

  @Column({ type: "bit", nullable: false })
  IstFuhrparkmanagement: boolean;

  @Column({ type: "varchar", length: "MAX", nullable: true })
  ExternalDataField: string;

  @Column({ type: "bit", nullable: false })
  Dokumentueberwachung: boolean;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  Kundenbetreuer: string;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  AkquiseStatus: string;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  KontaktTyp: string;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  DriverCheckId: string;
}
