import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerIngredient } from './BurgerIngredient';
import classes from './BurgerIngredient.css';

configure({adapter: new Adapter()});

describe ('<BurgerIngredient />', () => {
    it ('should return ingredient', () => {
        beforeEach(() => {
            const wrapper = shallow(<BurgerIngredient type='meat' />);
            expect (wrapper).toBe(<div className={classes.Meat}></div>);
        });
    });
});
