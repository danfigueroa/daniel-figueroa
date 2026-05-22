// src/commands/index.ts

export type CommandHandler = () => string | Promise<string>

interface Commands {
    [key: string]: CommandHandler
}

export const commandsPt: Commands = {
    help: () =>
        '<span class="label">Comandos disponíveis:</span> help, about, experience, tech, contact, github, lang, clear',
    about: () =>
        '<span class="label">Sobre mim:</span><br>Engenheiro de software backend com mais de 6 anos de experiência, especializado em Node.js/TypeScript e Go, projetando APIs, sistemas distribuídos e arquiteturas orientadas a eventos para ambientes de produção. Histórico comprovado de redução de latência de APIs críticas em mais de 90%, modernização de sistemas legados e contribuição em decisões de arquitetura backend nos domínios de IoT industrial, fintech, e-commerce, educação e saúde pública. Atuação prática com AWS, GCP, Kubernetes, observabilidade e otimização de performance.',
    experience: () =>
        '<span class="label">Experiências Profissionais:</span><br><br>' +
        '🏢 <span class="company">Loomi</span> (Novembro 2025 – Maio 2026)<br>' +
        '- Liderou o desenvolvimento backend da plataforma de monitoramento industrial <strong>Atvos CIO</strong>, processando telemetria em tempo real e eventos operacionais em múltiplas plantas de produção.<br>' +
        '- Arquitetou um sistema distribuído de microsserviços orientado a eventos (6 serviços) utilizando Node.js, TypeScript, NestJS e Google Cloud Platform.<br>' +
        '- Construiu uma estratégia de transporte customizada no NestJS para o Cloud Pub/Sub, gerenciando subscriptions, retries, acknowledgements e desserialização de mensagens de ponta a ponta.<br>' +
        '- Reduziu o tempo de resposta de APIs críticas em mais de <strong>90%</strong> ao redesenhar consultas no Firestore, introduzir cache com Redis e eliminar operações redundantes.<br>' +
        '- Implementou observabilidade distribuída com OpenTelemetry, Grafana e Loki, reduzindo significativamente o tempo de diagnóstico de incidentes.<br>' +
        '- Responsável por mais de 50% dos commits do repositório e participação ativa nas decisões de arquitetura backend.<br>' +
        '  📋 <em>Stack:</em> Node.js · TypeScript · NestJS · GKE · Pub/Sub · Firestore · Redis · BullMQ · OpenTelemetry · Grafana · Loki · Docker · Kubernetes<br><br>' +
        '🏢 <span class="company">CI&T</span> (Janeiro 2025 – Outubro 2025)<br>' +
        '- Entregou e otimizou funcionalidades de uma plataforma de sala de aula virtual de larga escala na <strong>YDUQS</strong>, atendendo milhares de estudantes simultâneos.<br>' +
        '- Refatorou módulos críticos para <strong>Arquitetura Hexagonal</strong>, melhorando testabilidade, manutenibilidade e tempo de onboarding.<br>' +
        '- Projetou serviços backend para uma plataforma de predição de vendas na <strong>Nestlé</strong>, aplicando Clean Architecture e Domain-Driven Design.<br>' +
        '- Reduziu a latência de consultas ao introduzir Redis como camada primária de leitura, com Cosmos DB como armazenamento redundante.<br>' +
        '- Desenvolveu estratégias de cache para workloads de processamento de dados Parquet em larga escala.<br>' +
        '  📋 <em>Stack:</em> Node.js · TypeScript · MongoDB · Redis · Cosmos DB · Docker · Clean Architecture · DDD<br><br>' +
        '🏢 <span class="company">Gofind Online</span> (Setembro 2023 – Novembro 2024)<br>' +
        '- Projetou e entregou APIs backend e pipelines de dados integrando DynamoDB, MySQL e BigQuery.<br>' +
        '- Otimizou consultas no Elasticsearch em endpoints de busca de alto volume, reduzindo a latência percebida pelos usuários.<br>' +
        '- Modernizou sistemas legados em produção e resolveu incidentes críticos em fluxos geradores de receita.<br>' +
        '- Conduziu code reviews e expandiu a cobertura de testes automatizados, elevando a qualidade do software.<br>' +
        '  📋 <em>Stack:</em> Node.js · TypeScript · AWS · DynamoDB · Elasticsearch · MySQL · BigQuery<br><br>' +
        '🏢 <span class="company">Afinz</span> (Junho 2022 – Maio 2023)<br>' +
        '- Desenvolveu e manteve serviços serverless para a plataforma fintech <strong>Sem Parar</strong> em AWS Lambda, SQS e SNS.<br>' +
        '- Refatorou sistemas backend legados que sustentavam operações de pagamento e mobilidade de alto tráfego.<br>' +
        '- Projetou mocks e contratos de API para destravar integrações entre times de backend, frontend e negócio.<br>' +
        '  📋 <em>Stack:</em> Node.js · TypeScript · AWS Lambda · SQS · SNS · PostgreSQL · Docker<br><br>' +
        '🏢 <span class="company">Americanas S.A.</span> (Novembro 2021 – Maio 2022)<br>' +
        '- Desenvolveu APIs e microsserviços para uma das maiores plataformas de e-commerce do Brasil.<br>' +
        '- Atuou em serviços construídos com Node.js, Go e Laravel hospedados em infraestrutura serverless na AWS.<br>' +
        '- Implementou testes unitários e conduziu refatorações pontuais para aumentar a confiabilidade de serviços críticos.<br>' +
        '  📋 <em>Stack:</em> Node.js · TypeScript · Go · PHP · MongoDB · MySQL · Redis · AWS',
    tech: () =>
        '<span class="label">Principais Tecnologias:</span><br><br>' +
        '💻 <span class="tech-category">Linguagens:</span><br>' +
        '- Node.js, TypeScript, Go, JavaScript, Python, PHP<br><br>' +
        '🏗️ <span class="tech-category">Backend & Arquitetura:</span><br>' +
        '- Microsserviços, Arquitetura Orientada a Eventos, Sistemas Distribuídos<br>' +
        '- APIs REST, System Design, DDD, Clean Architecture, Arquitetura Hexagonal, SOLID<br><br>' +
        '☁️ <span class="tech-category">Cloud & Infraestrutura:</span><br>' +
        '- AWS (Lambda, SQS, SNS, S3, API Gateway, DynamoDB, CloudWatch)<br>' +
        '- GCP (Pub/Sub, GKE, Firestore)<br>' +
        '- Kubernetes, Docker, Serverless, CI/CD<br><br>' +
        '🗄️ <span class="tech-category">Bancos de Dados & Mensageria:</span><br>' +
        '- PostgreSQL, MySQL, MongoDB, DynamoDB, Firestore, Cosmos DB<br>' +
        '- Redis, Elasticsearch, BigQuery, Pub/Sub, SQS/SNS, BullMQ<br><br>' +
        '🔭 <span class="tech-category">Observabilidade & Qualidade:</span><br>' +
        '- OpenTelemetry, Grafana, Loki, Tracing Distribuído<br>' +
        '- Jest, TDD, Code Review, Monitoramento',
    contact: () =>
        '<span class="label">Informações de Contato:</span><br><br>' +
        '📱 Telefone: +5573981358624<br>' +
        '📧 Email: danielmfigueroa@gmail.com<br>' +
        '💼 LinkedIn: <a href="https://linkedin.com/in/daniel-figueroa" target="_blank" rel="noopener noreferrer">linkedin.com/in/daniel-figueroa</a><br>' +
        '⚡ GitHub: <a href="https://github.com/danielfigueroa" target="_blank" rel="noopener noreferrer">github.com/danielfigueroa</a>',
    github: () =>
        '<span class="label">GitHub:</span><br>🔗 <a href="https://github.com/danielfigueroa" target="_blank" rel="noopener noreferrer">https://github.com/danielfigueroa</a>',

    clear: () => '',
}

export const commandsEn: Commands = {
    help: () =>
        '<span class="label">Available commands:</span> help, about, experience, tech, contact, github, lang, clear',
    about: () =>
        '<span class="label">About me:</span><br>Backend engineer with 6+ years of experience specialized in Node.js/TypeScript and Go, designing APIs, distributed systems and event-driven architectures for production environments. Track record of reducing critical API latency by 90%+, modernizing legacy systems and contributing to backend architectural decisions across industrial IoT, fintech, e-commerce, education and public health domains. Hands-on with AWS, GCP, Kubernetes, observability and performance optimization.',
    experience: () =>
        '<span class="label">Professional Experience:</span><br><br>' +
        '🏢 <span class="company">Loomi</span> (November 2025 – May 2026)<br>' +
        '- Led backend development of the <strong>Atvos CIO</strong> industrial monitoring platform, processing real-time telemetry and operational events across multiple production plants.<br>' +
        '- Architected a distributed event-driven microservices system (6 services) using Node.js, TypeScript, NestJS and Google Cloud Platform.<br>' +
        '- Built a custom NestJS transport strategy for Cloud Pub/Sub, handling subscriptions, retries, acknowledgements and message deserialization end-to-end.<br>' +
        '- Reduced critical API response times by <strong>90%+</strong> by redesigning Firestore queries, introducing Redis caching and eliminating redundant operations.<br>' +
        '- Implemented distributed observability with OpenTelemetry, Grafana and Loki, significantly cutting incident diagnosis time.<br>' +
        '- Contributed 50%+ of repository commits and drove key backend architecture decisions.<br>' +
        '  📋 <em>Stack:</em> Node.js · TypeScript · NestJS · GKE · Pub/Sub · Firestore · Redis · BullMQ · OpenTelemetry · Grafana · Loki · Docker · Kubernetes<br><br>' +
        '🏢 <span class="company">CI&T</span> (January 2025 – October 2025)<br>' +
        '- Delivered and optimized features for a large-scale virtual classroom platform at <strong>YDUQS</strong>, serving thousands of concurrent students.<br>' +
        '- Refactored critical modules to <strong>Hexagonal Architecture</strong>, improving testability, maintainability and onboarding time.<br>' +
        '- Designed backend services for a predictive sales platform at <strong>Nestlé</strong>, applying Clean Architecture and Domain-Driven Design.<br>' +
        '- Cut query latency by introducing Redis as a primary read layer with Cosmos DB as redundant store.<br>' +
        '- Engineered caching strategies for large-scale Parquet data processing workloads.<br>' +
        '  📋 <em>Stack:</em> Node.js · TypeScript · MongoDB · Redis · Cosmos DB · Docker · Clean Architecture · DDD<br><br>' +
        '🏢 <span class="company">Gofind Online</span> (September 2023 – November 2024)<br>' +
        '- Designed and shipped backend APIs and data pipelines integrating DynamoDB, MySQL and BigQuery.<br>' +
        '- Optimized Elasticsearch queries on high-volume search endpoints, reducing tail latency for end users.<br>' +
        '- Modernized legacy production systems and resolved critical incidents impacting revenue-generating flows.<br>' +
        '- Drove code reviews and expanded automated test coverage, raising overall software quality.<br>' +
        '  📋 <em>Stack:</em> Node.js · TypeScript · AWS · DynamoDB · Elasticsearch · MySQL · BigQuery<br><br>' +
        '🏢 <span class="company">Afinz</span> (June 2022 – May 2023)<br>' +
        '- Built and maintained serverless services for the <strong>Sem Parar</strong> fintech platform on AWS Lambda, SQS and SNS.<br>' +
        '- Refactored legacy backend systems supporting high-traffic payment and mobility operations.<br>' +
        '- Designed API mocks and contracts to unblock integration between backend, frontend and business teams.<br>' +
        '  📋 <em>Stack:</em> Node.js · TypeScript · AWS Lambda · SQS · SNS · PostgreSQL · Docker<br><br>' +
        '🏢 <span class="company">Americanas S.A.</span> (November 2021 – May 2022)<br>' +
        '- Developed APIs and microservices for one of Brazil\'s largest e-commerce platforms.<br>' +
        '- Worked across Node.js, Go and Laravel services hosted on AWS serverless infrastructure.<br>' +
        '- Added unit tests and led targeted refactorings to improve reliability of critical services.<br>' +
        '  📋 <em>Stack:</em> Node.js · TypeScript · Go · PHP · MongoDB · MySQL · Redis · AWS',
    tech: () =>
        '<span class="label">Core Technologies:</span><br><br>' +
        '💻 <span class="tech-category">Languages:</span><br>' +
        '- Node.js, TypeScript, Go, JavaScript, Python, PHP<br><br>' +
        '🏗️ <span class="tech-category">Backend & Architecture:</span><br>' +
        '- Microservices, Event-Driven Architecture, Distributed Systems<br>' +
        '- REST APIs, System Design, DDD, Clean Architecture, Hexagonal Architecture, SOLID<br><br>' +
        '☁️ <span class="tech-category">Cloud & Infrastructure:</span><br>' +
        '- AWS (Lambda, SQS, SNS, S3, API Gateway, DynamoDB, CloudWatch)<br>' +
        '- GCP (Pub/Sub, GKE, Firestore)<br>' +
        '- Kubernetes, Docker, Serverless, CI/CD<br><br>' +
        '🗄️ <span class="tech-category">Databases & Messaging:</span><br>' +
        '- PostgreSQL, MySQL, MongoDB, DynamoDB, Firestore, Cosmos DB<br>' +
        '- Redis, Elasticsearch, BigQuery, Pub/Sub, SQS/SNS, BullMQ<br><br>' +
        '🔭 <span class="tech-category">Observability & Quality:</span><br>' +
        '- OpenTelemetry, Grafana, Loki, Distributed Tracing<br>' +
        '- Jest, TDD, Code Review, Monitoring',
    contact: () =>
        '<span class="label">Contact Information:</span><br><br>' +
        '📱 Phone: +5573981358624<br>' +
        '📧 Email: danielmfigueroa@gmail.com<br>' +
        '💼 LinkedIn: <a href="https://linkedin.com/in/daniel-figueroa" target="_blank" rel="noopener noreferrer">linkedin.com/in/daniel-figueroa</a><br>' +
        '⚡ GitHub: <a href="https://github.com/danielfigueroa" target="_blank" rel="noopener noreferrer">github.com/danielfigueroa</a>',
    github: () =>
        '<span class="label">GitHub:</span><br>🔗 <a href="https://github.com/danielfigueroa" target="_blank" rel="noopener noreferrer">https://github.com/danielfigueroa</a>',

    clear: () => '',
}
