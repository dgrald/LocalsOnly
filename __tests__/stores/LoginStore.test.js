import LoginStore from '../../src/stores/LoginStore';
import _ from 'lodash';
jest.mock('jquery');

describe("LoginStore", () => {
  let baseUrl = "https://locals-only-service.herokuapp.com/users";
  let user = "user"
  let userEncoded = "userEncoded"
  let password = "pass"
  let passwordEncoded = "passwordEncoded"

  const $ = require('jquery');

  $.post.mockImplementation((url, options) => {
    if(url == baseUrl) {
      if(_.isEqual(options, {user: user, password, password})) {
        return new Promise((resolve, reject) => {
              process.nextTick(
                () => resolve({})
              );
            }
        );
      }
    }
  });

  describe("addUser(user, pass)", () => {
    it("should call the correct endpoint with the correct parameters", async () => {
      let response = await LoginStore.addUser(user, password);

      expect(response).toEqual({});
    });
  });

});
