import React from "react";
import Enzyme, {shallow} from "enzyme";
import Hello from '../src/Hello';


describe("App Component Testing", () => {
  it("Renders Hello World Title", () => {
    const wrapper = shallow(<Hello />);
    console.log(wrapper.debug());
  });
  });
