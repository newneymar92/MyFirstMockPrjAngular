import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Account, Student } from '../Student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private apiUrl =
    'https://66574f3d9f970b3b36c8c985.mockapi.io/taina18/students';

  constructor(private http: HttpClient) {}

  getListStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/listStudent`).pipe(
      map((res: Student[]) => {
        return res;
      })
    );
  }

  getDetailStudent(idStudent: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/listStudent/${idStudent}`);
  }

  addStudent(option: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/listStudent`, option);
  }

  updateStudent(option: Student, id: string): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/listStudent/${id}`, option);
  }
}
