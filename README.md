# University Management System

This is a comprehensive University Management System designed to streamline various administrative and academic processes at Sylhet Metropolitan University.

## Key Features:

### User Panel:

1. **Login and Sign-Up:**
   - **Authentication and Authorization:** Handled by Firebase.
   - **Email Verification:** Implemented in the sign-up process.
   - **Google Sign-In:** Option available for users.

2. **Home Page:**
   - **Navbar:** Contains routes to various static information pages about the university.
   - **Dashboard Button:** Directs users to their specific dashboards based on their roles.
   - **Get Admission Button:** Allows new users to request admission (disabled for students, faculty, and administrators).

3. **User Dashboard:**
   - **Profile Section:** Users can update their name or image.
   - **Admission Request Form:** Contains all necessary fields and information. Admissions are open only during the "upcoming" semester status, handled via SSLCommerz secure payment gateway.

### Admin Panel:

1. **Manage Admission Requests:**
   - View, approve, or deny admission requests.
   - Add students manually who are admitted directly.

2. **User Management:**
   - Manage users and assign roles (admin, faculty).
   - Handle faculty leaves and reinstatements.

3. **Academic Structure Creation:**
   - Create and manage departments, programs, and semesters.

4. **Batch and Section Management:**
   - Create batches and manage admissions.
   - Automatically create sections based on capacity and merge sections as needed.

5. **Course Management:**
   - Create, manage, and offer courses to sections.
   - Schedule courses with backend validation for faculty and room availability.

### Faculty Dashboard:

1. **Assign Class Code:**
   - View assigned courses and publish class codes for students.

2. **Faculty Semester Routine:**
   - View their schedule and student details for their sections.

3. **Attendance and Marks Management:**
   - Manage student attendance and marks.
   - Automatic calculation of attendance marks.
   - Input fields for 50 and 40 marks with specific rules for retake students.

### Student Dashboard:

1. **Offered Courses:**
   - View courses offered in the current semester along with classroom codes.

2. **Semester Routine:**
   - View their schedule with clickable faculty names for more information.

3. **Payment and Academic Records:**
   - Pay semester and monthly fees online via SSLCommerz.
   - View 60 marks for current courses.
   - Access academic records, including grades, CGPA, total credits completed, and overall CGPA.

### Future Work:

1. **User Interface Improvement:**
   - Enhance the user experience with a better interface.

2. **Waiver Calculation System:**
   - Implement a system based on SSC and HSC GPA for fee waivers.

3. **Flexible Mark Distribution:**
   - Allow customization of 50 marks distribution (class tests, assignments, mid-term exams).

4. **Additional Roles:**
   - Expand the system to include batch supervisors, department heads, and accountants.

5. **Late Fee Calculation:**
   - Add a feature to calculate late fines on monthly fees.

6. **Student Payment History:**
   - Provide a comprehensive payment history for students.

## Technology Used

### Front-end:

- JavaScript
- React
- Redux
- Firebase
- SweetAlert2
- Headless UI
- Tailwind CSS

### Back-end:

- TypeScript
- Express
- Mongoose
- Zod
- Bcrypt
- NodeMailer
- SSLCommerz

## How to Set Up

### Clone the Client-Side Repository:

```
git clone https://github.com/reza107-hub/university-management-system-client.git

cd university-management-system-client
```
```
npm install
or
yarn add
or
pnpm install
```

```
npm run dev
or
yarn dev
or
pnpm dev
```

clone server side repository:

```
git clone https://github.com/reza107-hub/university-management-system-server.git

cd university-management-system-server
```

```
npm install
or
yarn add
or
pnpm install
```

```
npm run start:dev
or
yarn start:dev
or
pnpm start:dev
```

- Now go to your browser and copy paste this link or click here [Local](http://localhost:5173/):
  http://localhost:5173/
