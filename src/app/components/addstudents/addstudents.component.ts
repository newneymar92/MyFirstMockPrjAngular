import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-addstudents',
  templateUrl: './addstudents.component.html',
  styleUrls: ['./addstudents.component.css'],
})
export class AddstudentsComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter();
  isVisible = false;
  isOkLoading = false;
  formAddStudent!: FormGroup;

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
    this.formAddStudent = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      age: [null, [Validators.required]],
      gender: [null, [Validators.required]],
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.studentService
      .addStudent(this.formAddStudent.value)
      .subscribe((result) => {
        if (result) {
          this.isOkLoading = false;
          this.isVisible = false;
          this.newItemEvent.emit();
          this.notiService.create(
            'success',
            'Create Successfully',
            'You have successfully created a new student'
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
