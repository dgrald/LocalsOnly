import NewLocationSelectReducer from '../../src/reducers/NewLocationSelectReducer';
import L from 'leaflet';
jest.mock('../../src/reducers/AddLocationButtonClassReducer');
import AddLocationButtonClassReducer from '../../src/reducers/AddLocationButtonClassReducer';
import _ from 'lodash';

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



  describe("select LineString or Polygon", () => {
    var assertNewShapeCreatedCorrectly = (geometryType) => {
      let inputState = {description: description, mode: geometryType, selectlocation: null, postButtonClass: "something", markers: null};

      let newState = NewLocationSelectReducer.getNewState(inputState, newLocation);

      let expectedState = {
        postButtonClass: newLocationButtonClass,
        markers: [{location: {coordinates : [[newLocation.lng, newLocation.lat]], type: geometryType}}]
      };
      expect(newState).toEqual(expectedState);
      expect(AddLocationButtonClassReducer.getNewClass).toBeCalledWith(description, [newLocation]);
    }

    var assertNewPointInShapeCreatedCorrectly = (geometryType) => {
      let inputState = {description: description, mode: geometryType, selectlocation: null, postButtonClass: "something", markers: null};

      let newState = NewLocationSelectReducer.getNewState(inputState, newLocation);

      let expectedState = {
        postButtonClass: newLocationButtonClass,
        markers: [{location: {coordinates : [[newLocation.lng, newLocation.lat]], type: geometryType}}]
      };
      expect(newState).toEqual(expectedState);
      expect(AddLocationButtonClassReducer.getNewClass).toBeCalledWith(description, [newLocation]);
    }

      it("should return correct GeoJSON when adding first point for a new line", () => {
        assertNewShapeCreatedCorrectly("LineString");
      });

      it("should return correct GeoJSON when adding new point to existing line", () => {
        assertNewPointInShapeCreatedCorrectly("LineString");
      });

      it("should return correct GeoJSON when adding first point for a new polygon", () => {
        assertNewShapeCreatedCorrectly("Polygon");
      });

      it("should return correct GeoJSON when adding new point to existing polygon", () => {
        assertNewPointInShapeCreatedCorrectly("Polygon");
      });
    });

});
