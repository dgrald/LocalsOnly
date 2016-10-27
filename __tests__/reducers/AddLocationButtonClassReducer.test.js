import AddLocationButtonClassReducer from '../../src/reducers/AddLocationButtonClassReducer';
import L from 'leaflet';

describe("AddLocationButtonClassReducer", () => {
  let newLocation = L.latLng(50.5, 30.5);

  describe("getNewClass", () => {
    it("should return btn-primary if description and new location are truthy", () => {
      let newClass = AddLocationButtonClassReducer.getNewClass("something", newLocation);

      expect(newClass).toEqual("btn-primary");
    });

    it("should return disabled if description is not truthy", () => {
      let newClass = AddLocationButtonClassReducer.getNewClass("", newLocation);

      expect(newClass).toEqual("disabled");
    });

    it("should return disabled if newLocation is not truthy", () => {
      let newClass = AddLocationButtonClassReducer.getNewClass("Something", null);

      expect(newClass).toEqual("disabled");
    });
  });
});
