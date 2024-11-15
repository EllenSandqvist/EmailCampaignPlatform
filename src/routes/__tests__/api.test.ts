// import request from "supertest";
import prisma from "../../db/prisma.js";
import { getCampaigns } from "../../handlers/campaignHandler.js";
import { Request, Response } from "express";
import { jest } from "@jest/globals";
import { Campaign } from "@prisma/client";

// Skapa en mock-modul för prisma
jest.mock("../../db/prisma", () => ({
  __esModule: true,
  default: {
    campaign: {
      findMany: jest.fn(),
    },
  },
}));

// Använd Campaign-typen från Prisma direkt
describe("getCampaigns", () => {
  it("should return campaigns when found", async () => {
    // Mockad kampanjdata som matchar Prisma Campaign-typen
    const mockCampaigns: Partial<Campaign>[] = [
      {
        id: "1",
        campaignName: "Campaign 1",
        userId: "test-user-id",
        // Lägg till andra required fields från Campaign-typen här om det behövs
      },
      {
        id: "2",
        campaignName: "Campaign 2",
        userId: "test-user-id",
        // Lägg till andra required fields från Campaign-typen här om det behövs
      },
    ];

    // Mocka Prisma-anropet
    const mockPrisma = prisma as jest.Mocked<typeof prisma>;
    mockPrisma.campaign.findMany.mockResolvedValue(mockCampaigns as Campaign[]);

    // Mocka req och res
    const req = {
      user: { id: "test-user-id" },
    } as Request;

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // Anropa getCampaigns med mockad req och res
    await getCampaigns(req, res);

    // Verifiera att json-metoden anropades med de mockade kampanjerna
    expect(res.json).toHaveBeenCalledWith(mockCampaigns);
  });
});
