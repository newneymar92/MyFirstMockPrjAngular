import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../Student';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-editstudents',
  templateUrl: './editstudents.component.html',
  styleUrls: ['./editstudents.component.css'],
})
export class EditstudentsComponent implements OnInit {
  @Input() dataStudent: Student;
  @Output() newItemEvent = new EventEmitter();

  isVisible = false;
  isOkLoading = false;
  formEditStudent: FormGroup;

  listOptionGender = [
    { id: 1, value: 1, label: 'Male' },
    { id: 2, value: 2, label: 'Female' },
    { id: 3, value: 3, label: 'Other' },
  ];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private notiService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formEditStudent = this.fb.group({
      firstname: [this.dataStudent.firstname, [Validators.required]],
      lastname: [this.dataStudent.lastname, [Validators.required]],
      age: [this.dataStudent.age, [Validators.required]],
      gender: [Number(this.dataStudent.gender), [Validators.required]],
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.studentService
      .updateStudent(this.formEditStudent.value, this.dataStudent.id)
      .subscribe((result) => {
        if (result) {
          this.isOkLoading = false;
          this.isVisible = false;
          this.newItemEvent.emit();
          this.notiService.create(
            'success',
            'Update Successfully',
            'You have successfully updated this student'
          );
        }
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }
}
