import { validationResult } from 'express-validator';

const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());

    return res
      .status(422)
      .json({ message: errors.array()[0].msg, field: errors.array()[0].param });
  }
  next();
};

export { runValidation };
