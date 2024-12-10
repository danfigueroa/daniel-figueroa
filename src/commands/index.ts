// src/commands/index.ts

export type CommandHandler = () => string | Promise<string>;

interface Commands {
  [key: string]: CommandHandler;
}

export const commandsPt: Commands = {
  help: () => '<span class="label">Comandos disponíveis:</span> help, about, experience, tech, contact, clear',
  about: () => '<span class="label">Sobre mim:</span> Sou um desenvolvedor backend com foco em Node.js, etc.',
  experience: () => '<span class="label">Experiência:</span>\n- Empresa X (2020-2022)\n- Empresa Y (2022-2024)',
  tech: () => '<span class="label">Tecnologias:</span> Node.js, Express, PostgreSQL, Docker, AWS...',
  contact: () => '<span class="label">Contatos:</span>\nLinkedIn: ...\nGitHub: ...\nEmail: ...',
  clear: () => ""
};

export const commandsEn: Commands = {
  help: () => '<span class="label">Available commands:</span> help, about, experience, tech, contact, clear',
  about: () => '<span class="label">About me:</span> I am a backend developer focusing on Node.js, etc.',
  experience: () => '<span class="label">Experience:</span>\n- Company X (2020-2022)\n- Company Y (2022-2024)',
  tech: () => '<span class="label">Technologies:</span> Node.js, Express, PostgreSQL, Docker, AWS...',
  contact: () => '<span class="label">Contacts:</span>\nLinkedIn: ...\nGitHub: ...\nEmail: ...',
  clear: () => ""
};
