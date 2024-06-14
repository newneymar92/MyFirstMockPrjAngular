import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Student } from '../../Student';
import { StudentsService } from '../../services/students.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-deletestudents',
  templateUrl: './deletestudents.component.html',
  styleUrls: ['./deletestudents.component.css'],
})
export class DeletestudentsComponent implements OnInit {
  confirmModal?: NzModalRef;
  @Input() dataStudent: Student;
  @Output() newItemEvent = new EventEmitter();

  constructor(
    private modal: NzModalService,
    private studentService: StudentsService,
    private notiService: NzNotificationService
  ) {}

  handleDeleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe((result) => {
      if (result) {
        this.newItemEvent.emit();
        this.notiService.create(
          'success',
          'Delete Successfully',
          'You have successfully deleted a student'
        );
      }
    });
  }

  showDeleteConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you want to delete this student',
      nzContent: 'A deleted student cannot be recovered',
      nzOnOk: () => {
        this.handleDeleteStudent(this.dataStudent.id);
      },
    });
  }

  ngOnInit(): void {}
}
