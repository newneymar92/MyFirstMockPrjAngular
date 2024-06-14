import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderLabel',
})
export class GenderLabelPipe implements PipeTransform {
  listOptionGender = [
    { id: 1, value: 1, label: 'Male' },
    { id: 2, value: 2, label: 'Female' },
    { id: 3, value: 3, label: 'Other' },
  ];

  transform(value: number): string {
    const genderOption = this.listOptionGender.find(
      (option) => option.value === value
    );
    return genderOption ? genderOption.label : '';
  }
}
