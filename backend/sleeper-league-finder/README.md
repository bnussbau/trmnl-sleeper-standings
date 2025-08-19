# 🏈 Sleeper League Finder

A full-stack web application deployed to Cloudflare Workers that helps users find their Sleeper league IDs by entering their username and season year.

<img width="663" height="833" alt="image" src="https://github.com/user-attachments/assets/c3f7a4f7-0df2-4ef3-be13-70836ae223b9" />


## How It Works

1. **User Input**: User enters their Sleeper username and season year (defaults to 2025)
2. **User Lookup**: Backend calls Sleeper API to get user information
3. **League Fetch**: Backend retrieves all leagues the user is in for the specified season
4. **Results Display**: Shows user info and league details in a clean table format
5. **Copy Functionality**: One-click copying of league IDs

## API Endpoints

### `/api/user`
- **Method**: POST
- **Body**: `{ "username": "string" }`
- **Response**: User data from Sleeper API

### `/api/leagues`
- **Method**: POST
- **Body**: `{ "userId": "string", "seasonYear": "string" }`
- **Response**: Array of league objects

## Setup and Development

### Prerequisites

- Node.js
- npm or yarn
- Cloudflare account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sleeper_cloudflare
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8787`

### Project Structure

```
sleeper_cloudflare/
├── src/
│   └── index.js          # Cloudflare Worker main file
├── public/
│   ├── index.html        # Frontend HTML
│   └── script.js         # Frontend JavaScript
├── wrangler.toml         # Cloudflare Workers configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## Deployment

### Deploy to Cloudflare Workers

Run deploy.sh OR

1. Install Wrangler CLI (if not already installed):
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Deploy the application:
```bash
npm run deploy
```

The application will be deployed to your Cloudflare Workers account and you'll receive a URL where it's accessible.

### Environment Variables

No environment variables are required for this application as it uses public Sleeper API endpoints.

## Usage

1. Open the application in your browser
2. Enter your Sleeper username
3. Select the season year (defaults to 2025)
4. Click "Find My Leagues"
5. View your user information and league details
6. Click "Copy ID" to copy any league ID to your clipboard

## API Integration

This application integrates with the following Sleeper API endpoints:

- `GET https://api.sleeper.app/v1/user/{username}` - Get user information
- `GET https://api.sleeper.app/v1/user/{user_id}/leagues/nfl/{season}` - Get user's leagues

## Technologies Used

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Cloudflare Workers
- **API**: Sleeper API
- **Deployment**: Cloudflare Workers
- **Styling**: Custom CSS with modern design patterns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
