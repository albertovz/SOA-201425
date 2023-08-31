// import userController from "../controllers/user.controller.js";

describe('User Controller Tests', () => {
  it('should return a user profile', async () => {
    const req = { params: { id: 1 } };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => ({ send: jest.fn() })),
    };

    await userController.user_profile(req, res);

    expect(res.send).toHaveBeenCalled();
  });

  it('should return a list of users', async () => {
    const req = {};
    const res = {
      send: jest.fn(),
      status: jest.fn(() => ({ send: jest.fn() })),
    };

    await userController.user_list(req, res);

    expect(res.send).toHaveBeenCalled();
  });

  // Add more tests for other methods
});
