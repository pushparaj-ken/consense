import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Adresse")
export class Adresse {
  @PrimaryGeneratedColumn()
  AdresseId: number;

  @Column({ type: "nvarchar", nullable: true })
  Strasse: string;

  @Column({ type: "nvarchar", nullable: true })
  Plz: string;

  @Column({ type: "nvarchar", nullable: true })
  Ort: string;

  @Column({ type: "nvarchar" })
  Land: string;

  @Column({ type: "bit", nullable: true })
  IstAktiv: boolean;

  @Column({ type: "datetime2", nullable: true })
  IstAktivGueltigAb: Date;

  @Column({ type: "datetime2", nullable: true })
  IstAktivGueltigBis: Date;

  @Column({ type: "nvarchar" })
  AdressTyp: string;

  @Column({ type: "nvarchar", nullable: true })
  Oertlichkeit: string;

  @Column({ type: "nvarchar", nullable: true })
  Info: string;

  @Column({ type: "geography", nullable: true })
  Location: string;

  @Column({ type: "float", nullable: true })
  X: number;

  @Column({ type: "float", nullable: true })
  Y: number;

  @Column({ type: "nvarchar", nullable: true })
  Emailadresse: string;

  @Column({ type: "nvarchar", nullable: true })
  Telefonnummer: string;

  @Column({ type: "nvarchar", nullable: true })
  Faxnummer: string;

  @Column({ type: "nvarchar", nullable: true })
  Mobilnummer: string;

  @Column({ type: "int", nullable: true })
  FahrerId: number;

  @Column({ type: "int", nullable: true })
  SchadenId: number;

  @Column({ type: "int", nullable: true })
  KundeTenantItemId: number;

  @Column({ type: "int", nullable: true })
  WerkstattId: number;

  @Column({ type: "int", nullable: true })
  DienstleisterId: number;

  @Column({ type: "nvarchar", nullable: true })
  InnuceId: string;

  @Column({ type: "int", nullable: true })
  FahrzeugTenantItemId: number;

  @Column({ type: "int", nullable: true })
  KontaktBeziehungId: number;

  @Column({ type: "int", nullable: true })
  KontaktBeziehungId1: number;

  @Column({ type: "int" })
  AdressVerweis: number;

  @Column({ type: "bit", nullable: true })
  Automatik: boolean;
}
