import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Student } from '../../Student';
import { AuthService } from '../../services/auth.service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  studentsData!: Student[];
  displayData!: Student[];
  totalRecord = 0;
  pageIndex = 1;
  pageSize = 10;
  isLoading = false;
  isVisible2 = false;
  isOkLoading2 = false;

  constructor(
    private studentService: StudentsService,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}

  changePassword(): void {
    this.isVisible2 = true;
  }

  handleOk2(): void {
    this.isOkLoading2 = true;
    setTimeout(() => {
      this.isVisible2 = false;
      this.isOkLoading2 = false;
    }, 1000);
  }

  handleCancel2(): void {
    this.isVisible2 = false;
  }

  handleLogout(): void {
    this.authService.logout();
    this.notification.create(
      'success',
      'Logout Successfully',
      'You have successfully logged into the system.'
    );
  }

  getAllStudents() {
    this.isLoading = true;
    this.studentService.getListStudents().subscribe((res: Student[]) => {
      this.studentsData = res;
      this.displayData = res;
      this.totalRecord = res.length;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.getAllStudents();
    console.log(this.totalRecord, 'kk');

    this.updateDisplayData();
  }

  updateDisplayData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayData = this.studentsData?.slice(startIndex, endIndex);
  }

  handlePageIndexChange(newPageIndex: number): void {
    this.pageIndex = newPageIndex;
    this.updateDisplayData();
  }

  handlePageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.pageIndex = 1;
    this.updateDisplayData();
  }
}
