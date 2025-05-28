import { ValidatorFn, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { HttpCustomResponse } from "../../../../../../../core/models/http";

export interface StepControl {
    key: string;
    value?: string | number | Date;
    validators?: ValidatorFn[];
}

export interface Step<T> {
    key: string;
    title: string;
    description: string;
    controls?: StepControl[];
    component?: any;
    apiHandler?: (stepData: any, token?: string, otpId?: string, formData?: any) => Observable<HttpCustomResponse<{}>>;
    resolvedData?: T;
    nextButtonText?: string;
    validators?: ValidatorFn[];

}


export interface IndividualAddress {

}

export interface PersonalData {
    dateOfBirthH: string;
    englishFirstName: string;
    englishLastName: string;
    englishSecondName: string;
    englishThirdName: string;
    familyName: string;
    fatherName: string;
    firstName: string;
    genderSpecified: boolean;
    grandFatherName: string;
    idExpiryDate: string;
    idIssueDate: string;
    logId: number;
    placeOfBirth: string;
    address: AddressData;
}


export interface CompanyData {
    crName: string;
    crNumber: number;
    crEntityNumber: number;
    issueDate: string; // ISO string
    expiryDate: string; // ISO string
    crMainNumber: number | null;
    parties: {
        name: string;
        birthDate: string; // "YYYY/MM/DD"
        sharesCount: number;
        gross: number;
        identity: {
            id: string;
            type: string;
        };
        relation: {
            id: number;
            name: string;
        };
        nationality: {
            id: string;
            name: string;
        };
    }[];
    businessType: {
        id: string;
        name: string;
    };
    status: string | null;
    cancellation: string | null;
    address: string | null;
    location: string | null;
    company: string | null;
    capital: number | null;
    activities: any | null;
}

export interface IndividualAddress {
    additionalNumber: number;
    buildingNumber: number;
    city: string;
    district: string;
    locationCoordinates: string;
    postCode: number;
    streetName: string;
    unitNumber: number;
}

interface AddressData {
    addressListList: IndividualAddress[];
    logId: number;
}