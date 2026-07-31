const admin = require("firebase-admin");

const initializeFirebase = () => {
  try {
   
    if (admin.apps.length) {
      console.log("✅ Firebase already initialized");
      return;
    }

    const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString("utf-8");
    const serviceAccount = JSON.parse(decoded);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    
    console.log("✅ Firebase initialized successfully");
  } catch (error) {
    console.error("❌ Firebase initialization error:", error);
    console.error("Make sure FB_SERVICE_KEY is properly set in .env file");
    process.exit(1);
  }
};

module.exports = initializeFirebase;