const { handleRefreshToken } = require("../controllers/refreshTokenController");
const { Router } = require("express");
const router = Router();

router.get("/refreshtoken", handleRefreshToken);

module.exports = router;
