import chalk from 'chalk';
import morgan from 'morgan';

const getStatusColor = (status: number) => {
  if (status >= 500) return chalk.red(status);
  if (status >= 400) return chalk.yellow(status);
  if (status >= 300) return chalk.cyan(status);
  if (status >= 200) return chalk.green(status);
  return chalk.white(status);
};

const customMorgan = morgan(function (tokens, req, res) {
  const method = chalk.blue(tokens.method(req, res) ?? '-');
  const status = getStatusColor(Number(tokens.status(req, res)));
  const url = chalk.magenta(tokens.url(req, res) ?? '-');
  const responseTime = chalk.greenBright(
    `${tokens['response-time'](req, res) ?? '0'} ms`,
  );
  const contentLength = chalk.yellow(
    `${tokens.res(req, res, 'content-length') ?? '0'} bytes`,
  );
  return [
    chalk.gray('[LOG]'),
    method,
    url,
    status,
    contentLength,
    responseTime,
  ].join(' ');
});

export default customMorgan;
