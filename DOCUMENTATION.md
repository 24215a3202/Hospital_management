# Hope Healthcare Documentation

Hope Healthcare is a full-stack hospital management system with three applications:

- `Backend`: Express API, MongoDB persistence, JWT authentication, and Cloudinary uploads.
- `Frontend-Admin`: React/Vite dashboard for administrators.
- `Frontend-Patient`: React/Vite portal for patients.

## Features

### Patient portal

- Register and log in as a patient.
- View available doctors and departments.
- Submit appointment requests.
- Send a message to the hospital.
- Log out securely.

### Admin dashboard

- Log in as an administrator.
- View all appointments and update their status.
- Delete appointments.
- View registered doctors.
- Add doctors, including a profile image.
- Add additional administrators.
- Read patient messages.
- Log out securely.

## Requirements

- Node.js 18 or newer and npm.
- A MongoDB database, including a database user with access to it.
- Cloudinary credentials for adding doctor avatars.
- Three terminal sessions, or an equivalent process manager, for the backend and two frontends.

## Installation

Install dependencies separately in each application:

```bash
cd Backend
npm install

cd ../Frontend-Admin
npm install

cd ../Frontend-Patient
npm install
```

## Environment configuration

Create the backend environment file from the example:

```powershell
Copy-Item Backend/config/config.env.example Backend/config/config.env
```

Then replace the placeholders in `Backend/config/config.env`:

| Variable | Purpose |
| --- | --- |
| `PORT` | Port used by the Express API, normally `4000`. |
| `MONGO_URI` | MongoDB connection string. |
| `JWT_SECRET_KEY` | Long, random secret used to sign login tokens. |
| `JWT_EXPIRES` | JWT lifetime, for example `7d`. |
| `COOKIE_EXPIRE` | Cookie lifetime in days. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name. |
| `CLOUDINARY_API_KEY` | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret. |
| `FRONTEND_PATIENT` | Allowed patient frontend origin, normally `http://localhost:5175`. |
| `FRONTEND_ADMIN` | Allowed admin frontend origin, normally `http://localhost:5174`. |
| `ADMIN_EMAIL` | Email for the startup-seeded admin. |
| `ADMIN_PASSWORD` | Password for the startup-seeded admin. |

Never commit `config.env`. It contains credentials and is intended to remain local.

## Running locally

Start the backend first:

```bash
cd Backend
npm run dev
```

Start the admin frontend in a second terminal:

```bash
cd Frontend-Admin
npm run dev
```

Start the patient frontend in a third terminal:

```bash
cd Frontend-Patient
npm run dev
```

Expected local URLs:

- Backend: `http://localhost:4000`
- Admin panel: `http://localhost:5174`
- Patient portal: `http://localhost:5175`

The backend connects to MongoDB before listening. On startup it also creates the configured admin if one does not already exist and ensures the default doctors exist.

## Production and frontend API URL

The current React components use the deployed API URL:

```text
https://hospital-management-seven-gules.vercel.app/api/v1
```

For local end-to-end testing, update the API URL used by both frontends to the local backend base URL:

```text
http://localhost:4000/api/v1
```

The backend CORS allowlist must also contain the exact origins from which the frontends are served.

## API reference

All API routes are prefixed with `/api/v1`. Requests that depend on login must send cookies. The frontend Axios requests are configured with credentials for authenticated calls.

### Authentication and users

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/user/patient/register` | Public | Register a patient. |
| `POST` | `/user/login` | Public | Log in with `email`, `password`, and `role` (`Admin` or `Patient`). |
| `GET` | `/user/doctors` | Public | List all doctors. |
| `GET` | `/user/admin/me` | Admin | Return the logged-in admin. |
| `GET` | `/user/patient/me` | Patient | Return the logged-in patient. |
| `GET` | `/user/admin/logout` | Admin | Clear the admin session cookie. |
| `GET` | `/user/patient/logout` | Patient | Clear the patient session cookie. |
| `POST` | `/user/admin/addnew` | Admin | Create another admin. |
| `POST` | `/user/doctor/addnew` | Admin | Create a doctor using multipart form data. |

Patient registration and admin creation require:

```json
{
  "firstName": "First",
  "lastName": "Last",
  "email": "person@example.com",
  "phone": "0000000000",
  "password": "strong-password",
  "gender": "Others",
  "aadhar": "000000000000",
  "dob": "1990-01-01"
}
```

Doctor creation requires those fields plus `doctrDptmnt` and an image file field named `doctrAvatar`. Accepted image types are PNG, JPEG, and WEBP.

### Appointments

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/appointment/post` | Patient | Submit an appointment request. |
| `GET` | `/appointment/getall` | Admin | List all appointments. |
| `PUT` | `/appointment/update/:id` | Admin | Update appointment fields, normally `status`. |
| `DELETE` | `/appointment/delete/:id` | Admin | Delete an appointment. |

Appointment creation requires:

```json
{
  "firstName": "First",
  "lastName": "Last",
  "email": "person@example.com",
  "phone": "0000000000",
  "aadhar": "000000000000",
  "dob": "1990-01-01",
  "gender": "Others",
  "appointment_date": "2026-12-01",
  "department": "Cardiology",
  "doctor_firstName": "Vikram",
  "doctor_lastName": "Rao",
  "hasVisited": false,
  "address": "Patient address"
}
```

Valid appointment statuses are `Pending`, `Accepted`, and `Rejected`. The selected doctor's first name, last name, and department must match an existing doctor.

### Messages

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/message/send` | Public | Send a message to the hospital. |
| `GET` | `/message/getall` | Admin | List all submitted messages. |

Message creation requires `firstName`, `lastName`, `email`, `phone`, and `message`.

## Seeded data

The backend seeds the configured admin and creates default doctors in these departments:

`Pediatrics`, `Orthopedics`, `Cardiology`, `Neurology`, `Oncology`, `Radiology`, `Physical Therapy`, `Dermatology`, and `ENT`.

Seeded doctor accounts use generated local email addresses and a development password defined in `Backend/database/seedDoctors.js`. Change or remove that behavior before production deployment.

## Validation and error handling

- Required fields are validated by the controllers and Mongoose schemas.
- Emails must be valid email addresses.
- Phone numbers must contain exactly 10 characters.
- Aadhar numbers must contain exactly 12 characters.
- Passwords must contain at least 8 characters.
- Gender must be `Male`, `Female`, or `Others`.
- Errors are returned through the shared Express error middleware.

## Useful commands

Backend:

```bash
npm run dev       # Start with nodemon
npm start         # Start normally
```

Each frontend:

```bash
npm run dev       # Start Vite development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

## Security checklist

Before sharing or deploying the project:

1. Rotate any MongoDB, JWT, admin, and Cloudinary credentials that have been exposed.
2. Keep `Backend/config/config.env` out of version control and deployment logs.
3. Replace seeded development doctor passwords with secure, managed credentials.
4. Configure production frontend origins instead of using localhost values.
5. Move the hardcoded frontend API URL into environment variables before deploying multiple environments.
6. Use HTTPS in production so authentication cookies are protected in transit.