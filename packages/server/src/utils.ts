import { genSalt, hash, compare } from 'bcrypt';

export const encryptPassword = function (
  password: string,
): Promise<Error | string> {
  return new Promise((resolve, reject) => {
    genSalt(10, function (err: Error | undefined, salt: string) {
      if (err) return reject(err);

      hash(password, salt, function (err, hash) {
        return resolve(hash);
      });
    });
  });
};

export const comparePassword = function (
  plainPass: string,
  hashword: string,
): Promise<Error | boolean> {
  return new Promise((resolve, reject) => {
    compare(plainPass, hashword, function (err, isPasswordMatch) {
      return err == null ? resolve(isPasswordMatch) : reject(err);
    });
  });
};
