import { relative, resolve } from 'path';
import { normalizeStories } from '@storybook/core-common';
import { getStorybookMain } from './getStorybookMain';

export const getStorybookMetadata = () => {
  const workingDir = resolve();
  const configDir = process.env.STORYBOOK_CONFIG_DIR;

  const main = getStorybookMain(configDir);
  const normalizedStoriesEntries = normalizeStories(main.stories, {
    configDir,
    workingDir,
  }).map((specifier) => ({
    ...specifier,
    importPathMatcher: new RegExp(specifier.importPathMatcher),
  }));

  const storiesPaths = normalizedStoriesEntries
    .map((entry) => entry.directory + '/' + entry.files)
    .map((dir) => '<rootDir>/' + relative(workingDir, dir))
    .join(';');

  return {
    configDir,
    workingDir,
    storiesPaths,
    normalizedStoriesEntries,
  };
};
