import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(payload: RegisterDto) {
    return {
      message: "User registration flow initialized.",
      user: {
        id: "demo-user",
        fullName: payload.fullName,
        email: payload.email,
        companyName: payload.companyName ?? null
      }
    };
  }

  async login(payload: LoginDto) {
    const accessTtl = process.env.JWT_ACCESS_TTL || "15m";
    const refreshTtl = process.env.JWT_REFRESH_TTL || "7d";

    const accessToken = await this.jwtService.signAsync(
      { sub: "demo-user", email: payload.email, roles: ["LEARNER"] },
      {
        secret: process.env.JWT_ACCESS_SECRET || "change-me",
        expiresIn: accessTtl as any
      }
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: "demo-user", type: "refresh" },
      {
        secret: process.env.JWT_REFRESH_SECRET || "change-me-too",
        expiresIn: refreshTtl as any
      }
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: "demo-user",
        email: payload.email,
        roles: ["LEARNER"]
      }
    };
  }
}
