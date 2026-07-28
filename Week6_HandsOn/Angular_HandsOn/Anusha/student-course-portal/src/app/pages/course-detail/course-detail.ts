import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  Course
} from '../../models/course.model';

import {
  CourseService
} from '../../services/course';

@Component({
  selector: 'app-course-detail',
  imports: [
    RouterLink
  ],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetail
  implements OnInit {

  course: Course | undefined;

  isLoading = true;

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    const id =
      this.route.snapshot
        .paramMap
        .get('id');

    if (id === null) {
      this.errorMessage =
        'Invalid course ID.';

      this.isLoading = false;
      return;
    }

    this.courseService
      .getCourseById(id)
      .subscribe({
        next: course => {
          this.course = course;
        },

        error: error => {
          this.errorMessage =
            error.message;

          this.isLoading = false;
        },

        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
