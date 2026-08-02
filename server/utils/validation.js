const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateRating = (rating) => {
  return rating >= 1 && rating <= 5;
};

module.exports = {
  validateEmail,
  validateRating,
};