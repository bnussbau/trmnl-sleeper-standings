## 🏈 Sleeper Standings

A TRMNL recipe that displays real-time fantasy football league standings from Sleeper and lets you monitor your fantasy league performance.

<img width="976" height="656" alt="image" src="https://github.com/user-attachments/assets/aa65b249-43b6-400c-abb7-d6ee0e25ec1f" />

### Configuration

To use this recipe, you'll need to set in `.trmnlp.yml`:

1. **League ID**: Get your Sleeper League ID from the [Sleeper League Finder](https://sleeper-league-finder.divine-wood-7de9.workers.dev/)
2. **League Name** (optional): Display your league name in the title bar
3. **User Name** (optional): Highlight your team in the standings

### Data Displayed

The plugin shows the following information for each team:
- **Rank**: Current position in the standings
- **User**: Display name of the team owner
- **Team Name**: Custom team name
- **W/L**: Wins and losses record
- **PF**: Points For (total fantasy points scored)
- **PA**: Points Against (total fantasy points allowed)
- **WAI**: Waiver position

### Development
Can be served via [trmnlp](https://github.com/usetrmnl/trmnlp). Install trmnlp and run
```
trmnlp serve
```
