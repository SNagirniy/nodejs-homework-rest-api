const { Register, Login } = require("./auth");
const authService = require("../Services/auth.service");
const emailService = require("../Services/email.service");

describe("auth controler", () => {
  describe("register", () => {
    test("User should register with new email", async function () {
      let req;
      let res;
      const next = jest.fn();

      req = {
        body: {
          email: "UserEmail@mail.com",
          password: "UserPassword",
        },
      };

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      authService.registerUser = jest.fn((data) => {
        return {
          email: "UserEmail@mail.com",
          subscription: "starter",
        };
      });

      emailService.sendEmail = jest.fn();

      const result = await Register(req, res, next);
      expect(result.code).toBe(201);
      expect(result.user.email).toBe("UserEmail@mail.com");
      expect(result.user.subscription).toBe("starter");
      expect(result.user.password).toBeUndefined();

      expect(next).toBeCalledTimes(0);
      expect(emailService.sendEmail).toBeCalledTimes(1);
    });

    test("Old user should not be able to register again", async function () {
      let req;
      let res;
      const next = jest.fn();

      req = {
        body: {
          email: "UserEmail@mail.com",
          password: "UserPassword",
        },
      };

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      authService.registerUser = jest.fn((data) => {
        throw new Error();
      });

      emailService.sendEmail = jest.fn();

      await Register(req, res, next);

      expect(next).toBeCalledTimes(1);
      expect(emailService.sendEmail).toBeCalledTimes(0);
    });
    test("User should not be able to register with not existed email", async function () {
      let req;
      let res;
      const next = jest.fn();

      req = {
        body: {
          email: "UserEmail@mail.com",
          password: "UserPassword",
        },
      };

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      authService.registerUser = jest.fn((data) => data);

      emailService.sendEmail = jest.fn((data) => {
        throw new Error();
      });

      await Register(req, res, next);

      expect(next).toBeCalledTimes(1);
      expect(emailService.sendEmail).toBeCalledTimes(1);
    });
  });

  describe("login", () => {
    test("User should login with corect creds", async function () {
      const next = jest.fn();

      const req = {
        body: {
          email: "UserEmail@mail.com",
          password: "UserPassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      authService.loginUser = jest.fn((data) => {
        return {
          email: "UserEmail@mail.com",
          subscription: "starter",
          token: "test-jwt-token",
          avatarURL: "test-avatar-url",
        };
      });

      const result = await Login(req, res, next);
      expect(result.code).toBe(200);
      expect(result.token).toBe("test-jwt-token");
      expect(result.user.email).toBe("UserEmail@mail.com");
      expect(result.user.subscription).toBe("starter");
      expect(result.user.avatarURL).toBe("test-avatar-url");
      expect(result.user.password).toBeUndefined();
      expect(next).toBeCalledTimes(0);
    });

    test("User should login with uncorect creds", async function () {
      const next = jest.fn();

      const req = {
        body: {
          email: "UserEmail@mail.com",
          password: "UserPassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      authService.loginUser = jest.fn((data) => {
        throw new Error();
      });

      await Login(req, res, next);

      expect(next).toBeCalledTimes(1);
    });
  });
});
