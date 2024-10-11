import { Request, Response } from "express-serve-static-core";
import prisma from "../db/prisma.js";

const createCampaign = async (req: Request, res: Response) => {
  const {
    campaignName,
    companyName,
    companyDescription,
    productDescription,
    targetAudience,
  } = req.body;
  //we are sure req.user excists due to middleware
  const userId = req.user!.id;
  try {
    const campaign = await prisma.campaign.create({
      data: {
        campaignName,
        companyName,
        companyDescription,
        productDescription,
        targetAudience,
        userId,
      },
    });
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ error: "Unable to create campaign" });
  }
};

const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: { userId: req.user!.id },
    });
    res.json(campaigns);
  } catch (error) {
    res.status(404).json({ error: "Campaigns not found" });
  }
};

const getCampaignById = async (req: Request, res: Response) => {
  const campaignId = req.params.id;

  try {
    //the combination of unique user id and campaign id will result in 1 campaign regardless.
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId, userId: req.user!.id },
    });

    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export { createCampaign, getCampaigns, getCampaignById };
