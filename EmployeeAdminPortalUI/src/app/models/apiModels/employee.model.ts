import { Address } from "./address.model";
import { Designation } from "./designation.model";

export interface employee{
    Id : number,
    Name : string,
    DesignationId : number,
    Salary : number,
    JoiningDate : Date,
    Email : string,
    Mobile : number,
    ProfileImageUrl : string
    Designation : Designation,
    Address : Address
}