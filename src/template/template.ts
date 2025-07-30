export type Terminal = {
  name?: string;
  icon?: string;
  shellPath?: string;
  shellArgs?: string[];
  command?: string;
  cwd?: string;
  env?: { [key: string]: string | undefined };
  message?: string;
};

export type Template = {
  $schema: string;
  autostart?: boolean;
  terminals: (Terminal | Terminal[])[];
};

export const template: Template = {
  $schema: 'https://raw.githubusercontent.com/dawosch/shellmate/refs/heads/main/schema.json',
  autostart: false,
  terminals: [
    {
      name: '',
      icon: 'terminal-view-icon',
    },
    [
      {
        name: '',
        icon: 'triangle-left',
      },
      {
        name: '',
        icon: 'triangle-right',
      },
    ],
  ],
};
