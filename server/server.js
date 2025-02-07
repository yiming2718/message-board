// 引入模組
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

// 初始化環境變數
dotenv.config();

const app = express();

// CORS 設定，只允許 GitHub Pages
const corsOptions = {
    origin: "https://yiming2718.github.io",
    methods: "GET, POST, OPTIONS",
    allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json()); // 解析 JSON

// 初始化 Firebase Admin SDK
try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://bulletin-board-f2c1c-default-rtdb.asia-southeast1.firebasedatabase.app",
    });
} catch (error) {
    console.error("❌ Firebase 初始化失敗:", error);
}

const db = admin.firestore();

// 📨 提交留言
app.post("/messages", async (req, res) => {
    const { name, content } = req.body;
    console.log("📩 收到留言:", { name, content });

    if (!content) return res.status(400).json({ error: "留言內容不能為空" });

    try {
        await db.collection("messages").add({
            name: name || "匿名",
            content,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log("✅ 留言儲存成功！");
        res.status(200).json({ success: true, message: "留言成功" });
    } catch (error) {
        console.error("❌ 留言儲存失敗:", error);
        res.status(500).json({ error: "留言儲存失敗" });
    }
});

// 📜 讀取留言
app.get("/messages", async (req, res) => {
    try {
        const snapshot = await db.collection("messages").orderBy("timestamp", "desc").get();
        const messages = snapshot.docs.map((doc) => doc.data());

        res.json(messages);
    } catch (error) {
        console.error("❌ 無法獲取留言:", error);
        res.status(500).json({ error: "無法獲取留言" });
    }
});

// 根路由
app.get("/", (req, res) => {
    res.send("🐾 嗷嗷～匿名留言板伺服器跑起來了！🚀");
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 伺服器運行中，監聽 ${PORT} 端口`));
