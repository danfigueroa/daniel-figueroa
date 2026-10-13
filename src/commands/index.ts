// src/commands/index.ts

export type CommandHandler = () => string | Promise<string>

interface Commands {
    [key: string]: CommandHandler
}

/**
 * Lista canônica de comandos, na ordem em que o `help` os apresenta.
 * É a fonte usada também pelo autocomplete e pelo "did you mean".
 *
 * `lang` entra aqui mesmo não existindo nos registries abaixo: ele é
 * tratado diretamente no Terminal, então derivar esta lista das chaves
 * dos registries o deixaria de fora.
 */
export const COMMAND_NAMES = [
    'help',
    'about',
    'experience',
    'projects',
    'tech',
    'contact',
    'github',
    'lang',
    'clear',
] as const

/**
 * Nome de comando tocável na saída do terminal. O Terminal intercepta o
 * clique via `data-cmd` e só executa nomes presentes em `COMMAND_NAMES`.
 */
export const commandLink = (name: string) =>
    `<span class="cmd-link" data-cmd="${name}">${name}</span>`

const helpText = (label: string) =>
    `<span class="label">${label}</span> ${COMMAND_NAMES.map(commandLink).join(', ')}`

export const commandsPt: Commands = {
    help: () => helpText('Comandos disponíveis:'),
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
    projects: () =>
        '<span class="label">Projetos Pessoais:</span><br><br>' +
        '🗳️ <span class="company">Segundo Turno Brasil</span> — <a href="https://eleicao.danielfigueroa.dev" target="_blank" rel="noopener noreferrer">eleicao.danielfigueroa.dev</a> · <a href="https://github.com/danfigueroa/segundo-turno-brasil" target="_blank" rel="noopener noreferrer">GitHub</a><br>' +
        '- Apuração <strong>ao vivo</strong> do 2º turno da eleição presidencial de 2026, pensada para o celular: resultado por Brasil, região, estado, município e país do exterior, com mapas interativos coloridos pela vantagem de cada candidato.<br>' +
        '- Backend serverless em <strong>TypeScript</strong> (Vercel Functions em São Paulo) atrás de CDN: o servidor consulta o TSE poucas vezes por minuto, não importa a audiência, com defasagem de ~15–50 s, respostas 304 quando nada muda e fallback para o último dado válido se o TSE cair.<br>' +
        '- Imagens e vídeo animado (MP4) gerados no próprio navegador, prontos para Stories e Feed, além de texto para WhatsApp e embed do placar ao vivo para portais.<br>' +
        '- Análise da apuração em tempo real: chance de virada, evolução da contagem, saldo de votos por estado e comparação com o 1º turno e com 2022.<br>' +
        '- ~116 KB de JS inicial, mapas do IBGE pré-renderizados no build e carregados sob demanda, ports & adapters com contrato de tipos único entre back e front, ~350 testes, 27 ADRs e acessibilidade AA.<br>' +
        '  📋 <em>Stack:</em> TypeScript · React · Vite · Vercel Functions · CDN · GitHub Actions<br><br>' +
        '✝️ <span class="company">Creo</span> — <a href="https://www.creo.com.br/" target="_blank" rel="noopener noreferrer">creo.com.br</a><br>' +
        '- Rede social cristã construída do zero, do design do domínio ao deploy em produção.<br>' +
        '- Backend em <strong>Go</strong>, expondo uma API REST que sustenta perfis, publicações, interações e o feed social.<br>' +
        '- Frontend em <strong>React</strong>, com interface responsiva pensada para leitura e engajamento no mobile.<br>' +
        '- Projeto solo end-to-end: modelagem de dados, autenticação, API, interface e infraestrutura.<br>' +
        '  📋 <em>Stack:</em> Go · React · TypeScript · REST API<br><br>' +
        '🎲 <span class="company">Campaign Survivor</span> — <a href="https://campaign-survivor.com" target="_blank" rel="noopener noreferrer">campaign-survivor.com</a><br>' +
        '- Jogo de draft inspirado em RPGs de mesa, onde o jogador monta sua party escolhendo entre opções sorteadas a cada rodada.<br>' +
        '- Backend em <strong>Go</strong>, responsável pela lógica de draft, regras de partida e estado do jogo.<br>' +
        '- Frontend em <strong>React</strong>, com uma experiência de jogo rápida e jogável direto no navegador, sem instalação.<br>' +
        '- Alcance <strong>global e orgânico</strong>: jogadores de mais de uma dezena de países, com destaque para Estados Unidos (58%), Brasil (12%), Irlanda (8%), França (5%) e Índia (3%).<br>' +
        '  📋 <em>Stack:</em> Go · React · TypeScript · REST API',
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
    help: () => helpText('Available commands:'),
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
    projects: () =>
        '<span class="label">Personal Projects:</span><br><br>' +
        '🗳️ <span class="company">Segundo Turno Brasil</span> — <a href="https://eleicao.danielfigueroa.dev" target="_blank" rel="noopener noreferrer">eleicao.danielfigueroa.dev</a> · <a href="https://github.com/danfigueroa/segundo-turno-brasil" target="_blank" rel="noopener noreferrer">GitHub</a><br>' +
        '- <strong>Live</strong> vote-count tracker for the 2026 Brazilian presidential runoff, built mobile-first: results by country, region, state, municipality and overseas country, with interactive maps shaded by each candidate\'s lead.<br>' +
        '- Serverless <strong>TypeScript</strong> backend (Vercel Functions in São Paulo) behind a CDN: the origin polls the electoral court (TSE) only a few times per minute regardless of traffic, with ~15–50 s lag, 304 responses when nothing changed and fallback to the last valid snapshot if the TSE goes down.<br>' +
        '- Images and animated video (MP4) generated in the browser, ready for Instagram Stories and Feed, plus WhatsApp text and an embeddable live scoreboard for news sites.<br>' +
        '- Real-time count analysis: comeback odds, count progression, vote margin by state and comparison with the first round and with 2022.<br>' +
        '- ~116 KB of initial JS, IBGE maps pre-rendered at build time and lazy-loaded, ports & adapters with a single type contract shared by back and front, ~350 tests, 27 ADRs and AA accessibility.<br>' +
        '  📋 <em>Stack:</em> TypeScript · React · Vite · Vercel Functions · CDN · GitHub Actions<br><br>' +
        '✝️ <span class="company">Creo</span> — <a href="https://www.creo.com.br/" target="_blank" rel="noopener noreferrer">creo.com.br</a><br>' +
        '- A Christian social network built from scratch, from domain design to production deployment.<br>' +
        '- <strong>Go</strong> backend exposing a REST API that powers profiles, posts, interactions and the social feed.<br>' +
        '- <strong>React</strong> frontend with a responsive interface designed for mobile reading and engagement.<br>' +
        '- Solo end-to-end project: data modeling, authentication, API, UI and infrastructure.<br>' +
        '  📋 <em>Stack:</em> Go · React · TypeScript · REST API<br><br>' +
        '🎲 <span class="company">Campaign Survivor</span> — <a href="https://campaign-survivor.com" target="_blank" rel="noopener noreferrer">campaign-survivor.com</a><br>' +
        '- A draft game inspired by tabletop RPGs, where players build their party by picking from options drawn each round.<br>' +
        '- <strong>Go</strong> backend handling draft logic, match rules and game state.<br>' +
        '- <strong>React</strong> frontend delivering a fast, browser-playable experience with no install required.<br>' +
        '- <strong>Global organic reach</strong>: players from more than a dozen countries, led by the United States (58%), Brazil (12%), Ireland (8%), France (5%) and India (3%).<br>' +
        '  📋 <em>Stack:</em> Go · React · TypeScript · REST API',
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
