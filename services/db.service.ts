import { AppDataSource } from "../config/database";

export class DBService {
  static async saveChangesAsync(procedureName: string, parameters: any): Promise<any> {
    try {
      const entityPrefix = parameters.TableName_i.split("_")[1];

      let recordData = parameters.RecordData_i ?? {};

      if (parameters.OperationType_i === 'I') {
        recordData[`${entityPrefix}_CREATEDBY`] = parameters.UserId_i;
        recordData[`${entityPrefix}_CREATEDON`] = new Date();
      } else if (parameters.OperationType_i === 'U') {
        recordData[`${entityPrefix}_MODIFIEDBY`] = parameters.UserId_i;
        recordData[`${entityPrefix}_MODIFIEDON`] = new Date();
      } else if (parameters.OperationType_i === 'D') {
        recordData[`${entityPrefix}_MODIFIEDBY`] = parameters.UserId_i;
        recordData[`${entityPrefix}_MODIFIEDON`] = new Date();
      }

      parameters.RecordData_i = JSON.stringify(recordData);

      const keys = Object.keys(parameters);
      const params = keys.map((key, index) => `@${key} = @${index}`).join(", ");
      const values = Object.values(parameters);

      const query = `EXEC ${procedureName} ${params}`;
      const result = await AppDataSource.query(query, values);

      return result;
    } catch (error: any) {
      console.error(`Error executing procedure ${procedureName}:`, error.message);
      throw new Error(`Failed to execute ${procedureName}: ${error.message}`);
    }
  }


}



