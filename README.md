# My Personal Interactive Terminal Site

This is my personal website, designed to simulate an interactive terminal similar to those found in macOS and Linux. The interface is carefully crafted with inspiration from the **Shades of Purple** theme and the **Powerlevel10k** aesthetic, utilizing striking colors such as characteristic yellow along with complementary tones for an elegant and modern design.

Live at [danielfigueroa.dev](https://danielfigueroa.dev).

## Technologies Used

-   **React**: Library for building user interfaces.
-   **TypeScript**: A superset of JavaScript that adds static typing for enhanced robustness and code quality.
-   **Vite**: Fast build tool and development server with support for HMR (Hot Module Replacement).
-   **CSS**: Used for styling the terminal, with variables that define a color palette inspired by Shades of Purple.

## Available Commands

Type any of these in the terminal:

| Command      | Description                                          |
| ------------ | ---------------------------------------------------- |
| `help`       | Lists all available commands                         |
| `about`      | Professional summary                                 |
| `experience` | Work history with stack and highlights per company   |
| `projects`   | Personal projects (Creo, Campaign Survivor)          |
| `tech`       | Core technologies grouped by category                |
| `contact`    | Phone, email, LinkedIn and GitHub                    |
| `github`     | Link to my GitHub profile                            |
| `lang`       | Toggles between English and Portuguese               |
| `clear`      | Clears the terminal                                  |

Commands are case-insensitive. The terminal also supports:

-   `Tab` — autocompletes the command; with several matches it fills the longest common prefix and lists the options. Pressing `Tab` on an empty prompt lists every command.
-   `→` — accepts the dimmed suggestion that trails the cursor as you type.
-   `↑` / `↓` — browse command history.

Unknown commands get a "did you mean" suggestion. The interface language is detected from the browser and shown in the header; `lang` toggles it.

## Project Structure

```
src/
├── commands/index.ts        # Command registry — content for EN and PT
├── components/
│   ├── Terminal.tsx         # Terminal shell: input, history, command dispatch
│   ├── ParticleEffect.tsx   # Particle burst on command execution
│   └── TypewriterLine.tsx   # Typewriter rendering for lines
├── hooks/useTypewriter.ts   # Typewriter animation hook
├── index.css                # Terminal theme, layout and responsive rules
└── App.tsx                  # App shell
```

Command output is HTML rendered through `dangerouslySetInnerHTML`, so entries can use styling classes such as `.label`, `.company` and `.tech-category` defined in `index.css`.

## How to Run the Project

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed.
2. **Clone the repository**:
    ```bash
    git clone https://github.com/danielfigueroa/daniel-figueroa.git
    cd daniel-figueroa
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```
4. **Start the development server**:
    ```bash
    npm run dev
    ```
5. **Access the project**: Open your browser and navigate to the URL printed by Vite (usually [http://localhost:5173](http://localhost:5173)).

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Type-checks with `tsc` and builds the project for production.
-   `npm run lint`: Runs ESLint for code analysis.
-   `npm run preview`: Serves the production build for preview.
-   `npm run deploy`: Publishes the `dist/` folder to GitHub Pages.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. The custom domain is configured through `public/CNAME`, which is copied into the build output.

## Project Purpose

This project was created to serve as my interactive online resume, showcasing my skills and experiences in an innovative way using a terminal interface.

## Contributions

Contributions are welcome! Feel free to open issues or submit pull requests for improvements.

_This site is an example of how to combine modern design and technology to create a unique and interactive presentation._
