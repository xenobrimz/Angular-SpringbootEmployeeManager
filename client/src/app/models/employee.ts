import { Long } from "mongodb";

export class Employee {
  _id!: Long;
  firstName!: string;
  lastName !: string;
  fullName !: String;
  age !: Long;
  role !: String;
}
