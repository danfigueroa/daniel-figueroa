// src/commands/index.ts

export type CommandHandler = () => string | Promise<string>

interface Commands {
    [key: string]: CommandHandler
}

export const commandsPt: Commands = {
    help: () =>
        '<span class="label">Comandos disponíveis:</span> help, about, experience, tech, contact, github, lang, clear',
    about: () =>
        '<span class="label">Sobre mim:</span><br>Desenvolvedor backend motivado com mais de 5 anos de experiência projetando, desenvolvendo e integrando APIs robustas e escaláveis. Um pensador estratégico e profissional adaptável, reconhecido por resolver consistentemente problemas complexos em ambientes dinâmicos e entregar soluções claras e eficazes. Com um histórico comprovado de otimização da eficiência do sistema e melhoria da experiência do usuário, dedicado a construir software de alta qualidade que gera resultados mensuráveis e supera expectativas.',
    experience: () =>
        '<span class="label">Experiências Profissionais:</span><br><br>' +
        '🏢 <span class="company">Americanas S.A.</span> (Novembro 2021 – Maio 2022)<br>' +
        '- <strong>Desenvolvimento:</strong> Aplicações com stacks diversas e criação de APIs/microserviços<br>' +
        '- <strong>Foco:</strong> Correção de bugs, refatoração de código e implementação de testes unitários<br>' +
        '- <strong>Ambiente:</strong> Ágil e colaborativo, melhorando usabilidade e satisfação do cliente<br>' +
        '  📋 <em>Linguagens:</em> Node.js (TypeScript/JavaScript), Laravel (PHP), Golang<br>' +
        '  📋 <em>Bancos:</em> MongoDB, MySQL<br>' +
        '  📋 <em>Ferramentas:</em> Docker, Redis<br>' +
        '  📋 <em>Cloud:</em> AWS (Lambda, API Gateway, SQS, SNS)<br><br>' +
        '🏢 <span class="company">Afinz</span> (Junho 2022 – Maio 2023)<br>' +
        '- <strong>Projeto:</strong> Aplicação fintech para parceiro Sem Parar<br>' +
        '- <strong>Atividades:</strong> Refatoração, correção de bugs em sistemas legados<br>' +
        '- <strong>Documentação:</strong> Software e criação de mocks de API para integração<br>' +
        '- <strong>Ambiente:</strong> Ágil e colaborativo com foco em comunicação e resolução de problemas<br>' +
        '  📋 <em>Stack:</em> Node.js (TypeScript/JavaScript), AWS (Lambda, SQS, SNS), PostgreSQL, Docker<br><br>' +
        '🏢 <span class="company">Nichoos</span> (Agosto 2023 – Setembro 2023)<br>' +
        '- <strong>Consultoria:</strong> Backend de rede social para gerenciamento de grupos de influenciadores<br>' +
        '- <strong>Integrações:</strong> APIs de terceiros (Kiwify, Eduzz)<br>' +
        '- <strong>Desenvolvimento:</strong> Novas funcionalidades e manutenção de código legado<br><br>' +
        '🏢 <span class="company">Gofind Online</span> (Setembro 2023 – Novembro 2024)<br>' +
        '- <strong>Resolução de Problemas:</strong> Excelência na resolução de problemas de produção e desafios técnicos<br>' +
        '- <strong>Desenvolvimento:</strong> Features, extração de dados e novas APIs/projetos<br>' +
        '- <strong>Qualidade:</strong> Code reviews rigorosos, testes unitários e documentação técnica detalhada<br>' +
        '- <strong>Manutenção:</strong> Aprimoramento e manutenção de código legado<br>' +
        '  📋 <em>Stack:</em> Node.js (TypeScript/JavaScript), AWS (DynamoDB, CloudWatch, API Gateway, S3, SQS, SNS)<br>' +
        '  📋 <em>Dados:</em> ElasticSearch, MySQL, BigQuery<br><br>' +
        '🏢 <span class="company">CI&T</span> (Janeiro 2025 – Setembro 2025)<br>' +
        '- Atuei como Desenvolvedor Fullstack contribuindo para dois grandes projetos de clientes:<br>' +
        '- <strong>YDUCS (Setor Educacional):</strong> Desenvolvi e mantive a plataforma Virtual Classroom<br>' +
        '  • Implementei novas funcionalidades e otimizei performance usando Node.js, React, MongoDB, DynamoDB<br>' +
        '  • Apliquei Arquitetura Hexagonal para melhorar a modularidade do código<br>' +
        '  • Criei testes unitários e de componentes para garantir confiabilidade do software<br>' +
        '- <strong>Nestlé (Indústria Alimentícia):</strong> Desenvolvi serviços backend para Sistema Preditivo de Vendas<br>' +
        '  • Construí soluções escaláveis usando Node.js, TypeScript, Redis, Docker, MongoDB, Azure Blob Storage<br>' +
        '  • Apliquei Clean Architecture e princípios de Domain-Driven Design (DDD)<br>' +
        '  • Implementei padrões Repository, Adapter, Facade e Factory<br>' +
        '  • Otimizei performance com Redis como data store primário e Cosmos DB para redundância<br>' +
        '  • Projetei estratégias de cache e processei arquivos Parquet em larga escala<br>' +
        '  • Mantive testes automatizados (unitários, integração e E2E)',
    tech: () =>
        '<span class="label">Principais Tecnologias:</span><br><br>' +
        '💻 <span class="tech-category">Linguagens & Frameworks:</span><br>' +
        '- Node.js, Go, TypeScript, JavaScript, PHP<br><br>' +
        '☁️ <span class="tech-category">Cloud & Infraestrutura:</span><br>' +
        '- AWS (Lambda, CloudWatch, SQS, SNS, S3, API Gateway)<br>' +
        '- Serverless, Microserviços, Terraform<br><br>' +
        '🗄️ <span class="tech-category">Bancos de Dados & Cache:</span><br>' +
        '- DynamoDB, MongoDB, MySQL, PostgreSQL<br>' +
        '- Firebase, Elastic Search, Big Query, Redis<br><br>' +
        '🛠️ <span class="tech-category">Práticas de Desenvolvimento:</span><br>' +
        '- Princípios SOLID<br>' +
        '- Desenvolvimento Ágil<br>' +
        '- CI/CD<br>' +
        '- Forte comunicação e trabalho em equipe',
    contact: () =>
        '<span class="label">Informações de Contato:</span><br><br>' +
        '📱 Telefone: +5573981358624<br>' +
        '📧 Email: danielmfigueroa@gmail.com<br>' +
        '💼 LinkedIn: <a href="https://linkedin.com/in/daniel-figueroa" target="_blank" rel="noopener noreferrer">linkedin.com/in/daniel-figueroa</a><br>' +
        '⚡ GitHub: <a href="https://github.com/danfigueroa" target="_blank" rel="noopener noreferrer">github.com/danfigueroa</a>',
    github: () =>
        '<span class="label">GitHub:</span><br>🔗 <a href="https://github.com/danfigueroa" target="_blank" rel="noopener noreferrer">https://github.com/danfigueroa</a>',

    clear: () => '',
}

export const commandsEn: Commands = {
    help: () =>
        '<span class="label">Available commands:</span> help, about, experience, tech, contact, github, lang, clear',
    about: () =>
        '<span class="label">About me:</span><br>Motivated backend developer with 6 years of experience designing, developing, and integrating robust and scalable APIs. A strategic thinker and adaptable professional, I am recognized for consistently solving complex problems in dynamic environments and delivering clear, effective solutions. With a proven track record of optimizing system efficiency and enhancing user experiences, I am dedicated to building high-quality software that drives measurable results and exceeds expectations.',
    experience: () =>
        '<span class="label">Recent Experiences:</span><br><br>' +
        '🏢 <span class="company">Americanas S.A.</span> (November 2021 – May 2022)<br>' +
        '- <strong>Development:</strong> Applications with diverse technology stacks and APIs/microservices creation<br>' +
        '- <strong>Focus:</strong> Bug fixing, code refactoring, and unit tests implementation<br>' +
        '- <strong>Environment:</strong> Agile and collaborative, improving application usability and customer satisfaction<br>' +
        '  📋 <em>Languages:</em> Node.js (TypeScript/JavaScript), Laravel (PHP), Golang<br>' +
        '  📋 <em>Databases:</em> MongoDB, MySQL<br>' +
        '  📋 <em>Tools:</em> Docker, Redis<br>' +
        '  📋 <em>Cloud:</em> AWS (Lambda, API Gateway, SQS, SNS)<br><br>' +
        '🏢 <span class="company">Afinz</span> (June 2022 – May 2023)<br>' +
        '- <strong>Project:</strong> Fintech application development for partner Sem Parar<br>' +
        '- <strong>Activities:</strong> Project refactoring and bug fixing in legacy systems<br>' +
        '- <strong>Documentation:</strong> Software documentation and API mocks creation for team integration<br>' +
        '- <strong>Environment:</strong> Agile and collaborative with focus on communication and problem-solving<br>' +
        '  📋 <em>Stack:</em> Node.js (TypeScript/JavaScript), AWS (Lambda, SQS, SNS), PostgreSQL, Docker<br><br>' +
        '🏢 <span class="company">Nichoos</span> (August 2023 – September 2023)<br>' +
        '- <strong>Consultancy:</strong> Social network backend for managing influencer community groups<br>' +
        '- <strong>Integrations:</strong> Third-party APIs (Kiwify, Eduzz)<br>' +
        '- <strong>Development:</strong> New features implementation and legacy code maintenance<br><br>' +
        '🏢 <span class="company">Gofind Online</span> (September 2023 – November 2024)<br>' +
        '- <strong>Problem Resolution:</strong> Excelled in resolving production issues and technical challenges<br>' +
        '- <strong>Development:</strong> Feature development, data extraction, and new APIs/projects<br>' +
        '- <strong>Quality Assurance:</strong> Rigorous code reviews, comprehensive unit testing, and technical documentation<br>' +
        '- <strong>Maintenance:</strong> Enhanced and maintained legacy code systems<br>' +
        '  📋 <em>Stack:</em> Node.js (TypeScript/JavaScript), AWS (DynamoDB, CloudWatch, API Gateway, S3, SQS, SNS)<br>' +
        '  📋 <em>Data:</em> ElasticSearch, MySQL, BigQuery<br><br>' +
        '🏢 <span class="company">CI&T</span> (January 2025 – September 2025)<br>' +
        '- Worked as a Fullstack Developer contributing to two major client projects<br>' +
        '- <strong>YDUCS (Education Sector):</strong> Developed and maintained Virtual Classroom platform<br>' +
        '  • Implemented new features and optimized performance using Node.js, React, MongoDB, DynamoDB<br>' +
        '  • Applied Hexagonal Architecture to improve code modularity<br>' +
        '  • Created unit and component tests to ensure software reliability<br>' +
        '- <strong>Nestlé (Food Industry):</strong> Developed backend services for Sales Predictive System<br>' +
        '  • Built scalable solutions using Node.js, TypeScript, Redis, Docker, MongoDB, Azure Blob Storage<br>' +
        '  • Applied Clean Architecture and Domain-Driven Design (DDD) principles<br>' +
        '  • Implemented Repository, Adapter, Facade, and Factory patterns<br>' +
        '  • Optimized performance with Redis as primary data store and Cosmos DB for redundancy<br>' +
        '  • Designed caching strategies and processed large-scale Parquet files<br>' +
        '  • Maintained automated tests (unit, integration, and E2E)',
    tech: () =>
        '<span class="label">Core Technologies:</span><br><br>' +
        '💻 <span class="tech-category">Languages & Frameworks:</span><br>' +
        '- Node.js, Go, TypeScript, JavaScript, PHP<br><br>' +
        '☁️ <span class="tech-category">Cloud & Infrastructure:</span><br>' +
        '- AWS (Lambda, CloudWatch, SQS, SNS, S3, API Gateway)<br>' +
        '- Serverless, Microservices, Terraform<br><br>' +
        '🗄️ <span class="tech-category">Databases & Cache:</span><br>' +
        '- DynamoDB, MongoDB, MySQL, PostgreSQL<br>' +
        '- Firebase, Elastic Search, Big Query, Redis<br><br>' +
        '🛠️ <span class="tech-category">Development Practices:</span><br>' +
        '- SOLID principles<br>' +
        '- Agile Development<br>' +
        '- CI/CD<br>' +
        '- Strong communication and teamwork',
    contact: () =>
        '<span class="label">Contact Information:</span><br><br>' +
        '📱 Phone: +5573981358624<br>' +
        '📧 Email: danielmfigueroa@gmail.com<br>' +
        '💼 LinkedIn: <a href="https://linkedin.com/in/daniel-figueroa" target="_blank" rel="noopener noreferrer">linkedin.com/in/daniel-figueroa</a><br>' +
        '⚡ GitHub: <a href="https://github.com/danfigueroa" target="_blank" rel="noopener noreferrer">github.com/danfigueroa</a>',
    github: () =>
        '<span class="label">GitHub:</span><br>🔗 <a href="https://github.com/danfigueroa" target="_blank" rel="noopener noreferrer">https://github.com/danfigueroa</a>',

    clear: () => '',
}
