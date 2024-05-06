import { Pipe, PipeTransform } from '@angular/core';
import { InsurancePolicy } from '../models/InsurancePolicy.model';

@Pipe({
  name: 'policiesFilter'
})
export class PoliciesFilterPipe implements PipeTransform {

  transform(policies: InsurancePolicy[], dateRange: Partial<{ start: Date | null; end: Date | null; }>, applyFilter: boolean | null = true): InsurancePolicy[] {
    if (!applyFilter || !dateRange || (dateRange.start === null && dateRange.end === null)) {
      return policies;
    }

    if (dateRange.start === null && dateRange.end !== null) {
      const dateRangeEnd = dateRange.end as Date;
      return policies.filter(policy => new Date(policy.endDate) <= dateRangeEnd);
    }

    if (dateRange.start !== null && dateRange.end === null) {
      const dateRangeStart = dateRange.start as Date;
      return policies.filter(policy => new Date(policy.startDate) >= dateRangeStart);
    }

    return policies.filter(policy => {
      const dateRangeStart = dateRange.start as Date;
      const dateRangeEnd = dateRange.end as Date;
      return new Date(policy.startDate) >= dateRangeStart && new Date(policy.endDate) <= dateRangeEnd;
    });
  }

}
