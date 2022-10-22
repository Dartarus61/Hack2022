export class CreateCompanyDto{
    readonly company_name: string;
    readonly description: string;
    readonly about_company: string;
    readonly login: string;
    readonly password: string;
    readonly email: string;
    readonly name: string;
    readonly surname: string;
    readonly lastName: string;
    readonly INN: number;
    readonly legal_adress: string;
    readonly adress_of_prod: string;
    readonly location: string;
    readonly import_substitution: boolean;
    readonly phoneNumber: string;
}