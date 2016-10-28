import NewLocationSelectReducer from '../../src/reducers/NewLocationSelectReducer';
import L from 'leaflet';
jest.mock('../../src/reducers/AddLocationButtonClassReducer');
import AddLocationButtonClassReducer from '../../src/reducers/AddLocationButtonClassReducer';

describe("NewLocationSelectReducer", () => {

  let newLocationButtonClass = "new-class";
  let description = "description";
  let newLocation = L.latLng(50.5, 30.5);

  AddLocationButtonClassReducer.getNewClass.mockImplementation(() =>  {
    return newLocationButtonClass;
  });

  describe("select Point", () => {
    it("should return new state with selectlocation", () => {
      let inputState = {description: description, selectlocation: null, postButtonClass: "disabled", markers: []};

      let newState = NewLocationSelectReducer.getNewState(inputState, newLocation);

      let expectedState = {
        postButtonClass: newLocationButtonClass,
        markers: [{location: {coordinates : [newLocation.lng, newLocation.lat], type: "Point"}}]
      };
      expect(newState).toEqual(expectedState);
      expect(AddLocationButtonClassReducer.getNewClass).toBeCalledWith(description, [newLocation]);
    });
  });

  describe("select LineString", () => {

    it("should return correct GeoJSON when adding first point for a new line", () => {
      let inputState = {description: description, mode: "LineString", selectlocation: null, postButtonClass: "something", markers: null};

      let newState = NewLocationSelectReducer.getNewState(inputState, newLocation);

      let expectedState = {
        postButtonClass: newLocationButtonClass,
        markers: [{location: {coordinates : [[newLocation.lng, newLocation.lat]], type: "LineString"}}]
      };
      expect(newState).toEqual(expectedState);
      expect(AddLocationButtonClassReducer.getNewClass).toBeCalledWith(description, [newLocation]);
    });

    it("should return correct GeoJSON when adding new point to existing line", () => {
      let location2 = L.latLng(51.5, 31.5);
      let inputState = {
        description: description,
        mode: "LineString",
        selectlocation: [newLocation],
        postButtonClass: "something",
        markers: [{location: {coordinates : [[newLocation.lng, newLocation.lat]], type: "LineString"}}]
      };

      let newState = NewLocationSelectReducer.getNewState(inputState, location2);

      let expectedState = {
        postButtonClass: newLocationButtonClass,
        markers: [{location: {coordinates : [[newLocation.lng, newLocation.lat], [location2.lng, location2.lat]], type: "LineString"}}]
      };
      expect(newState).toEqual(expectedState);
      expect(AddLocationButtonClassReducer.getNewClass).toBeCalledWith(description, [newLocation]);
    });
  });

});
