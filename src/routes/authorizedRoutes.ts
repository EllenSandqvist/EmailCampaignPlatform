// This file contains the routes that require authorization to access.
import express from "express";

import {
  createCampaign,
  getCampaigns,
  getCampaignById,
} from "../handlers/campaignHandler.js";
import {
  createCampaignEmail,
  getCampaignEmailById,
  getCampaignEmails,
} from "../handlers/emailHandler.js";

import requireAuth from "../middleware/isAuthenticated.js";
import { checkEmail, generatedEmail } from "../handlers/openaiHandler.js";

const router = express.Router();

//middleware checking if user is logged in
router.use(requireAuth);

//---- CAMPAIGN ROUTES ----
router.post("/campaigns", createCampaign);

//get all campaigns
router.get("/campaigns", getCampaigns);

//get campaign by id
router.get("/campaigns/:id", getCampaignById);

//---- EMAIL ROUTES ----
router.post("/campaigns/:campaignId/emails", createCampaignEmail);

//get all campaign emails
router.get("/campaigns/:campaignId/emails", getCampaignEmails);

//get campaign by id
router.get(
  "/campaigns/:campaignId/emails/:generatedEmailId",
  getCampaignEmailById
);
//---- AI GENERATOR ROUTES ----
router.post("/ai/emails", generatedEmail);
router.post("/ai/check", checkEmail);
export { router };
