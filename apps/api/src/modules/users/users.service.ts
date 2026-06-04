import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  getCurrentUser() {
    return {
      id: "demo-user",
      fullName: "Demo Learner",
      email: "learner@beyond-expertise.com",
      roles: ["LEARNER"],
      company: "Beyond Expertise"
    };
  }
}
