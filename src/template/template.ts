export type Terminal = {
  name?: string;
  icon: string;
  shellPath?: string;
  shellArgs?: string[];
  command?: string;
  cwd?: string;
  env?: { [key: string]: string | undefined };
  message?: string;
};

export type Template = {
  terminals: (Terminal | Terminal[])[];
};

export const template: Template = {
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