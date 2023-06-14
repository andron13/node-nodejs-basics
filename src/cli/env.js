const parseEnv = () => {
  const envs = process.env;
  const filteredEnvs = Object.entries(envs)
    .filter(([key]) => key.startsWith('RSS_'));

  if (filteredEnvs.length === 0) {
    console.log('No RSS environment variables found.');
    return;
  }
  const result = filteredEnvs
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
  console.log(result);
};

parseEnv();

/**
 * The testParseEnv function creates several environment variables with the prefix 'RSS_'
 * and calls the parseEnv function to process them and print them to the console.
 * This is a test function to verify the correctness of the parseEnv function
 * according to the given technical requirements.
 */
const testParseEnv = () => {
  process.env.RSS_name1 = 'value1';
  process.env.RSS_name2 = 'value2';
  process.env.RSS_name3 = 'value3';
  parseEnv();
};
