// src/commands/index.ts

export type CommandHandler = () => string | Promise<string>

interface Commands {
    [key: string]: CommandHandler
}

export const commandsPt: Commands = {
    help: () =>
        '<span class="label">Comandos disponíveis:</span> help, about, experience, tech, contact, clear',
    about: () =>
        '<span class="label">Sobre mim:</span> Sou um desenvolvedor backend com foco em Node.js, etc.',
    experience: () =>
        '<span class="label">Experiência:</span><br>- Empresa X (2020-2022)<br>- Empresa Y (2022-2024)',
    tech: () =>
        '<span class="label">Tecnologias:</span> Node.js, Express, PostgreSQL, Docker, AWS...',
    contact: () =>
        '<span class="label">Contatos:</span><br>LinkedIn: ...<br>GitHub: ...<br>Email: ...',
    clear: () => '',
}

export const commandsEn: Commands = {
    help: () =>
        '<span class="success-label">Available commands:</span> help, about, experience, tech, contact, clear',
    about: () =>
        '<span class="label">About me:</span><br>Motivated backend developer with over 5 years of experience designing, developing, and integrating robust and scalable APIs. A strategic thinker and adaptable professional, recognized for consistently solving complex problems in dynamic environments and delivering clear, effective solutions. With a proven track record of optimizing system efficiency and enhancing user experiences, dedicated to building high-quality software that drives measurable results and exceeds expectations.',
    experience: () =>
        '<span class="label">Recent Experiences:</span><br><br>' +
        '🏢 <span class="company">CI&T</span> (January 2024 – Present)<br>' +
        '- Working as a Fullstack Developer with Node.js and React<br>' +
        '- Implementing microservices using Hexagonal Architecture<br>' +
        '- Developing cloud solutions with AWS and MongoDB<br>' +
        '- Building scalable and maintainable applications<br><br>' +
        '🏢 <span class="company">Gofind Online</span> (September 2023 – November 2024)<br>' +
        '- Developed and maintained APIs using Node.js with TypeScript<br>' +
        '- Worked with AWS services (DynamoDB, CloudWatch, API Gateway, S3, SQS, SNS)<br>' +
        '- Implemented ElasticSearch for optimized searches<br>' +
        '- Managed databases including MySQL and BigQuery<br><br>' +
        '🏢 <span class="company">Nichoos</span> (August 2023 – September 2023)<br>' +
        '- Provided consultancy on social network backend development<br>' +
        '- Integrated third-party APIs (Kiwify, Eduzz)<br>' +
        '- Maintained and enhanced legacy code<br><br>' +
        '🏢 <span class="company">Afinz</span> (June 2022 – May 2023)<br>' +
        '- Developed fintech applications using Node.js and TypeScript<br>' +
        '- Utilized AWS Lambda, SQS, SNS, and PostgreSQL<br>' +
        '- Created API mocks and documentation',
    tech: () =>
        '<span class="label">Core Technologies:</span><br><br>' +
        '💻 <span class="tech-category">Languages & Frameworks:</span><br>' +
        '- Node.js, Go, TypeScript, JavaScript<br><br>' +
        '☁️ <span class="tech-category">Cloud & Infrastructure:</span><br>' +
        '- AWS (Lambda, CloudWatch, SQS, SNS, S3, API Gateway)<br>' +
        '- Serverless, Microservices<br><br>' +
        '🗄️ <span class="tech-category">Databases:</span><br>' +
        '- DynamoDB, MongoDB, MySQL, PostgreSQL<br>' +
        '- Firebase, Elastic Search, Big Query<br><br>' +
        '🛠️ <span class="tech-category">Development Practices:</span><br>' +
        '- SOLID principles<br>' +
        '- Agile Development<br>' +
        '- Strong communication and teamwork',
    contact: () =>
        '<span class="label">Contact Information:</span><br><br>' +
        '📱 Phone: +5573981358624<br>' +
        '📧 Email: danielmfigueroa@gmail.com<br>' +
        '⚡ GitHub: danielfigueroa@github.com',
    clear: () => '',
}
