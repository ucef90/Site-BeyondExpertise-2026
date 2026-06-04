import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/prisma.service";

@Injectable()
export class TrainingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const trainings = await this.prisma.training.findMany({
      where: {
        isPublished: true
      },
      include: {
        categories: {
          include: {
            category: true
          }
        },
        sessions: {
          where: {
            status: "OPEN"
          },
          orderBy: {
            startDate: "asc"
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return trainings.map((training) => ({
      id: training.id,
      slug: training.slug,
      title: training.title,
      summary: training.summary,
      objectives: training.objectives,
      audience: training.audience,
      prerequisites: training.prerequisites,
      program: training.program,
      durationDays: training.durationDays,
      format: training.format,
      level: training.level,
      priceFromCents: training.priceFromCents,
      category: training.categories[0]?.category.name ?? "Catalogue",
      nextSessionDate: training.sessions[0]?.startDate ?? null
    }));
  }

  async findOneBySlug(slug: string) {
    const training = await this.prisma.training.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            category: true
          }
        },
        sessions: {
          orderBy: {
            startDate: "asc"
          },
          take: 3
        },
        documents: true
      }
    });

    if (!training) {
      return null;
    }

    return {
      id: training.id,
      slug: training.slug,
      title: training.title,
      summary: training.summary,
      description: training.description,
      objectives: training.objectives,
      audience: training.audience,
      prerequisites: training.prerequisites,
      program: training.program,
      durationDays: training.durationDays,
      format: training.format,
      level: training.level,
      priceFromCents: training.priceFromCents,
      category: training.categories[0]?.category.name ?? "Catalogue",
      sessions: training.sessions,
      documents: training.documents
    };
  }
}
