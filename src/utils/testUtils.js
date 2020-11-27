import { act } from 'react-dom/test-utils';

const globalTimeout = global.setTimeout;

export const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise((resolve) => globalTimeout(resolve, timeout));
  });
};

const findTestWrapper = (wrapper, tag) => {
  return wrapper.find(`[data-test="${tag}"]`);
};
const findTestWrapperById = (wrapper, tag) => {
  return wrapper.find(`[data-testid="${tag}"]`);
};

export { findTestWrapper, findTestWrapperById };
