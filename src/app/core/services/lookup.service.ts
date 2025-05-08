import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LookupService {
    getMartialStatusList() {
        return [
            {
                label: 'Divorced',
                value: 1
            },
            {
                label: 'Married',
                value: 2
            },
            {
                label: 'Widower',
                value: 3
            },
            {
                label: 'Single',
                value: 4
            },
        ]
    }

    getEducationLevelList() {
        return [
            {
                label: 'University Degree',
                value: 1
            },
            {
                label: 'High School Diploma',
                value: 2
            },
            {
                label: 'Primary School',
                value: 3
            },
            {
                label: 'No Formal Education',
                value: 4
            }
        ];
    }

    getEmploymentStatusList() {
        return [
            { label: 'Employed', value: 1 },
            { label: 'Unemployed', value: 2 },
            { label: 'Student', value: 3 },
            { label: 'Retired', value: 4 },
        ];
    }

    getAnnualIncomeList() {
        return [
            { label: 'Less than 50,000 SAR', value: 1 },
            { label: '50,000 – 100,000 SAR', value: 2 },
            { label: '100,001 – 200,000 SAR', value: 3 },
            { label: 'More than 200,000 SAR', value: 4 }
        ];
    }

    getEstimatedNetWorthList() {
        return [
            { label: 'Less than 500,000 SAR', value: 1 },
            { label: '500,000 – 1,000,000 SAR', value: 2 },
            { label: '1,000,001 – 5,000,000 SAR', value: 3 },
            { label: 'More than 5,000,000 SAR', value: 4 }
        ];
    }

    getInvestmentExperienceList() {
        return [
            { label: 'Low', value: 1 },
            { label: 'Medium', value: 2 },
            { label: 'High', value: 3 }
        ];
    }

    getRiskToleranceList() {
        return [
            { label: 'Low', value: 1 },
            { label: 'Medium', value: 2 },
            { label: 'High', value: 3 }
        ];
    }

    getInvestmentPeriodList() {
        return [
            { label: 'Less than 1 year', value: 1 },
            { label: '1 – 3 years', value: 2 },
            { label: '3 – 5 years', value: 3 },
            { label: 'More than 5 years', value: 4 }
        ];
    }

    getInvestmentObjectivesList() {
        return [
            { label: 'Capital Preservation', value: 1 },
            { label: 'Income Generation', value: 2 },
            { label: 'Capital Growth', value: 3 },
            { label: 'Speculation / High Return', value: 4 }
        ];
    }


}
