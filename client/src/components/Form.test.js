import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import RegisterForm from './Form.js';

describe('<RegisterForm />', () => {
    it('renders without crashing', () => {
        render(<RegisterForm />);
    });

    it('should render username form field', () => {
        const form = render(<RegisterForm />);
        form.getByPlaceholderText(/Username/);
    });

    it('should render password form field', () => {
        const form = render(<RegisterForm />);
        form.getByPlaceholderText(/Password/);
    });

    it('sign up button is clicked', () => {
        const { getByText } = render(<RegisterForm />);
        const rightClick = { button: 2 };
        fireEvent.click(getByText('Sign Up'), rightClick);
    });
});