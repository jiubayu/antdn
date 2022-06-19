import React from 'react';
import {mount} from 'enzyme';
import Button from '../button';

describe('Button', () => {
    it('mount correctly', () => {
        expect(() => mount(<Button>Follow</Button>)).not.toThrow();
    })
})