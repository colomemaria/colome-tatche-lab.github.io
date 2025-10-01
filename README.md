# colome-tatche-lab.github.io

Lab website for the Colomé-Tatché Lab, featuring computational biology and single-cell epigenomics research.

## Features

- **Home Page**: Introduction to the lab and research focus
- **Projects Page**: Automatically displays all public repositories from the colomemaria GitHub organization

## How It Works

The Projects page dynamically fetches repository data from the GitHub API, displaying:
- Repository names with links
- Descriptions
- Star and fork counts
- Programming language used

The page automatically filters out archived repositories and the website repository itself, sorting projects by popularity (stars) and recency.

## Development

To test the website locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Deployment

This site is automatically deployed via GitHub Pages from the `main` branch.
