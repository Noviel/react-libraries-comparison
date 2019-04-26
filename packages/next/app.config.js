const publicVariables = {
  local: {
    PUBLIC_CLICKER_API_URL: 'http://localhost:3001/clicker',
  },
  dev: {
    PUBLIC_CLICKER_API_URL: `<PUBLIC_CLICKER_API_DEV_URL>`,
  },
  prod: {
    PUBLIC_CLICKER_API_URL: `<PUBLIC_CLICKER_API_URL>`
  },
};

module.exports = ({ contour = process.env.CONTOUR } = {}) => {
  return {
    variables: publicVariables[contour],
  };
};
