import StashStore from '../../src/stores/StashStore';
import _ from 'lodash';
jest.mock('jquery');

describe("StashStore", () => {
  const $ = require('jquery');
  let stashes = [{id: 1, name: "first"}, {id: 2, name: "2"}];
  let newStash = {id: 2, name: "third"};

  $.ajax.mockImplementation((url, options) =>  {
    if(url == "https://locals-only-service.herokuapp.com/trails") {
      if(_.isEqual(options, {type: "GET"})) {
        return new Promise((resolve, reject) => {
              process.nextTick(
                () => resolve(stashes)
              );
            }
        );
      } else if(_.isEqual(options, {type: "POST", contentType: "application/json", data: JSON.stringify(newStash)})) {
        return new Promise((resolve, reject) => {
              process.nextTick(
                () => resolve(newStash)
              );
            }
        );
      }
    }
  });

  describe("getStashes()", () => {
    it("should return stashes", async () => {
      const actual = await StashStore.getAll();

      expect(actual).toEqual(stashes);
    });
  });

  describe("addStash(stash)", () => {
    it("should POST new stash", async () => {
      const actual = await StashStore.addStash(newStash);

      expect(actual).toEqual(newStash);
    });
  });
});