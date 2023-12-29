import validator from 'validator';
// Defining the schema for the database
const UserSchema = {
    username: { type: 'string', required: true, },
    email: { type: 'string', required: true, email: true },
    password: { type: 'string', required: true},
    cnic: { type: 'string', required: true} // Example CNIC format
};

// creating a function to validate the user input
// const CheckUserInput = (data) => {
//     // convert everything to string
//     const dataArray = arrayFromEntries.map((item) => {
//         const { username, email, password, cnic } = item;
      
//         return {
//           username: String(username),
//           email: String(email),
//           password: String(password),
//           cnic: String(cnic),
//         };
//       });
//     // Validation with schema
//     return dataArray
// }
// export default CheckUserInput;