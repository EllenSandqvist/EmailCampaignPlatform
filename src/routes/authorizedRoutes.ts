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
router.post("/campaigns/:campaignId/generate-email", createCampaignEmail);

//get all campaign emails
router.get("/campaigns/:campaignId/generated-emails", getCampaignEmails);

//get campaign by id
router.get(
  "/campaigns/:campaignId/generated-emails/:generatedEmailId",
  getCampaignEmailById
);

export { router };
