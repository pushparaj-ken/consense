import app from '../app';
import { AppDataSource } from "../config/database";
import { config } from "../config/constants";

const PORT = config.PORT || 3000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}).catch((error: any) => console.log(error));
