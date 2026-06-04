import { Injectable } from "@nestjs/common";

@Injectable()
export class CoursesService {
  findLearnerCourses() {
    return [
      {
        id: "course-1",
        title: "Parcours IA générative",
        progress: 38,
        modules: 6,
        certificateEligible: true
      }
    ];
  }
}
