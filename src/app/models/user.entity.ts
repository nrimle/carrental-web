export class User {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    billingAddress: {
        street: string;
        houseNumber: string;
        zipCode: number;
        city: string;
    }


    constructor(firstName: string, lastName: string, dateOfBirth: Date, billingAddress: { street: string; houseNumber: string; zipCode: number; city: string }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.billingAddress = billingAddress;
    }
}