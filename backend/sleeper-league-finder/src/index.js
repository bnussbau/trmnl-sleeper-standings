export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle API routes
    if (url.pathname === "/api/user") {
      return handleUserLookup(request);
    }

    if (url.pathname === "/api/leagues") {
      return handleLeaguesLookup(request);
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(
        `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sleeper League Finder</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
            max-width: 600px;
            width: 100%;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            color: #333;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .header p {
            color: #666;
            font-size: 1.1rem;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 600;
            font-size: 1rem;
        }

        .form-group input {
            width: 100%;
            padding: 15px;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }

        .search-btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .search-btn:hover {
            transform: translateY(-2px);
        }

        .search-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .loading {
            text-align: center;
            color: #666;
            margin: 20px 0;
        }

        .error {
            background: #fee;
            color: #c33;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 4px solid #c33;
        }

        .results {
            margin-top: 30px;
        }

        .results h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.5rem;
        }

        .league-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .league-table th {
            background: #f8f9fa;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #333;
            border-bottom: 2px solid #e1e5e9;
        }

        .league-table td {
            padding: 15px;
            border-bottom: 1px solid #e1e5e9;
            color: #333;
        }

        .league-table tr:last-child td {
            border-bottom: none;
        }

        .copy-btn {
            background: #28a745;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background-color 0.2s ease;
        }

        .copy-btn:hover {
            background: #218838;
        }

        .copy-btn.copied {
            background: #6c757d;
        }

        .user-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            border-left: 4px solid #667eea;
        }

        .user-info h3 {
            color: #333;
            margin-bottom: 10px;
        }

        .user-info p {
            color: #666;
            margin-bottom: 5px;
        }

        @media (max-width: 768px) {
            .container {
                padding: 20px;
            }

            .header h1 {
                font-size: 2rem;
            }

            .league-table {
                font-size: 0.9rem;
            }

            .league-table th,
            .league-table td {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏈 Sleeper League Finder</h1>
            <p>Find your Sleeper league IDs easily</p>
        </div>

        <form id="searchForm">
            <div class="form-group">
                <label for="username">Sleeper Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your Sleeper username" required>
            </div>
            <div class="form-group">
                <label for="seasonYear">Season Year</label>
                <input type="number" id="seasonYear" name="seasonYear" value="2025" min="2018" max="2030" required>
            </div>
            <button type="submit" class="search-btn" id="searchBtn">
                Find My Leagues
            </button>
        </form>

        <div id="loading" class="loading" style="display: none;">
            Searching for your leagues...
        </div>

        <div id="error" class="error" style="display: none;"></div>

        <div id="userInfo" class="user-info" style="display: none;">
            <h3>User Information</h3>
            <div id="userDetails"></div>
        </div>

        <div id="results" class="results" style="display: none;">
            <h2>Your Leagues</h2>
            <table class="league-table">
                <thead>
                    <tr>
                        <th>League Name</th>
                        <th>League ID</th>
                        <th>Season</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="leaguesTableBody">
                </tbody>
            </table>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const searchForm = document.getElementById('searchForm');
            const searchBtn = document.getElementById('searchBtn');
            const loading = document.getElementById('loading');
            const error = document.getElementById('error');
            const userInfo = document.getElementById('userInfo');
            const userDetails = document.getElementById('userDetails');
            const results = document.getElementById('results');
            const leaguesTableBody = document.getElementById('leaguesTableBody');

            searchForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const username = document.getElementById('username').value.trim();
                const seasonYear = document.getElementById('seasonYear').value;
                
                if (!username) {
                    showError('Please enter a username');
                    return;
                }
                
                // Show loading state
                setLoading(true);
                hideError();
                hideResults();
                hideUserInfo();
                
                try {
                    // First, get user information
                    const userResponse = await fetch('/api/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username })
                    });
                    
                    if (!userResponse.ok) {
                        const errorData = await userResponse.json();
                        throw new Error(errorData.error || 'Failed to find user');
                    }
                    
                    const userData = await userResponse.json();
                    
                    // Display user information
                    displayUserInfo(userData);
                    
                    // Then, get user's leagues
                    const leaguesResponse = await fetch('/api/leagues', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            userId: userData.user_id, 
                            seasonYear 
                        })
                    });
                    
                    if (!leaguesResponse.ok) {
                        const errorData = await leaguesResponse.json();
                        throw new Error(errorData.error || 'Failed to fetch leagues');
                    }
                    
                    const leaguesData = await leaguesResponse.json();
                    
                    // Display leagues
                    displayLeagues(leaguesData);
                    
                } catch (err) {
                    showError(err.message);
                } finally {
                    setLoading(false);
                }
            });
            
            function setLoading(isLoading) {
                searchBtn.disabled = isLoading;
                loading.style.display = isLoading ? 'block' : 'none';
            }
            
            function showError(message) {
                error.textContent = message;
                error.style.display = 'block';
            }
            
            function hideError() {
                error.style.display = 'none';
            }
            
            function hideResults() {
                results.style.display = 'none';
            }
            
            function hideUserInfo() {
                userInfo.style.display = 'none';
            }
            
            function displayUserInfo(userData) {
                userDetails.innerHTML = \`
                    <p><strong>Username:</strong> \${userData.username}</p>
                    <p><strong>Display Name:</strong> \${userData.display_name || 'N/A'}</p>
                    <p><strong>User ID:</strong> \${userData.user_id}</p>
                \`;
                userInfo.style.display = 'block';
            }
            
            function displayLeagues(leagues) {
                if (leagues.length === 0) {
                    showError('No leagues found for this user and season');
                    return;
                }
                
                leaguesTableBody.innerHTML = '';
                
                leagues.forEach(league => {
                    const row = document.createElement('tr');
                    row.innerHTML = \`
                        <td>\${league.name}</td>
                        <td><code>\${league.league_id}</code></td>
                        <td>\${league.season}</td>
                        <td>
                            <button class="copy-btn" onclick="copyToClipboard('\${league.league_id}', this)">
                                Copy ID
                            </button>
                        </td>
                    \`;
                    leaguesTableBody.appendChild(row);
                });
                
                results.style.display = 'block';
            }
        });

        // Global function for copying to clipboard
        function copyToClipboard(text, button) {
            navigator.clipboard.writeText(text).then(() => {
                // Change button text temporarily
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Still show success message
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            });
        }
    </script>
</body>
</html>`,
        {
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    // Default 404 response
    return new Response("Not Found", { status: 404 });
  },
};

async function handleUserLookup(request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return new Response(JSON.stringify({ error: "Username is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(`https://api.sleeper.app/v1/user/${username}`);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userData = await response.json();

    return new Response(JSON.stringify(userData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function handleLeaguesLookup(request) {
  try {
    const { userId, seasonYear } = await request.json();

    if (!userId || !seasonYear) {
      return new Response(
        JSON.stringify({ error: "User ID and season year are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await fetch(
      `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/${seasonYear}`
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch leagues" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const leaguesData = await response.json();

    return new Response(JSON.stringify(leaguesData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
