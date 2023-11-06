/**
 * Express entry point
 */

import { app } from "./src/app.js";

const path = require('path');
const envPath = path.resolve(__dirname, '../config/env/config.env')
require('dotenv').config({ path: envPath });

// Automatically select the port for production or development
// 개발 환경인지 배포 환경인지에 따라서 포트를 자동으로 선택합니다.
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`App server successfully running on port ${PORT}...`);
});