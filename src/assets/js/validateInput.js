

import isEmail from 'validator/lib/isEmail';

const onlyHebrewPattern = new RegExp(/^[\u0590-\u05FF ,.'-]+$/i);
const phonePattern = new RegExp(/^[0-9-]*$/i);


export default function (parentName, email, phone, studentName, schoolClass) {

  // parent name
  if (!parentName) {
    return("לא הזנתם את שם ההורה")
  }
  if (!onlyHebrewPattern.test(parentName)) {
    return("אנא הזינו את שמכם בעזרת אותיות בעברית בלבד");
  }

  // validate email
  if (!email) {
    return("לא הזנתם דואר אלקטרוני")
  }
  if (!isEmail(email)) {
    return("המייל שהזנתם אינו תקין");
  }

  // validate phone
  if (!phone) {
    return("לא הזנתם טלפון")
  }
  if (!phonePattern.test(phone)) {
    return("מספר הטלפון אינו תקין");
  }

  // student name
  if (!studentName) {
    return("לא הזנתם את שם בנכם/בתכם")
  }
  if (!onlyHebrewPattern.test(studentName)) {
    return ("אנא הזינו את שם בנכם/בתכם בעזרת אותיות בעברית בלבד");
  }

  // school class
  if (!schoolClass) {
    return("לא בחרתם כיתה")
  }

  return null;
}
