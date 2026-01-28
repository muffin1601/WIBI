
import express from "express"
import { sendCatalogueEmail } from "../controllers/emailController.js"
import { sendEnquiryEmail } from "../controllers/emailController.js"

const router = express.Router()

router.post("/send-catalogue-email", sendCatalogueEmail)
router.post("/send-enquiry", sendEnquiryEmail)

export default router
