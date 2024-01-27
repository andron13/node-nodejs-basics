const errorText = 'No RSS environment variables found.';

const parseEnv = () => {
  const envs = process.env;
  const filteredEnvs = Object.entries(envs).filter(([key]) => key.startsWith('RSS_'));

  if (filteredEnvs.length === 0) {
    console.log(errorText);
    return;
  }
  const result = filteredEnvs.map(([key, value]) => `${key}=${value}`).join('; ');
  console.log(result);
};

parseEnv();
