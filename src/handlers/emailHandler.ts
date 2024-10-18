import { Request, Response } from "express-serve-static-core";
import prisma from "../db/prisma.js";

const createCampaignEmail = async (req: Request, res: Response) => {
  const { subject, content } = req.body;
  const campaignId = req.params.campaignId;
  try {
    const email = await prisma.generatedEmail.create({
      data: {
        subject,
        content,
        campaignId,
      },
    });
    res.json(email);
  } catch (error) {
    res.status(400).json({ error: "Unable to create email" });
  }
};

const getCampaignEmails = async (req: Request, res: Response) => {
  const selectedCampaignId = req.params.campaignId;
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: selectedCampaignId, userId: req.user!.id },
    });

    if (!campaign) {
      throw new Error("No campaign found!");
    }
    const emails = await prisma.generatedEmail.findMany({
      where: { campaignId: selectedCampaignId },
    });
    res.json(emails);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const getCampaignEmailById = async (req: Request, res: Response) => {
  const emailId = req.params.generatedEmailId;
  const selectedCampaignId = req.params.campaignId;

  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: selectedCampaignId, userId: req.user!.id },
    });

    if (!campaign) {
      throw new Error("No campaign found!");
    }

    const email = await prisma.generatedEmail.findUnique({
      where: { id: emailId, campaignId: selectedCampaignId },
    });

    res.json(email);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
export { createCampaignEmail, getCampaignEmails, getCampaignEmailById };
