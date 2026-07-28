import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SimpleChange
} from '@angular/core';

import {
  of
} from 'rxjs';

import {
  vi
} from 'vitest';

import {
  CourseCard
} from './course-card';

import {
  EnrollmentService
} from '../../services/enrollment';

describe('CourseCard', () => {

  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const enrollmentServiceMock = {
    enroll: vi.fn(),
    unenroll: vi.fn()
  };

  beforeEach(async () => {

    enrollmentServiceMock.enroll.mockReturnValue(
      of({
        id: 101,
        courseId: 1
      })
    );

    enrollmentServiceMock.unenroll.mockReturnValue(
      of({})
    );

    await TestBed.configureTestingModule({
      imports: [
        CourseCard
      ],

      providers: [
        {
          provide: EnrollmentService,
          useValue: enrollmentServiceMock
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(
        CourseCard
      );

    component =
      fixture.componentInstance;

    component.course = {
      id: 1,
      name: 'Introduction to Programming',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'pending'
    };

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive the course input', () => {
    expect(component.course.name)
      .toBe('Introduction to Programming');

    expect(component.course.code)
      .toBe('CS101');

    expect(component.course.credits)
      .toBe(4);

    expect(component.course.gradeStatus)
      .toBe('pending');
  });

  it('should display the course name', () => {
    const compiled: HTMLElement =
      fixture.nativeElement;

    expect(compiled.textContent)
      .toContain(
        'INTRODUCTION TO PROGRAMMING'
      );
  });

  it('should enrol and emit the course id', () => {
    const emitSpy = vi.spyOn(
      component.enrollRequested,
      'emit'
    );

    component.requestEnrollment();

    expect(
      enrollmentServiceMock.enroll
    ).toHaveBeenCalledWith(1);

    expect(emitSpy)
      .toHaveBeenCalledWith(1);

    expect(component.isEnrolled)
      .toBe(true);

    expect(component.enrollmentId)
      .toBe(101);
  });

  it('should toggle course details', () => {
    expect(component.isExpanded)
      .toBe(false);

    component.toggleDetails();

    expect(component.isExpanded)
      .toBe(true);

    component.toggleDetails();

    expect(component.isExpanded)
      .toBe(false);
  });

  it('should return green for passed course', () => {
    component.course = {
      ...component.course,
      gradeStatus: 'passed'
    };

    expect(component.borderColour)
      .toBe('green');
  });

  it('should return red for failed course', () => {
    component.course = {
      ...component.course,
      gradeStatus: 'failed'
    };

    expect(component.borderColour)
      .toBe('red');
  });

  it('should handle course changes', () => {
    const consoleSpy = vi
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    component.ngOnChanges({
      course: new SimpleChange(
        null,
        component.course,
        true
      )
    });

    expect(consoleSpy)
      .toHaveBeenCalledWith(
        'Current course:',
        component.course
      );
  });

});
