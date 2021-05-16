import React from 'react'
import Header from './index';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

describe('Header test', ()=>{
    test('Header title is correct', () => {
        const { getByText } = render(<Header Title="This is some header" />);
        const title = getByText('This is some header');
        expect(title).toBeTruthy();
    });
});