import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });
    it('Two navigationitems should pass without auth.', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('Three navigationitems should pass when authenticated.', () => {
        //const wrapper = shallow(<NavigationItems isAuthenticate/>);
        wrapper.setProps({ isAuthenticate: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('Exact logout page', () => {
        wrapper.setProps({isAuthenticate: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});