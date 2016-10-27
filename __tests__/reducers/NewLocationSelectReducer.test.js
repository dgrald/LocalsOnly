import NewLocationSelectReducer from '../../src/reducers/NewLocationSelectReducer';
import L from 'leaflet';
jest.mock('../../src/reducers/AddLocationButtonClassReducer');
import AddLocationButtonClassReducer from '../../src/reducers/AddLocationButtonClassReducer';

describe("NewLocationSelectReducer", () => {

  let newLocationButtonClass = "new-class";

  AddLocationButtonClassReducer.getNewClass.mockImplementation(() =>  {
    return newLocationButtonClass;
  });

  describe("select new Point", () => {
    it("should return new state with selectlocation", () => {
      let newLocation = L.latLng(50.5, 30.5);
      let description = "description";
      let inputState = {description: description, selectlocation: null, postButtonClass: "disabled", markers: []};

      let newState = NewLocationSelectReducer.getNewState(inputState, newLocation);

      let expectedState = {selectlocation: newLocation, postButtonClass: newLocationButtonClass, markers: [{location: {coordinates : [newLocation.lng, newLocation.lat], type: "Point"}}]};
      expect(newState).toEqual(expectedState);
      expect(AddLocationButtonClassReducer.getNewClass).toBeCalledWith(description, newLocation);
    });
  });

});
