# Startup Genie

An AI-powered application designed to help entrepreneurs transform their ideas into successful startups.

## Features

- Interactive AI assistant for startup planning
- Business model canvas generator
- Market analysis tools
- Financial projections
- Pitch deck builder
- Resource recommendations

## Technologies

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas)

## Installation

1. Clone the repository
   ```
   git clone https://github.com/harshit-ig/startup-genie.git
   cd startup-genie
   ```

2. Install dependencies for all components (root, frontend, and backend)
   ```
   npm run install:all
   ```

3. Set up environment variables
   - Create `.env` files in both the `backend` and `frontend` directories
   - Backend `.env` example:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/startup-genie
     JWT_SECRET=your_jwt_secret
     ```
   - Frontend `.env` example:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

## Usage

### Development Mode

Run both frontend and backend in development mode:
```
npm run dev
```

For mobile development (accessible from other devices on your network):
```
npm run mobile-dev
```

Run backend only:
```
npm run dev:backend
```

Run frontend only:
```
npm run dev:frontend
```

### Production Mode

Start both frontend and backend for production:
```
npm start
```

## Project Structure

```
startup-genie/
├── backend/          # Node.js Express server
├── frontend/         # React.js client
├── .gitignore        # Git ignore file
├── package.json      # Root package.json for scripts
└── README.md         # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.