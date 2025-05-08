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
    apiHandler?: (data: any) => Observable<HttpCustomResponse<{}>>;
    resolvedData?: T;
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

interface Address {
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
    addressListList: Address[];
    logId: number;
}