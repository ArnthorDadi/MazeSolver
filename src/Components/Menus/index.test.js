import React from 'react'
import Menu from './index';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

describe('Menu test', ()=>{
    test('Home title is correct', () => {
        const { getByText } = render(
            <Menu 
                MenuName="Test Menu"
                Options={["One", "Two"]}
                SelectedIndex={0}
                changeSelectedOption={() => {}}
                />);
        const title = getByText('Test Menu');
        expect(title).toBeTruthy();
    });
});